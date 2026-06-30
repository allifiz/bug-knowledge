# Cara Pakai DevTools Network

DevTools Network adalah tempat pertama yang perlu kamu buka ketika ingin memahami apa yang terjadi di balik sebuah fitur.

Dari sini kamu bisa melihat request yang dikirim browser dan response yang dibalas server.

Hal yang biasanya terlihat:

- endpoint yang dipanggil;
- method request;
- status code;
- header;
- payload atau body;
- response JSON/HTML;
- cookie atau session yang ikut dikirim.

## Cara Membuka

```txt
1. Buka website yang ingin dipelajari.
2. Tekan F12, atau klik kanan → Inspect.
3. Pilih tab Network.
4. Centang Preserve log kalau kamu tidak mau request hilang saat pindah halaman.
5. Jalankan aksi di website, misalnya login, search, update profile, atau upload file.
```

Setelah aksi dijalankan, request akan mulai muncul di tab Network.

## Mulai dari Fetch/XHR

Di Network tab biasanya ada banyak jenis request: gambar, file JavaScript, CSS, font, dan API.

Untuk bug bounty, biasanya yang paling menarik adalah:

```txt
Fetch/XHR
```

Kenapa? Karena banyak aplikasi modern mengirim data lewat API, dan request API biasanya muncul di sana.

## Bagian yang Perlu Dilihat

Klik salah satu request, lalu lihat bagian ini:

| Bagian | Fungsi |
|---|---|
| Headers | URL, method, status code, request header, response header |
| Payload | data yang dikirim, termasuk JSON, query, atau form-data |
| Response | jawaban mentah dari server |
| Preview | response yang sudah dirapikan browser |
| Cookies | cookie yang dikirim atau diterima |

Kamu tidak harus langsung paham semuanya. Mulai dari tiga hal dulu:

```txt
URL → Payload → Response
```

## Contoh: Membaca Request Login

```txt
1. Buka halaman login.
2. Buka DevTools → Network.
3. Masukkan email dan password testing.
4. Klik login.
5. Cari request seperti /login atau /api/login.
6. Klik request itu.
7. Buka Payload untuk melihat data yang dikirim.
8. Buka Response untuk melihat pesan dari server.
```

Dari situ kamu bisa membandingkan, misalnya:

```txt
email tidak terdaftar
vs
email terdaftar tapi password salah
```

Kalau pesannya berbeda terlalu spesifik, itu bisa menjadi sinyal user enumeration.

## Contoh: Membaca Request Search

```txt
1. Buka fitur search.
2. Buka Network tab.
3. Ketik keyword normal.
4. Cari endpoint seperti /search?q= atau /api/products?search=.
5. Lihat parameter yang dikirim.
6. Lihat response yang kembali.
7. Baru lakukan input test aman jika memang relevan.
```

Search biasanya menarik karena input user sering masuk ke proses query atau filter.

## Contoh: Membaca Request Profile Update

```txt
1. Buka halaman edit profile.
2. Buka Network tab.
3. Ubah nama seperti biasa.
4. Cari request PATCH/PUT/POST profile.
5. Buka Payload.
6. Perhatikan field apa saja yang dikirim frontend.
```

Kalau frontend hanya mengirim `name`, tapi backend mau menerima field tambahan seperti `role` atau `is_admin`, itu bisa mengarah ke mass assignment atau role tampering.

## Evidence yang Perlu Dicatat

```txt
- URL endpoint
- method
- status code
- payload penting
- response penting
- akun atau role yang digunakan
- timestamp jika perlu
```

## Tips Praktis

- pahami dulu request normalnya;
- ubah satu hal saja saat testing;
- simpan request normal sebagai pembanding;
- sensor token, cookie, email, dan data sensitif sebelum membagikan evidence.

## Batas Aman

DevTools hanya alat untuk melihat. Tetap ikuti rules program.

```txt
- Jangan request massal.
- Jangan mencoba akun orang lain.
- Jangan membuka data user asli.
- Jangan menyebarkan token atau cookie.
```
