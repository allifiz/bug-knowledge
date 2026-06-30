# File Exposure

File exposure terjadi ketika file yang seharusnya private bisa diakses oleh user yang tidak berhak atau bahkan publik tanpa login.

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

## Test Aman

### Case 1 — File private bisa diakses tanpa login

1. Upload file private pada akun sendiri.
2. Simpan URL file.
3. Logout atau buka incognito.
4. Akses URL file.

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

## Case 2 — File user lain bisa di-download

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
200 OK dan file milik akun A ter-download.
```

## Case 3 — Old file masih aktif

1. Upload file pertama.
2. Simpan URL.
3. Ganti atau hapus file.
4. Akses URL lama.

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

## Evidence

```txt
- URL file
- status login/logout
- response status
- content-type
- screenshot file terbuka
- sensor isi file
```

## Recommendation

```txt
- Simpan file private di storage non-public
- Download file lewat endpoint yang memvalidasi auth dan ownership
- Gunakan signed URL dengan expiry jika perlu
- Hapus atau invalidasi file lama saat diganti
```
