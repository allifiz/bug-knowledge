# Feature Map: Export & Download

Fitur export/download sering punya impact tinggi karena bisa membuka file, laporan, invoice, dokumen, atau data pribadi.

## Endpoint Pattern

```txt
GET /api/export
GET /api/report/download?id=
GET /api/files/{id}/download
GET /download?file=
GET /api/invoices/{id}/pdf
GET /storage/private/{filename}
```

## Bug yang Mungkin Relevan

```txt
Access Control
├── Download file user lain
├── Public access to private file
├── Predictable file URL
└── Export data tanpa permission

Input Validation
├── Path traversal indicator
├── File parameter abuse
└── Error/path disclosure

Information Disclosure
├── Excessive export data
├── Internal path leakage
└── Sensitive metadata exposure
```

### Klik untuk belajar

| Bug | Buka halaman |
|---|---|
| Download file user lain | [IDOR Read](../bug-tree/access-control/idor-read.md) |
| Public access to private file | [File Exposure](../bug-tree/input-validation/file-exposure.md) |
| Predictable file URL | [File Exposure](../bug-tree/input-validation/file-exposure.md) |
| Export data tanpa permission | [Unauthorized Action](../bug-tree/access-control/unauthorized-action.md) |
| Path traversal indicator | [Path Traversal Indicator](../bug-tree/input-validation/path-traversal-indicator.md) |
| Error/path disclosure | [Internal Path Leakage](../bug-tree/information-disclosure/internal-path-leakage.md) |
| Excessive export data | [Excessive Response](../bug-tree/information-disclosure/excessive-response.md) |
| Internal path leakage | [Internal Path Leakage](../bug-tree/information-disclosure/internal-path-leakage.md) |
| Sensitive metadata exposure | [Sensitive Metadata Exposure](../bug-tree/information-disclosure/sensitive-metadata-exposure.md) |

## Test Aman Awal

### 1. Download file user lain

Akun A punya file/report.

Request akun B:

```http
GET /api/files/883/download
Authorization: Bearer token-akun-b
```

Expected secure output:

```http
HTTP/1.1 403 Forbidden
```

atau:

```http
HTTP/1.1 404 Not Found
```

Suspicious output:

```http
HTTP/1.1 200 OK
Content-Type: application/pdf
```

Kemungkinan bug:

```txt
IDOR download / broken access control.
```

### 2. Public file access

Test:

```txt
1. Ambil URL file private milik akun sendiri.
2. Logout.
3. Akses URL file di incognito.
```

Expected secure output:

```txt
401/403 atau redirect login.
```

Suspicious output:

```txt
File private tetap terbuka tanpa login.
```

### 3. Path/internal error disclosure

Suspicious output:

```txt
/var/www/app/storage/reports/file.pdf
```

atau:

```txt
C:\inetpub\wwwroot\uploads\report.pdf
```

Kemungkinan:

```txt
Internal path disclosure.
```

## Evidence

```txt
- Request download
- Token/role yang digunakan
- Response status
- Content-Type
- Bukti file private terbuka jika relevan
- Sensor isi file
```
