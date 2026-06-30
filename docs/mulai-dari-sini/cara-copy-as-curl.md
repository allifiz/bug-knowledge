# Cara Copy as cURL

Copy as cURL adalah cara mengambil request dari browser lalu menjalankannya ulang di terminal atau API client.

Ini berguna untuk belajar karena kamu bisa melihat request secara utuh.

## Kapan Dipakai

```txt
- ingin mengulang request yang sama;
- ingin menyimpan request sebagai evidence;
- ingin memindahkan request ke Postman/Insomnia;
- ingin melihat header, cookie, dan body request;
- ingin mengubah satu bagian request secara manual.
```

## Cara Copy as cURL dari Browser

```txt
1. Buka DevTools.
2. Masuk ke tab Network.
3. Jalankan aksi di website.
4. Klik kanan request yang relevan.
5. Pilih Copy → Copy as cURL.
6. Paste ke text editor dulu.
7. Sensor token/cookie sebelum dibagikan.
```

## Bagian yang Perlu Dipahami

Contoh struktur cURL:

```bash
curl 'https://app.example.com/api/profile' \
  -H 'authorization: Bearer TOKEN' \
  -H 'content-type: application/json' \
  --data-raw '{"name":"User Test"}'
```

Makna:

| Bagian | Arti |
|---|---|
| URL | Endpoint tujuan |
| `-H` | Header request |
| authorization/cookie | Identitas/session user |
| content-type | Format body |
| data-raw | Body yang dikirim |

## Cara Menggunakan dengan Aman

```txt
1. Jangan langsung menjalankan request berkali-kali.
2. Baca dulu endpoint dan body-nya.
3. Ubah satu bagian kecil saja.
4. Gunakan akun testing sendiri.
5. Jangan share token/cookie asli.
```

## Contoh Pemakaian untuk Belajar

### Membandingkan response

```txt
1. Copy request normal.
2. Jalankan ulang sekali.
3. Ubah parameter yang sedang diuji.
4. Bandingkan status code dan response.
```

### Mengubah field profile

```txt
1. Copy request update profile.
2. Lihat body JSON.
3. Pahami field yang memang dikirim UI.
4. Jangan menambahkan field sensitif kecuali sesuai rules dan pada akun sendiri.
```

## Kapan Lebih Baik Pakai Postman/Insomnia

```txt
- request terlalu panjang;
- perlu mengganti body berkali-kali secara manual;
- ingin menyimpan collection;
- ingin membandingkan response lebih rapi.
```

## Kapan Lebih Baik Pakai Burp/Caido/ZAP

```txt
- ingin intercept request sebelum dikirim;
- ingin melihat semua request browser secara otomatis;
- ingin membandingkan request antar akun;
- ingin workflow testing lebih cepat.
```

## Kesalahan Pemula

```txt
- Share cURL lengkap berisi token/cookie.
- Menjalankan request berulang tanpa memahami efeknya.
- Mengubah banyak field sekaligus.
- Tidak menyimpan request normal sebagai pembanding.
```

## Checklist Sebelum Menyimpan Evidence

```txt
- Token/cookie sudah disensor
- Email/ID sensitif disensor jika perlu
- Request normal dan request test dipisah
- Response penting disimpan
- Tidak ada data user lain yang tersebar
```
