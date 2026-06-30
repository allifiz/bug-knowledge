# Old Session Still Valid After Password Reset

Bug ini terjadi ketika session lama tetap bisa digunakan setelah password berhasil direset atau diganti.

## Kapan Curiga

```txt
- user reset password di browser B;
- browser A yang sudah login sebelumnya tetap bisa akses dashboard;
- API token lama tetap valid setelah password berubah;
- tidak ada opsi logout all devices;
- session inventory tidak berubah.
```

## Test Aman

Gunakan akun sendiri.

```txt
1. Login di browser A.
2. Request reset/change password di browser B.
3. Selesaikan perubahan password.
4. Coba akses fitur sensitif dari browser A.
```

## Expected Secure Output

```txt
Browser A diminta login ulang atau token lama tidak valid.
```

Contoh:

```http
HTTP/1.1 401 Unauthorized
```

## Suspicious Output

```txt
Browser A tetap bisa akses fitur sensitif dengan session lama setelah password berubah.
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Session lama invalid | Aman secara umum |
| Session lama tetap aktif | Session invalidation issue |
| Hanya beberapa fitur sensitif ditolak | Perlu cek threat model |
| Refresh token lama tetap bisa generate token baru | Lebih serius |

## Evidence

```txt
- session sebelum reset
- bukti password reset berhasil
- request setelah reset memakai session lama
- response actual
- cookie/token disensor
```

## Recommendation

```txt
- Invalidate session lama setelah password reset
- Rotate refresh token
- Beri user opsi logout all devices
- Terapkan session version di backend
```
