# Feature Map: Register

Register adalah fitur awal yang sering punya bug di validasi akun, verifikasi email, role, dan field tersembunyi.

## Endpoint Pattern

```txt
POST /register
POST /api/register
POST /api/auth/register
POST /api/v1/users
```

Body umum:

```json
{
  "name": "User Test",
  "email": "user@example.com",
  "password": "password"
}
```

## Bug yang Mungkin Relevan

```txt
Authentication
├── Email verification bypass
├── Duplicate account issue
├── Weak password policy
└── Account activation issue

Access Control
├── Role tampering
├── Mass assignment
└── Default privilege mistake

Input Validation
├── Stored XSS di name/company
├── SQLi indicator
└── Error disclosure
```

### Klik untuk belajar

| Bug | Buka halaman |
|---|---|
| Email verification bypass | [Email Verification Bypass](../bug-tree/authentication/email-verification-bypass.md) |
| Duplicate account issue | [User Enumeration](../bug-tree/authentication/user-enumeration.md) |
| Weak password policy | [Weak Password Policy](../bug-tree/authentication/weak-password-policy.md) |
| Role tampering | [Role Tampering](../bug-tree/access-control/role-tampering.md) |
| Mass assignment | [Mass Assignment](../bug-tree/access-control/mass-assignment.md) |
| Stored XSS | [XSS — Theory to Real Case](../theory-to-real-case/xss.md) |
| SQLi indicator | [SQL Injection — Theory to Real Case](../theory-to-real-case/sql-injection.md) |
| Error disclosure | [Stack Trace](../output-encyclopedia/stack-trace.md) |

## Test Aman Awal

### 1. Role tampering / mass assignment

Cek apakah request register menerima field sensitif dari client.

Request test pada akun milik sendiri:

```json
{
  "name": "User Test",
  "email": "user-test@example.com",
  "password": "password-kuat",
  "role": "admin",
  "is_admin": true,
  "status": "verified"
}
```

Expected secure output:

```txt
Field role/is_admin/status ditolak, diabaikan, atau tidak memengaruhi akun.
```

Suspicious output:

```json
{
  "id": 1001,
  "email": "user-test@example.com",
  "role": "admin",
  "is_admin": true
}
```

Kemungkinan bug:

```txt
Mass assignment / role tampering.
```

### 2. Email verification bypass

Flow normal:

```txt
Register → email verification dikirim → user belum boleh akses fitur sensitif sebelum verifikasi.
```

Expected secure output sebelum verifikasi:

```json
{
  "message": "Please verify your email first"
}
```

Suspicious output:

```txt
User yang belum verifikasi bisa login penuh, membuat transaksi, mengakses dashboard sensitif, atau memakai fitur premium.
```

### 3. Duplicate account behavior

Cek response jika register dengan email yang sudah terdaftar milikmu sendiri.

Expected secure output:

```json
{
  "message": "Unable to create account"
}
```

Suspicious output:

```json
{
  "message": "Email already exists"
}
```

Catatan:

```txt
Ini bisa menjadi user enumeration jika response register membocorkan email mana yang sudah terdaftar.
```

## Evidence

```txt
- Request register normal
- Request register dengan field tambahan
- Response yang menunjukkan field sensitif diterima
- Bukti akun mendapatkan privilege yang tidak seharusnya
- Screenshot role/permission jika ada
```
