# Scenario: `POST /api/login`

Endpoint login digunakan untuk memverifikasi identitas user dan membuat session/token.

## Contoh Endpoint

```txt
POST /login
POST /api/login
POST /api/auth/login
POST /api/v1/auth/login
```

Body umum:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

## Pertanyaan Analisis

```txt
- Apakah pesan error login generic?
- Apakah ada pembatasan percobaan gagal?
- Apakah response membocorkan email valid?
- Apakah token/session berubah setelah login ulang?
- Apakah ada error database jika input tidak valid?
```

## Kemungkinan Bug

```txt
Authentication
├── User enumeration
├── Missing rate limit
├── Weak account lockout
└── Session/token issue

Input Validation
├── SQLi indicator
└── Error disclosure
```

## Test Aman 1 — User Enumeration

Bandingkan dua request:

```txt
Email tidak terdaftar + password random
Email terdaftar milik sendiri + password salah
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

atau:

```json
{
  "message": "Password is incorrect"
}
```

## Test Aman 2 — Rate Limit Minimal

Lakukan hanya percobaan kecil sesuai rules program.

Expected secure output:

```txt
- delay
- captcha
- account lock sementara
- 429 Too Many Requests
```

Suspicious output:

```txt
Banyak percobaan gagal tetap mendapat response normal tanpa pembatasan.
```

## Test Aman 3 — Error Disclosure

Gunakan input tidak biasa dalam jumlah minimal.

Suspicious output umum:

```txt
SQL syntax error
Unclosed quotation mark
ERROR: syntax error at or near
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Error sama untuk semua login gagal | Kemungkinan aman |
| Error berbeda valid/invalid email | User enumeration |
| 429/delay setelah gagal beberapa kali | Ada proteksi |
| Error database muncul | Error disclosure / possible SQLi indicator |

## Kapan Stop

```txt
- Jangan brute force massal
- Jangan memakai password list
- Jangan mencoba akun orang lain
- Jangan credential stuffing
```

## Link Terkait

- [Login Feature Map](../feature-map/login.md)
- [User Enumeration](../bug-tree/authentication/user-enumeration.md)
- [SQL Injection — Theory to Real Case](../theory-to-real-case/sql-injection.md)
