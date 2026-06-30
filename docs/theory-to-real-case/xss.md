# XSS — Dari Teori ke Real Case

XSS terjadi ketika input user ditampilkan kembali ke halaman tanpa encoding yang benar.

Di real program, XSS sering muncul di search, komentar, profile, review, support ticket, nama organisasi, dan rich text editor.

## Tool Level

| Kebutuhan | Jawaban |
|---|---|
| Bisa tanpa Burp? | Ya |
| Minimal tools | Browser biasa |
| Disarankan | DevTools Elements + Network |
| Proxy tool | Opsional |
| Butuh akun testing? | Satu akun sendiri cukup untuk reflected/profile; dua akun/role jika ingin cek stored di halaman lain |

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

## Cara Mencoba Secara Aman

### Mode 1 — Browser biasa

```txt
1. Cari fitur yang menampilkan ulang input, misalnya search, profile name, bio, comment, atau review.
2. Masukkan marker deteksi aman.
3. Submit atau simpan data.
4. Lihat apakah marker muncul sebagai teks biasa atau menjadi struktur HTML.
5. Jangan memakai payload yang mencuri cookie/token.
```

Marker deteksi aman:

```txt
"><test-xss>
```

### Mode 2 — DevTools Elements

```txt
1. Setelah input muncul di halaman, klik kanan bagian output → Inspect.
2. Lihat HTML yang dirender.
3. Cek apakah karakter seperti < dan > berubah menjadi &lt; dan &gt;.
4. Jika marker menjadi tag HTML asli, itu suspicious.
5. Catat context-nya: HTML body, attribute, URL, atau JavaScript.
```

### Mode 3 — DevTools Network

```txt
1. Buka DevTools → Network.
2. Kirim input marker.
3. Cari request yang menyimpan/mengirim input.
4. Buka response atau halaman tempat input dirender.
5. Simpan request, response, dan screenshot output.
```

## Test Aman Awal

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
| Marker tampil sebagai teks biasa | Kemungkinan output sudah di-escape |
| Marker mengubah struktur HTML | Indikasi XSS context issue |
| Marker masuk ke attribute | Perlu analisis attribute escaping |
| Marker muncul di dashboard lain | Kemungkinan stored XSS |

## Evidence yang Perlu Disimpan

```txt
- Field yang menerima input
- Marker deteksi yang dipakai
- Request yang mengirim input
- Halaman tempat input dirender
- HTML output dari DevTools Elements
- Screenshot jika perlu
- Penjelasan context
```

## Kapan Harus Stop

```txt
- Jangan memakai payload pencuri cookie/token
- Jangan menyerang user lain
- Jangan membuat payload yang mengirim data keluar
- Jangan memaksa popup/aksi yang mengganggu user
- Validasi di akun sendiri atau area yang diizinkan
```

## Lanjut Baca

- [XSS Rendering Context](../output-encyclopedia/xss-rendering-context.md)
