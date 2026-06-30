# Cara Copy as cURL

Copy as cURL adalah cara mengambil request dari browser lalu menyimpannya dalam bentuk command `curl`.

Ini berguna ketika kamu ingin melihat request secara utuh, memindahkannya ke API client, atau mengulang request dengan perubahan kecil.

## Kapan Dipakai?

Pakai Copy as cURL ketika kamu ingin:

- menyimpan request normal sebagai pembanding;
- mengulang request yang sama;
- memindahkan request ke Postman atau Insomnia;
- melihat header, cookie, dan body request;
- mengubah satu bagian request secara manual.

## Cara Copy as cURL dari Browser

```txt
1. Buka DevTools.
2. Masuk ke tab Network.
3. Jalankan aksi di website.
4. Cari request yang relevan.
5. Klik kanan request itu.
6. Pilih Copy → Copy as cURL.
7. Paste ke text editor dulu.
8. Sensor token dan cookie sebelum dibagikan.
```

Jangan langsung share hasil copy mentah dari browser, karena biasanya berisi cookie, token, atau header sensitif.

## Membaca Struktur cURL

Contoh:

```bash
curl 'https://app.example.com/api/profile' \
  -H 'authorization: Bearer TOKEN' \
  -H 'content-type: application/json' \
  --data-raw '{"name":"User Test"}'
```

Cara membacanya:

| Bagian | Arti |
|---|---|
| URL | endpoint tujuan |
| `-H` | header request |
| authorization/cookie | identitas atau session user |
| content-type | format body |
| data-raw | body yang dikirim |

## Cara Menggunakan dengan Aman

```txt
1. Baca dulu endpoint dan body-nya.
2. Jalankan ulang hanya jika memang perlu.
3. Ubah satu bagian kecil saja.
4. Gunakan akun testing sendiri.
5. Jangan share token atau cookie asli.
```

## Contoh Pemakaian

### Membandingkan response

```txt
1. Copy request normal.
2. Simpan sebagai pembanding.
3. Ubah satu parameter yang sedang diuji.
4. Jalankan request test secara terbatas.
5. Bandingkan status code dan response.
```

### Melihat request update profile

```txt
1. Copy request update profile.
2. Lihat body JSON-nya.
3. Pahami field yang memang dikirim UI.
4. Kalau ingin menguji field tambahan, lakukan hanya pada akun sendiri dan sesuai rules program.
```

## Kapan Lebih Enak Pakai Postman atau Insomnia?

Gunakan API client kalau:

- request terlalu panjang;
- kamu perlu mengganti body berkali-kali secara manual;
- ingin menyimpan collection;
- ingin membaca response dengan tampilan lebih rapi.

## Kapan Lebih Enak Pakai Burp, Caido, atau ZAP?

Gunakan proxy tool kalau:

- ingin intercept request sebelum dikirim;
- ingin melihat semua request browser dalam satu history;
- ingin membandingkan request antar akun;
- ingin workflow testing lebih cepat.

## Kesalahan yang Sering Terjadi

- membagikan cURL lengkap yang masih berisi token/cookie;
- menjalankan request berulang tanpa memahami efeknya;
- mengubah banyak field sekaligus;
- tidak menyimpan request normal sebagai pembanding.

## Checklist Sebelum Menyimpan Evidence

```txt
- Token/cookie sudah disensor.
- Email/ID sensitif disensor jika perlu.
- Request normal dan request test dipisah.
- Response penting disimpan.
- Tidak ada data user lain yang ikut tersebar.
```
