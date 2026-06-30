# Redirect Headers

Halaman ini membantu membaca response redirect saat testing open redirect, login flow, logout flow, SSO, dan callback URL.

## Status Redirect Umum

```txt
301 Moved Permanently
302 Found
303 See Other
307 Temporary Redirect
308 Permanent Redirect
```

Yang paling sering terlihat saat bug hunting:

```txt
302 Found
```

## Header Paling Penting

```http
Location: /dashboard
```

atau:

```http
Location: https://example.com
```

Header `Location` menunjukkan tujuan redirect.

## Expected Secure Output

Jika aplikasi hanya boleh redirect ke path internal:

```http
HTTP/1.1 302 Found
Location: /dashboard
```

atau aplikasi menolak URL luar:

```json
{
  "message": "Invalid redirect URL"
}
```

## Suspicious Output

Jika parameter user mengontrol redirect ke domain luar:

```http
HTTP/1.1 302 Found
Location: https://example.com
```

Contoh request:

```http
GET /login?next=https://example.com
```

Jika response mengarah ke `https://example.com`, itu indikasi open redirect.

## Parameter yang Sering Relevan

```txt
next
redirect
returnUrl
callback
continue
url
target
destination
return_to
```

## Client-side Redirect

Tidak semua redirect memakai status 302. Kadang aplikasi redirect lewat HTML/JavaScript.

Suspicious output:

```html
<meta http-equiv="refresh" content="0;url=https://example.com">
```

atau:

```html
<script>
  window.location = "https://example.com"
</script>
```

## Cara Membaca Hasil

| Output | Makna |
|---|---|
| `Location: /dashboard` | Redirect internal, biasanya aman |
| `Location: https://domain-luar.test` | Suspicious jika berasal dari parameter |
| URL luar ditolak | Kemungkinan aman |
| Redirect via JavaScript | Tetap perlu dianalisis |
| Domain allowlist diterapkan | Kemungkinan aman |

## False Positive Umum

Open redirect belum tentu valid jika:

```txt
- redirect hanya ke domain yang sudah di-allowlist;
- parameter hanya menerima path internal;
- domain luar diubah menjadi path aman;
- butuh interaksi admin yang tidak realistis;
- impact phishing sangat lemah karena warning browser/interstitial.
```

## Evidence

```txt
- URL request lengkap
- response status
- header Location
- screenshot browser setelah redirect jika perlu
- penjelasan domain awal dan domain tujuan
```

## Catatan Aman

```txt
Gunakan domain netral seperti example.com.
Jangan membuat halaman phishing.
Jangan mengarahkan ke file berbahaya.
```
