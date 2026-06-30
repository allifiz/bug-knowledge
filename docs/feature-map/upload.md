# Feature Map: Upload

Fitur upload sering muncul di avatar, dokumen, bukti pembayaran, attachment, import CSV, dan media.

## Endpoint Pattern

```txt
POST /api/avatar
POST /api/files
POST /api/documents
POST /api/tickets/{id}/attachments
GET /storage/files/{filename}
GET /api/files/{id}/download
```

## Bug yang Mungkin Relevan

```txt
File Upload
├── Public access to private file
├── Weak file type validation
├── Missing file size limit
├── Old file still accessible
├── Predictable file URL
├── Path/internal storage disclosure
└── Metadata leakage

Access Control
├── Download file user lain
├── Delete file user lain
└── Replace file user lain
```

## Test Aman Awal

### 1. Public access check

1. Upload file normal di akun sendiri.
2. Catat URL file.
3. Logout atau gunakan browser incognito.
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

Jika file memang avatar publik, ini belum tentu bug. Tapi jika file adalah dokumen private, bukti pembayaran, invoice, atau attachment internal, ini mencurigakan.

### 2. Old file still accessible

1. Upload file pertama.
2. Simpan URL file pertama.
3. Ganti/hapus file.
4. Coba akses URL file pertama.

Expected secure output:

```txt
File lama tidak bisa diakses jika seharusnya sudah dihapus/private.
```

Suspicious output:

```txt
File lama masih bisa dibuka publik setelah dihapus/diganti.
```

### 3. Path disclosure

Suspicious output:

```txt
/var/www/app/storage/uploads/user-123/file.pdf
```

atau:

```txt
C:\inetpub\wwwroot\uploads\file.pdf
```

Kemungkinan:

```txt
Information disclosure / internal path disclosure
```

## Evidence

```txt
- request upload
- URL file
- hasil akses saat login
- hasil akses saat logout
- screenshot jika file private tetap terbuka
- sensor isi file
```
