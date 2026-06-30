# Path Traversal Indicator

Path traversal indicator adalah sinyal bahwa input user mungkin memengaruhi path file yang dibaca server.

Halaman ini fokus pada deteksi aman dan output yang perlu dikenali, bukan eksploitasi file sensitif.

## Kapan Curiga

Endpoint umum:

```txt
GET /download?file=
GET /api/files/view?path=
GET /api/export?filename=
GET /image?name=
GET /template?file=
```

Parameter yang sering relevan:

```txt
file
path
filename
name
document
template
url
```

## Expected Secure Behavior

```txt
- server hanya menerima file ID aman;
- server tidak menerima path langsung dari user;
- file diambil berdasarkan ownership dan allowlist;
- path invalid ditolak dengan error generic.
```

## Suspicious Output

```txt
File not found: /var/www/app/private/report.pdf
```

atau:

```txt
open /app/storage/uploads/../../file: no such file or directory
```

Makna:

```txt
Input user mungkin dipakai sebagai bagian dari file path dan error internal bocor.
```

## Cara Membaca Hasil

| Output | Makna |
|---|---|
| Error generic | Kemungkinan aman |
| Path server muncul | Internal path leakage |
| Input path muncul di error | Suspicious |
| File ID divalidasi ownership | Lebih aman |

## Evidence

```txt
- endpoint dan parameter
- request normal
- request dengan input path tidak valid
- response error/path yang muncul
- jangan akses file sensitif
```

## Kapan Stop

```txt
- Jangan mencoba membaca file sistem sensitif
- Jangan mengakses credential/config
- Cukup buktikan path handling lemah lewat error/output aman
```

## Recommendation

```txt
- Jangan menerima path mentah dari user
- Gunakan file ID dan lookup server-side
- Normalisasi dan validasi path
- Batasi akses ke direktori yang diizinkan
- Return error generic
```
