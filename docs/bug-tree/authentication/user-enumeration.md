# User Enumeration

User enumeration terjadi ketika aplikasi membocorkan apakah sebuah email/username terdaftar atau tidak.

Bug ini sering muncul di login, register, forgot password, dan invite.

## Tool Level

| Kebutuhan | Jawaban |
|---|---|
| Bisa tanpa Burp? | Ya |
| Minimal tools | Browser biasa |
| Disarankan | DevTools Network untuk melihat status code dan response |
| Proxy tool | Opsional |
| Butuh akun testing? | Satu email milik sendiri dan satu email dummy |

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

## Cara Mencoba Secara Aman

### Mode 1 — Browser biasa

```txt
1. Siapkan satu email milikmu yang memang terdaftar.
2. Siapkan satu email dummy yang jelas tidak terdaftar.
3. Buka halaman login atau forgot password.
4. Masukkan email dummy.
5. Catat pesan yang muncul.
6. Masukkan email milikmu sendiri dengan password salah atau request reset.
7. Catat pesan yang muncul.
8. Bandingkan apakah pesan valid dan invalid berbeda.
```

### Mode 2 — DevTools Network

```txt
1. Buka DevTools → Network.
2. Jalankan request dengan email dummy.
3. Klik request login/forgot-password.
4. Catat status code dan response.
5. Jalankan request dengan email milik sendiri.
6. Bandingkan status code, response body, dan pesan error.
```

## Contoh Test Login

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

Untuk forgot password:

```json
{
  "message": "If the email exists, a reset link will be sent"
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

## Evidence yang Perlu Disimpan

```txt
- Request email dummy
- Response email dummy
- Request email milik sendiri
- Response email milik sendiri
- Status code
- Screenshot pesan jika lewat UI
- Sensor email jika perlu
```

## Kapan Harus Stop

```txt
- Jangan enumerasi banyak email
- Jangan memakai daftar email orang lain
- Jangan mencoba password akun orang lain
- Cukup gunakan email sendiri dan satu email dummy
```

## Impact

User enumeration bisa membantu attacker menyusun daftar akun valid untuk serangan lanjutan seperti phishing atau credential stuffing.

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
