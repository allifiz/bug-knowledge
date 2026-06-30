# Cara Pakai DevTools Network

DevTools Network adalah tempat paling penting untuk melihat komunikasi browser dengan server.

Dengan Network tab, kamu bisa melihat:

```txt
- endpoint yang dipanggil
- method request
- status code
- header
- payload/body
- response JSON/HTML
- cookie/session yang dikirim
```

## Cara Membuka

```txt
1. Buka website target.
2. Tekan F12 atau klik kanan → Inspect.
3. Pilih tab Network.
4. Centang Preserve log jika ingin request tidak hilang saat pindah halaman.
5. Jalankan aksi di website, misalnya login/search/update profile.
```

## Filter Request

Di Network tab biasanya banyak request.

Yang paling sering relevan:

```txt
Fetch/XHR
Doc
JS
Img
```

Untuk bug bounty, mulai dari:

```txt
Fetch/XHR
```

Karena API modern biasanya muncul di sana.

## Bagian yang Perlu Dilihat

Klik salah satu request, lalu cek:

| Bagian | Fungsi |
|---|---|
| Headers | URL, method, status code, request headers, response headers |
| Payload | body/query/form-data yang dikirim |
| Response | data yang dibalas server |
| Preview | response yang sudah dirapikan browser |
| Cookies | cookie yang dikirim/diterima |

## Contoh Flow Login

```txt
1. Buka DevTools → Network.
2. Klik tombol login.
3. Cari request seperti /login atau /api/login.
4. Klik request tersebut.
5. Buka tab Payload untuk melihat email/password yang dikirim.
6. Buka tab Response untuk melihat pesan server.
7. Bandingkan response email tidak terdaftar vs password salah.
```

## Contoh Flow Search

```txt
1. Buka fitur search.
2. Buka Network tab.
3. Ketik keyword dan submit.
4. Cari endpoint seperti /search?q= atau /api/products?search=.
5. Lihat query parameter dan response.
6. Bandingkan output input normal dan input test aman.
```

## Contoh Flow Profile Update

```txt
1. Buka halaman edit profile.
2. Buka Network tab.
3. Ubah nama biasa.
4. Cari request PATCH/PUT/POST profile.
5. Lihat payload.
6. Perhatikan field apa saja yang dikirim frontend.
```

## Apa yang Dicatat untuk Evidence

```txt
- URL endpoint
- method
- status code
- payload penting
- response penting
- akun/role yang digunakan
- timestamp jika perlu
```

## Tips Pemula

```txt
- Jangan langsung ubah banyak hal.
- Pahami dulu request normal.
- Simpan request normal sebagai pembanding.
- Sensor token/cookie/email sebelum share report publik.
```

## Batas Aman

DevTools hanya alat observasi. Tetap ikuti rules program.

```txt
- Jangan request massal
- Jangan mencoba akun orang lain
- Jangan membuka data user asli
- Jangan menyebarkan token/cookie
```
