# Open Redirect — Dari Teori ke Real Case

Open Redirect terjadi ketika aplikasi mengarahkan user ke URL yang dikontrol input tanpa validasi yang benar.

Contoh sederhana:

```txt
Aplikasi punya URL /login?next=/dashboard.
Jika nilai next diganti ke domain luar dan aplikasi tetap redirect ke sana, itu suspicious.
```

## Tool Level

| Kebutuhan | Jawaban |
|---|---|
| Bisa tanpa Burp? | Ya |
| Minimal tools | Browser biasa |
| Disarankan | DevTools Network untuk melihat header Location |
| Proxy tool | Opsional |
| Butuh akun testing? | Tidak selalu, tergantung flow login/logout/SSO |

## Bentuk Real Case

Parameter yang sering relevan:

```txt
next=
redirect=
returnUrl=
callback=
continue=
url=
target=
destination=
```

Endpoint umum:

```txt
GET /login?next=/dashboard
GET /logout?redirect=/home
GET /auth/callback?returnUrl=/app
GET /sso?continue=/dashboard
GET /verify-email?redirect=/welcome
```

## Cara Mencoba Secara Aman

### Mode 1 — Browser biasa

```txt
1. Cari URL yang punya parameter redirect seperti next, redirect, returnUrl, atau continue.
2. Pahami dulu nilai normalnya, misalnya /dashboard atau /home.
3. Ganti nilainya ke domain netral seperti https://example.com.
4. Buka URL tersebut di browser.
5. Perhatikan apakah aplikasi tetap di domain asli atau pindah ke domain luar.
6. Jangan memakai domain phishing atau domain tiruan.
```

### Mode 2 — DevTools Network

```txt
1. Buka DevTools → Network.
2. Buka URL redirect test.
3. Klik request yang menghasilkan redirect.
4. Lihat status code, biasanya 301/302/303/307/308.
5. Lihat response header Location.
6. Jika Location menuju domain luar dari parameter user, itu suspicious.
```

## Test Aman

Gunakan domain netral untuk pembuktian:

```txt
https://example.com
```

Request test:

```http
GET /login?next=https://example.com
```

## Expected Secure Output

Aplikasi menolak redirect ke domain luar:

```json
{
  "message": "Invalid redirect URL"
}
```

atau hanya redirect ke path internal:

```http
HTTP/1.1 302 Found
Location: /dashboard
```

## Suspicious Output

```http
HTTP/1.1 302 Found
Location: https://example.com
```

atau response HTML/JS yang mengarahkan ke domain luar:

```html
<script>
  window.location = "https://example.com"
</script>
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Redirect hanya ke path internal | Kemungkinan aman |
| Domain luar ditolak | Kemungkinan aman |
| Header Location menuju domain luar dari parameter | Indikasi open redirect |
| Redirect terjadi via JavaScript | Tetap perlu dianalisis sebagai client-side redirect |

## Evidence yang Perlu Disimpan

```txt
- URL dengan parameter redirect
- Nilai parameter normal
- Nilai parameter test
- Response status redirect
- Header Location
- Screenshot jika browser benar-benar pindah domain
```

## Kapan Harus Stop

```txt
- Gunakan domain netral seperti example.com
- Jangan membuat halaman phishing
- Jangan mengarahkan ke file berbahaya
- Jangan menguji campaign phishing ke user lain
- Cukup buktikan redirect ke domain luar
```

## Kenapa Ini Penting

Open Redirect bisa dipakai untuk phishing karena korban melihat URL awal berasal dari domain resmi.

## Lanjut Baca

- [Redirect Headers](../output-encyclopedia/redirect-headers.md)
