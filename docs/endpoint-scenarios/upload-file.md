# Scenario: `POST /api/upload`

Endpoint upload digunakan untuk mengirim file seperti avatar, dokumen, attachment, bukti pembayaran, atau import data.

## Contoh Endpoint

```txt
POST /api/upload
POST /api/avatar
POST /api/files
POST /api/documents
POST /api/tickets/{id}/attachments
```

## Pertanyaan Analisis

```txt
- File ini public atau private?
- Apakah file bisa diakses tanpa login?
- Apakah file milik user lain bisa diakses?
- Apakah ukuran file dibatasi?
- Apakah response membocorkan path internal?
- Apakah file lama tetap bisa diakses setelah diganti/dihapus?
```

## Kemungkinan Bug

```txt
File Upload
├── Public access to private file
├── Weak file validation
├── Missing file size limit
├── Old file still accessible
└── Internal path disclosure

Access Control
├── Download file user lain
├── Delete file user lain
└── Replace file user lain
```

## Test Aman 1 — Public Access

1. Upload file normal pada akun sendiri.
2. Catat URL file.
3. Logout atau buka incognito.
4. Akses URL file.

Expected secure output untuk file private:

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

Catatan:

```txt
Avatar publik belum tentu bug. Dokumen private, invoice, attachment internal, atau bukti pembayaran yang terbuka publik lebih kuat impact-nya.
```

## Test Aman 2 — Old File Still Accessible

1. Upload file pertama.
2. Simpan URL file pertama.
3. Ganti atau hapus file.
4. Akses URL file pertama.

Expected secure output:

```txt
File lama tidak bisa diakses jika seharusnya sudah dihapus/private.
```

Suspicious output:

```txt
File lama tetap bisa dibuka.
```

## Test Aman 3 — Internal Path Disclosure

Suspicious output:

```txt
/var/www/app/storage/uploads/file.pdf
```

atau:

```txt
C:\inetpub\wwwroot\uploads\file.pdf
```

## Evidence

```txt
- Request upload
- URL file
- Response saat login
- Response saat logout/incognito
- Content-Type
- Screenshot file dengan isi disensor
```

## Link Terkait

- [Upload Feature Map](../feature-map/upload.md)
- [File Exposure](../bug-tree/input-validation/file-exposure.md)
