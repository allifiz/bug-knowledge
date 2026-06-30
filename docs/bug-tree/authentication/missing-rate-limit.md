# Missing Rate Limit

Missing rate limit terjadi ketika endpoint sensitif menerima banyak request berulang tanpa pembatasan yang cukup.

Topik ini sering muncul di login, forgot password, OTP, email verification, invite, resend code, dan coupon apply.

## Tool Level

| Kebutuhan | Jawaban |
|---|---|
| Bisa tanpa Burp? | Ya, untuk observasi kecil |
| Minimal tools | Browser biasa |
| Disarankan | DevTools Network untuk melihat status code dan response |
| Proxy tool | Tidak wajib, jangan gunakan untuk brute force |
| Butuh akun testing? | Ya, akun sendiri |

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
- beberapa percobaan gagal tetap mendapat response normal;
- tidak ada delay;
- tidak ada temporary lock;
- tidak ada captcha/challenge;
- tidak ada 429 Too Many Requests;
- response tetap cepat dan konsisten.
```

## Cara Mencoba Secara Aman

### Mode 1 — Browser biasa

```txt
1. Gunakan akun testing milik sendiri.
2. Buka halaman login, forgot password, OTP, atau resend code.
3. Lakukan beberapa percobaan gagal secara manual.
4. Amati apakah aplikasi mulai memberi delay, captcha, lockout, cooldown, atau pesan terlalu banyak percobaan.
5. Jangan lanjut jika rules program membatasi percobaan.
```

### Mode 2 — DevTools Network

```txt
1. Buka DevTools → Network.
2. Jalankan percobaan manual secara terbatas.
3. Klik request yang relevan.
4. Lihat status code dan response.
5. Catat apakah muncul 429, delay, lockout, captcha, atau cooldown.
```

### Mode 3 — API Client / Proxy

```txt
1. Gunakan hanya untuk mengulang request secara terbatas.
2. Jangan memakai wordlist.
3. Jangan menjalankan request massal.
4. Jangan menggunakan akun orang lain.
5. Simpan bukti minimal jika tidak ada pembatasan terlihat.
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
Beberapa percobaan gagal tetap mendapat response normal tanpa pembatasan yang terlihat.
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

## Evidence yang Perlu Disimpan

```txt
- Endpoint terdampak
- Jumlah percobaan kecil yang dilakukan
- Timestamp percobaan
- Response yang tetap normal
- Tidak ada 429/delay/lockout/cooldown
```

## Kapan Harus Stop

```txt
- Jangan brute force massal
- Jangan memakai password list
- Jangan mencoba akun orang lain
- Jangan membebani server
- Ikuti batas rules program
- Jika sudah terlihat tidak ada limit pada percobaan kecil, stop dan tulis evidence
```

## Recommendation

```txt
- Terapkan rate limit per akun, IP, device, dan action
- Tambahkan cooldown untuk OTP/resend/reset
- Gunakan progressive delay
- Tambahkan monitoring dan alert
- Return 429 atau response aman setelah batas tercapai
```
