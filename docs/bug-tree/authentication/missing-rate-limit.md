# Missing Rate Limit

Missing rate limit terjadi ketika endpoint sensitif menerima banyak request berulang tanpa pembatasan yang cukup.

Topik ini sering muncul di login, forgot password, OTP, email verification, invite, resend code, dan coupon apply.

## Kapan Curiga

Endpoint umum:

```txt
POST /api/login
POST /api/forgot-password
POST /api/otp/verify
POST /api/otp/resend
POST /api/email/resend-verification
POST /api/coupon/apply
```

Ciri-ciri:

```txt
- banyak percobaan gagal tetap mendapat response normal;
- tidak ada delay;
- tidak ada temporary lock;
- tidak ada captcha/challenge;
- tidak ada 429 Too Many Requests;
- response tetap cepat dan konsisten.
```

## Test Aman

Lakukan percobaan kecil sesuai rules program.

Jangan memakai wordlist, credential orang lain, atau request massal.

Contoh observasi aman:

```txt
1. Gunakan akun milik sendiri.
2. Kirim beberapa percobaan gagal secara manual.
3. Catat apakah ada delay, lockout, captcha, atau 429.
```

## Expected Secure Output

```http
HTTP/1.1 429 Too Many Requests
```

atau:

```json
{
  "message": "Too many attempts. Please try again later."
}
```

Bisa juga:

```txt
- temporary account lock;
- progressive delay;
- captcha setelah beberapa percobaan;
- OTP resend cooldown;
- reset password cooldown.
```

## Suspicious Output

```txt
Banyak percobaan gagal tetap mendapat response normal tanpa pembatasan yang terlihat.
```

Contoh:

```json
{
  "message": "Invalid email or password"
}
```

muncul terus tanpa delay/limit.

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Ada 429/delay/lockout | Ada proteksi rate limit |
| Tidak ada proteksi terlihat | Indikasi missing rate limit |
| Ada limit hanya per IP | Cek apakah cukup sesuai konteks |
| Ada limit hanya per akun | Cek apakah endpoint masih bisa disalahgunakan dengan variasi input |

## Evidence

```txt
- endpoint terdampak
- jumlah percobaan kecil yang dilakukan
- timestamp percobaan
- response yang tetap normal
- tidak ada 429/delay/lockout
```

## Kapan Stop

```txt
- Jangan brute force massal
- Jangan memakai password list
- Jangan mencoba akun orang lain
- Jangan membebani server
- Ikuti batas rules program
```

## Recommendation

```txt
- Terapkan rate limit per akun, IP, device, dan action
- Tambahkan cooldown untuk OTP/resend/reset
- Gunakan progressive delay
- Tambahkan monitoring dan alert
- Return 429 atau response aman setelah batas tercapai
```
