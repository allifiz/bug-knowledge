# XSS Rendering Context

Halaman ini membantu membaca output saat input user ditampilkan kembali ke HTML.

XSS tidak hanya tentang payload. Yang penting adalah **di mana input dirender**.

## Konsep Utama

Input yang sama bisa aman di satu konteks, tapi berbahaya di konteks lain.

Konteks umum:

```txt
- HTML body
- HTML attribute
- URL attribute
- JavaScript string
- Markdown/rich text
- Template preview
```

## 1. HTML Body Context

Contoh input:

```txt
"><test-xss>
```

### Expected secure output

```html
<div class="result">&quot;&gt;&lt;test-xss&gt;</div>
```

atau:

```html
<div class="result">&lt;test-xss&gt;</div>
```

Makna:

```txt
Karakter HTML di-escape, sehingga input tampil sebagai teks biasa.
```

### Suspicious output

```html
<div class="result">"><test-xss></div>
```

Makna:

```txt
Input masuk sebagai struktur HTML, bukan teks. Ini indikasi output encoding lemah.
```

## 2. Attribute Context

Contoh field:

```txt
profile website
search value
input value
image alt
```

### Expected secure output

```html
<input value="&quot;&gt;&lt;test-xss&gt;">
```

### Suspicious output

```html
<input value=""><test-xss>">
```

Makna:

```txt
Input berhasil keluar dari attribute value dan membentuk tag baru.
```

## 3. URL Attribute Context

Contoh:

```html
<a href="USER_INPUT">Website</a>
```

Expected secure behavior:

```txt
Aplikasi hanya mengizinkan http/https URL yang valid atau melakukan sanitasi URL.
```

Suspicious output:

```html
<a href="javascript:alert(1)">Website</a>
```

Catatan aman:

```txt
Untuk edukasi/report, cukup jelaskan bahwa URL scheme berbahaya diterima. Jangan gunakan payload untuk mencuri data.
```

## 4. JavaScript String Context

Contoh render:

```html
<script>
  const keyword = "USER_INPUT";
</script>
```

Expected secure output:

```txt
Input di-escape khusus untuk JavaScript string context.
```

Suspicious pattern:

```html
<script>
  const keyword = "";testMarker//";
</script>
```

Makna:

```txt
Input bisa keluar dari string JavaScript. Ini perlu analisis lebih hati-hati.
```

## 5. Stored vs Reflected

| Jenis | Cara Muncul | Contoh |
|---|---|---|
| Reflected | Input langsung muncul di response request yang sama | search keyword |
| Stored | Input disimpan lalu muncul di halaman lain | comment, profile bio, review |
| DOM-based | Input diproses JavaScript client-side | hash, query string, localStorage |

## Cara Membaca Hasil

| Output | Makna |
|---|---|
| `&lt;` dan `&gt;` muncul | Input kemungkinan di-escape |
| Tag baru terbentuk | Suspicious |
| Attribute pecah | Suspicious |
| Input muncul di dashboard admin | Potensi stored XSS |
| Input masuk ke script block | Perlu analisis JavaScript context |

## Evidence yang Bagus

```txt
- field/input yang menerima data
- request yang menyimpan/mengirim input
- HTML output yang menunjukkan context
- screenshot halaman
- penjelasan apakah reflected/stored/DOM
```

## Kapan Stop

```txt
- Jangan mencuri cookie/token
- Jangan menyerang user lain
- Jangan membuat payload yang mengambil data
- Validasi hanya di akun sendiri atau environment yang diizinkan
```
