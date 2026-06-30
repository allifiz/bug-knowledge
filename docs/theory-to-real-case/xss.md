# XSS — Dari Teori ke Real Case

XSS terjadi ketika input user ditampilkan kembali ke halaman tanpa encoding yang benar.

Di real program, XSS sering muncul di search, komentar, profile, review, support ticket, nama organisasi, dan rich text editor.

## Bentuk Real Case

```txt
GET /search?q=
POST /api/comments
PATCH /api/profile
POST /api/reviews
POST /api/support/tickets
POST /api/team/invite
```

Field yang sering relevan:

```txt
name
bio
comment
message
title
description
address
website
organization_name
```

## Kapan Harus Curiga

```txt
- Input muncul lagi di halaman
- Input muncul di dashboard admin
- Input muncul di email/template
- Input muncul di export PDF/HTML
- Input masuk ke atribut HTML seperti value, href, src
- Input masuk ke JavaScript context
```

## Test Aman Awal

Payload deteksi ringan:

```txt
"><test-xss>
```

Request contoh:

```http
GET /search?q="><test-xss>
```

## Expected Secure Output

Input harus di-escape sebagai teks biasa.

Contoh:

```html
&lt;test-xss&gt;
```

atau:

```html
<div class="result">&quot;&gt;&lt;test-xss&gt;</div>
```

## Suspicious Output

Input masuk ke struktur HTML tanpa encoding.

HTML body context:

```html
<div class="result">"><test-xss></div>
```

Attribute context:

```html
<input value=""><test-xss>">
```

Link context:

```html
<a href=""><test-xss>">Website</a>
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Payload tampil sebagai teks biasa | Kemungkinan output sudah di-escape |
| Payload mengubah struktur HTML | Indikasi XSS context issue |
| Payload masuk ke attribute | Perlu analisis attribute escaping |
| Payload muncul di dashboard lain | Kemungkinan stored XSS |

## Next Step Aman

```txt
- Jangan memakai payload pencuri cookie/token
- Jangan menyerang user lain
- Validasi di akun sendiri
- Simpan screenshot dan HTML response
- Jelaskan context: HTML body, attribute, JavaScript, URL, markdown
```

## Evidence

```txt
- Field yang menerima input
- Payload deteksi
- Halaman tempat input dirender
- HTML output
- Screenshot jika perlu
- Penjelasan context
```
