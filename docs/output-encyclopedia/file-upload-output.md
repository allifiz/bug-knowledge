# File Upload Output

Halaman ini membantu membaca response dari fitur upload file.

Fitur upload sering terlihat aman dari UI, tapi response API bisa membocorkan URL file, path internal, metadata, atau status penyimpanan yang penting untuk dianalisis.

## Response Upload Umum

Contoh response normal:

```json
{
  "message": "File uploaded successfully",
  "file_url": "https://app.example.com/storage/avatar/user-123.png"
}
```

Yang perlu diperhatikan:

```txt
- file_url
- file_id
- path
- storage_path
- mime_type
- size
- visibility
- owner_id
- access_url
```

## 1. Public URL untuk File Private

Suspicious output:

```json
{
  "file_url": "https://app.example.com/uploads/documents/ktp-user-123.pdf"
}
```

Jika file adalah dokumen private, cek apakah URL bisa diakses tanpa login.

Expected secure behavior:

```txt
File private tidak bisa dibuka publik tanpa authorization.
```

Suspicious behavior:

```txt
File private bisa dibuka di incognito/logout.
```

## 2. Internal Path Disclosure

Suspicious output:

```json
{
  "path": "/var/www/app/storage/uploads/file.pdf"
}
```

atau:

```json
{
  "path": "C:\\inetpub\\wwwroot\\uploads\\file.pdf"
}
```

Makna:

```txt
Aplikasi membocorkan path internal server.
```

## 3. Owner ID / Metadata Leakage

Suspicious output:

```json
{
  "file_id": 883,
  "owner_id": 123,
  "storage_bucket": "private-user-documents",
  "internal_name": "user-123-ktp.pdf"
}
```

Makna:

```txt
Response bisa membocorkan struktur storage, ownership, atau naming pattern.
```

Tidak selalu bug besar, tapi bisa memperkuat temuan file exposure atau IDOR.

## 4. Old File Still Accessible

Response setelah mengganti file:

```json
{
  "old_file_url": "https://app.example.com/uploads/old-avatar.png",
  "new_file_url": "https://app.example.com/uploads/new-avatar.png"
}
```

Yang perlu dicek:

```txt
Apakah old_file_url masih bisa diakses?
Apakah file lama seharusnya private/dihapus?
```

## 5. MIME Type dan Extension

Response:

```json
{
  "filename": "document.pdf",
  "mime_type": "application/pdf",
  "extension": "pdf"
}
```

Pertanyaan:

```txt
Apakah server validasi isi file atau hanya percaya extension/MIME dari client?
Apakah ada file size limit?
Apakah file disimpan di public storage?
```

## Cara Membaca Hasil

| Output | Makna |
|---|---|
| Public URL untuk avatar | Belum tentu bug |
| Public URL untuk dokumen private | Suspicious |
| Path server muncul | Internal path disclosure |
| File ID sequential | Bisa relevan untuk IDOR |
| Owner ID muncul | Metadata leakage / bantu access control test |
| Old file tetap aktif | Insecure file lifecycle |

## Evidence

```txt
- request upload
- response upload
- URL file
- hasil akses saat login
- hasil akses saat logout/incognito
- status code
- content-type
- screenshot dengan isi file disensor
```

## Kapan Stop

```txt
- Jangan membuka file user asli
- Jangan enumerate file ID
- Jangan upload file berbahaya
- Jangan mengganggu storage aplikasi
```
