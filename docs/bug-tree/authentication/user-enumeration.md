# User Enumeration

User enumeration terjadi ketika aplikasi membocorkan apakah sebuah email/username terdaftar atau tidak.

Bug ini sering muncul di login, register, forgot password, dan invite.

## Kapan Curiga

Endpoint umum:

```txt
POST /api/login
POST /api/register
POST /api/forgot-password
POST /api/team/invite
```

Ciri-ciri:

```txt
- Response email valid dan invalid berbeda
- Status code berbeda
- Waktu response berbeda jauh
- Pesan error terlalu spesifik
```

## Test Aman

Gunakan email milik sendiri dan email dummy yang jelas tidak terdaftar.

### Login

Email tidak terdaftar:

```json
{
  "email": "not-registered@example.com",
  "password": "random"
}
```

Email terdaftar milikmu, password salah:

```json
{
  "email": "akun-sendiri@example.com",
  "password": "wrong-password"
}
```

## Expected Secure Output

Response harus generic.

```json
{
  "message": "Invalid email or password"
}
```

## Suspicious Output

Email tidak terdaftar:

```json
{
  "message": "User not found"
}
```

Email terdaftar tapi password salah:

```json
{
  "message": "Password is incorrect"
}
```

atau forgot password:

```json
{
  "message": "Email not found"
}
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Pesan sama untuk valid/invalid | Kemungkinan aman |
| Pesan berbeda | Indikasi user enumeration |
| Status code berbeda | Indikasi tambahan |
| Response time beda jauh | Perlu hati-hati, bisa false positive |

## Impact

User enumeration bisa membantu attacker menyusun daftar akun valid untuk serangan lanjutan seperti phishing atau credential stuffing.

## Next Step Aman

```txt
- Jangan enumerasi banyak email
- Gunakan email milik sendiri dan satu email dummy
- Simpan perbandingan response
- Jangan mencoba password akun orang lain
```

## Recommendation

Gunakan response generic untuk semua kondisi.

Contoh:

```txt
Invalid email or password
```

atau untuk forgot password:

```txt
If the email exists, a reset link will be sent
```
