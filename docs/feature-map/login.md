# Feature Map: Login

Login adalah fitur sensitif karena berhubungan dengan identitas, session, dan kredensial.

## Endpoint Pattern

```txt
POST /login
POST /api/login
POST /auth/login
POST /api/v1/auth/login
```

Body umum:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

## Bug yang Mungkin Relevan

```txt
Authentication
├── User enumeration
├── Missing rate limit
├── Weak account lockout
├── Verbose error message
├── Session fixation
└── Token/session not rotated

Input Validation
├── SQLi indicator
└── Error disclosure
```

### Klik untuk belajar

| Bug | Buka halaman |
|---|---|
| User enumeration | [User Enumeration](../bug-tree/authentication/user-enumeration.md) |
| Missing rate limit | [Authentication](../bug-tree/authentication/index.md) |
| Weak account lockout | [Authentication](../bug-tree/authentication/index.md) |
| Verbose error message | [User Enumeration](../bug-tree/authentication/user-enumeration.md) |
| Session fixation | [Authentication](../bug-tree/authentication/index.md) |
| Token/session not rotated | [Authentication](../bug-tree/authentication/index.md) |
| SQLi indicator | [SQL Injection — Theory to Real Case](../theory-to-real-case/sql-injection.md) |
| Error disclosure | [Stack Trace](../output-encyclopedia/stack-trace.md) |

## Test Aman Awal

### 1. Error message comparison

Bandingkan:

```txt
Email tidak terdaftar + password random
vs
Email terdaftar milikmu + password salah
```

Expected secure output:

```json
{
  "message": "Invalid email or password"
}
```

Suspicious output:

```json
{
  "message": "User not found"
}
```

lalu pada email valid:

```json
{
  "message": "Password is incorrect"
}
```

Kemungkinan bug:

```txt
User enumeration
```

### 2. Rate limit check secara minimal

Lakukan hanya percobaan kecil sesuai rules program.

Expected secure output:

```txt
- ada delay
- ada captcha
- ada temporary lock
- ada 429 Too Many Requests
```

Suspicious output:

```txt
Banyak percobaan gagal tetap mendapat response normal tanpa pembatasan.
```

Catatan:

```txt
Jangan brute force massal. Jangan memakai password list. Jangan mencoba akun orang lain.
```

### 3. SQLi indicator basic

Payload deteksi ringan:

```txt
'
```

Expected secure output:

```txt
Invalid email or password
```

Suspicious output:

```txt
SQL syntax error
Unclosed quotation mark
ERROR: syntax error at or near
```

Lanjut baca: [SQL Injection — Theory to Real Case](../theory-to-real-case/sql-injection.md).

## Evidence

```txt
- request login email tidak terdaftar
- request login email terdaftar password salah
- perbedaan response
- status code
- timestamp percobaan
- sensor email jika perlu
```
