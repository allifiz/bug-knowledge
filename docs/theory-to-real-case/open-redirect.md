# Open Redirect — Dari Teori ke Real Case

Open Redirect terjadi ketika aplikasi mengarahkan user ke URL yang dikontrol input tanpa validasi yang benar.

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

## Test Aman

Gunakan domain aman untuk pembuktian, misalnya:

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

## Kenapa Ini Penting

Open Redirect bisa dipakai untuk phishing karena korban melihat URL awal berasal dari domain resmi.

## Next Step Aman

```txt
- Gunakan domain netral seperti example.com
- Jangan membuat halaman phishing
- Jangan mengarahkan ke file berbahaya
- Simpan URL vulnerable dan response header
```

## Evidence

```txt
- URL dengan parameter redirect
- Response 302
- Header Location
- Screenshot jika browser benar-benar pindah domain
```
