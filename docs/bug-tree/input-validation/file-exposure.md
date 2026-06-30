# File Exposure

File exposure terjadi ketika file yang seharusnya private bisa diakses oleh user yang tidak berhak atau bahkan publik tanpa login.

Contoh sederhana:

```txt
User upload dokumen private.
Aplikasi memberi URL file.
Saat URL dibuka di incognito tanpa login, file tetap terbuka.
```

## Tool Level

| Kebutuhan | Jawaban |
|---|---|
| Bisa tanpa Burp? | Ya |
| Minimal tools | Browser biasa + incognito |
| Disarankan | DevTools Network untuk melihat status code dan content-type |
| Proxy tool | Opsional |
| Butuh akun testing? | Satu akun untuk public access, dua akun untuk file user lain |

## Kapan Curiga

Fitur umum:

```txt
- upload avatar
- upload dokumen
- bukti pembayaran
- attachment ticket
- invoice PDF
- export report
- file download
```

Endpoint umum:

```txt
GET /storage/files/{filename}
GET /uploads/{filename}
GET /api/files/{id}/download
GET /api/invoices/{id}/pdf
```

## Cara Mencoba Secara Aman

### Mode 1 — Browser biasa / Incognito

```txt
1. Login dengan akun sendiri.
2. Upload file dummy yang tidak sensitif.
3. Simpan URL file yang diberikan aplikasi.
4. Logout atau buka browser incognito.
5. Buka URL file tersebut.
6. Cek apakah file tetap terbuka tanpa login.
```

### Mode 2 — DevTools Network

```txt
1. Buka DevTools → Network.
2. Upload atau download file dari akun sendiri.
3. Cari request file/download.
4. Catat URL, status code, dan content-type.
5. Uji akses URL yang sama saat logout/incognito.
6. Bandingkan status code login vs logout.
```

### Mode 3 — Dua akun testing

```txt
1. Akun A upload file dummy.
2. Catat file ID atau URL download.
3. Login sebagai Akun B.
4. Coba akses file milik Akun A.
5. Expected-nya 403/404, bukan 200.
6. Jangan membuka file user asli.
```

## Case 1 — File Private Bisa Diakses Tanpa Login

Expected secure output:

```http
HTTP/1.1 401 Unauthorized
```

atau:

```http
HTTP/1.1 403 Forbidden
```

Suspicious output:

```http
HTTP/1.1 200 OK
Content-Type: application/pdf
```

## Case 2 — File User Lain Bisa Di-download

Akun A punya file.

Akun B mencoba:

```http
GET /api/files/883/download
Authorization: Bearer token-akun-b
```

Expected secure output:

```txt
403/404
```

Suspicious output:

```txt
200 OK dan file milik Akun A ter-download.
```

## Case 3 — Old File Masih Aktif

```txt
1. Upload file pertama.
2. Simpan URL.
3. Ganti atau hapus file.
4. Akses URL lama.
```

Expected secure output:

```txt
File lama tidak bisa diakses jika seharusnya sudah dihapus/private.
```

Suspicious output:

```txt
File lama tetap bisa diakses.
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Avatar publik terbuka | Belum tentu bug |
| Dokumen private terbuka tanpa login | Indikasi file exposure |
| File user lain bisa di-download | Broken access control |
| File lama tetap terbuka | Insecure file lifecycle |

## Evidence yang Perlu Disimpan

```txt
- URL file
- status login/logout
- response status
- content-type
- screenshot file terbuka
- sensor isi file
```

## Kapan Harus Stop

```txt
- Jangan membuka file user asli
- Jangan enumerate file ID
- Jangan download banyak file
- Jangan upload file berbahaya
- Gunakan file dummy milik sendiri
```

## Recommendation

```txt
- Simpan file private di storage non-public
- Download file lewat endpoint yang memvalidasi auth dan ownership
- Gunakan signed URL dengan expiry jika perlu
- Hapus atau invalidasi file lama saat diganti
```
