# Token / Session Not Rotated

Token/session not rotated terjadi ketika token sensitif tetap sama setelah event penting seperti login, reset password, perubahan role, atau logout-login ulang.

## Event yang Harus Dicek

```txt
- login
- logout lalu login lagi
- reset password
- change password
- enable/disable MFA
- role berubah
- email berubah
```

## Expected Secure Behavior

```txt
Token/session sensitif dirotasi setelah event penting.
Session lama tidak tetap berlaku jika risikonya tinggi.
```

## Suspicious Behavior

```txt
Token lama tetap valid setelah password diganti.
Session lama tetap bisa akses fitur sensitif setelah logout/reset password.
```

## Test Aman

Gunakan akun sendiri.

```txt
1. Login di browser A.
2. Catat token/cookie secara aman.
3. Lakukan reset/change password di browser B.
4. Coba akses fitur sensitif dengan session browser A.
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Session lama invalid | Aman secara umum |
| Session lama tetap aktif | Perlu analisis risiko |
| Token baru diterbitkan tapi lama tetap valid | Suspicious |
| Logout tidak invalidasi token | Session management issue |

## Evidence

```txt
- request sebelum event
- event yang dilakukan
- request setelah event memakai session lama
- response actual
- token/cookie disensor
```

## Recommendation

```txt
- Rotate token setelah event sensitif
- Invalidate session lama setelah reset password
- Invalidate refresh token setelah logout jika sesuai desain
- Terapkan session inventory untuk user
```
