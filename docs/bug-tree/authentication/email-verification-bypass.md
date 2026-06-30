# Email Verification Bypass

Email verification bypass terjadi ketika user yang belum memverifikasi email tetap bisa mengakses fitur yang seharusnya membutuhkan email verified.

## Kapan Curiga

```txt
- user baru bisa login penuh sebelum verifikasi email;
- user belum verified bisa membuat transaksi/order;
- user belum verified bisa mengakses dashboard sensitif;
- user belum verified bisa mengundang member;
- field is_verified bisa dikirim dari client.
```

## Test Aman

Gunakan akun baru milik sendiri.

```txt
1. Register akun baru.
2. Jangan klik link verifikasi email.
3. Login.
4. Coba akses fitur sensitif.
```

## Expected Secure Output

```json
{
  "message": "Please verify your email first"
}
```

atau akses fitur sensitif dibatasi.

## Suspicious Output

```txt
User belum verified bisa memakai fitur penuh tanpa batasan.
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Hanya bisa login terbatas | Kemungkinan aman |
| Bisa akses semua fitur sensitif | Suspicious |
| Bisa ubah is_verified dari request | Mass assignment |
| Bisa bypass via endpoint API | Broken access control |

## Evidence

```txt
- akun baru yang belum verifikasi
- status verified di response jika ada
- request fitur sensitif
- response berhasil
- screenshot dashboard/fitur jika perlu
```

## Recommendation

```txt
- Validasi email_verified di backend
- Jangan hanya membatasi dari UI
- Gunakan allowlist fitur sebelum verifikasi
- Jangan menerima is_verified dari client
```
