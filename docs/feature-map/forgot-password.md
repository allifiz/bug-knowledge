# Feature Map: Forgot Password

Forgot password adalah fitur sensitif karena berhubungan dengan pengambilalihan akun jika token atau flow reset lemah.

## Endpoint Pattern

```txt
POST /forgot-password
POST /api/forgot-password
POST /api/reset-password
GET /reset-password?token=
POST /api/password/reset
```

## Bug yang Mungkin Relevan

```txt
Authentication
├── User enumeration
├── Reset token reusable
├── Reset token not expired
├── Token leaked in response
├── Old session still valid after password reset
└── Weak reset flow

Input/Output
├── Error disclosure
└── Host/header related issue concept
```

### Klik untuk belajar

| Bug | Buka halaman |
|---|---|
| User enumeration | [User Enumeration](../bug-tree/authentication/user-enumeration.md) |
| Reset token reusable | [Reset Token Reusable](../bug-tree/authentication/reset-token-reusable.md) |
| Reset token not expired | [Reset Token Not Expired](../bug-tree/authentication/reset-token-not-expired.md) |
| Token leaked in response | [Token Leaked in Response](../bug-tree/authentication/token-leaked-in-response.md) |
| Old session still valid after password reset | [Old Session Valid After Reset](../bug-tree/authentication/old-session-valid-after-reset.md) |
| Weak reset flow | [Weak Reset Flow](../bug-tree/authentication/weak-reset-flow.md) |
| Error disclosure | [Stack Trace](../output-encyclopedia/stack-trace.md) |
| Host/header related issue concept | [Redirect Headers](../output-encyclopedia/redirect-headers.md) |

## Test Aman Awal

### 1. User enumeration via forgot password

Bandingkan response:

```txt
Email tidak terdaftar
vs
Email terdaftar milikmu sendiri
```

Expected secure output:

```json
{
  "message": "If the email exists, a reset link will be sent"
}
```

Suspicious output:

```json
{
  "message": "Email not found"
}
```

atau:

```json
{
  "message": "Reset link sent"
}
```

untuk email valid saja.

Kemungkinan bug:

```txt
User enumeration.
```

### 2. Reset token reusable

Flow aman:

```txt
Token reset hanya bisa dipakai sekali.
```

Test aman pada akun sendiri:

```txt
1. Request reset password.
2. Gunakan link/token untuk reset password.
3. Coba gunakan token yang sama lagi.
```

Expected secure output:

```json
{
  "message": "Invalid or expired token"
}
```

Suspicious output:

```txt
Token yang sama bisa dipakai berulang untuk reset password.
```

### 3. Old session still valid

Flow aman:

```txt
Setelah password diganti, session lama sebaiknya invalid atau minimal ada kontrol risiko yang jelas.
```

Test aman:

```txt
1. Login di browser A.
2. Reset password di browser B.
3. Coba gunakan session lama di browser A.
```

Expected secure output:

```txt
Session lama diminta login ulang atau token lama tidak valid.
```

Suspicious output:

```txt
Session lama tetap bisa mengakses fitur sensitif setelah password diganti.
```

## Evidence

```txt
- Request forgot password
- Perbandingan response email valid vs invalid
- Bukti token tidak bisa/bisa dipakai ulang
- Bukti session lama tetap aktif jika relevan
- Sensor email dan token
```
