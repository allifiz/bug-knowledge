# Cara Baca Request & Response

Bug bounty web banyak bergantung pada kemampuan membaca request dan response.

Pemula tidak harus langsung hafal payload. Mulai dari memahami:

```txt
siapa mengirim apa → ke endpoint mana → server membalas apa
```

## Request Itu Apa?

Request adalah permintaan dari browser/client ke server.

Contoh:

```http
GET /api/users/123 HTTP/1.1
Host: app.example.com
Authorization: Bearer token-user
```

Artinya:

```txt
Client meminta data user dengan ID 123.
```

## Response Itu Apa?

Response adalah jawaban server.

Contoh:

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "id": 123,
  "name": "User Test"
}
```

Artinya:

```txt
Server berhasil mengembalikan data.
```

## Bagian Request yang Perlu Dibaca

| Bagian | Contoh | Kenapa Penting |
|---|---|---|
| Method | GET, POST, PATCH, DELETE | Menunjukkan jenis aksi |
| URL/path | /api/users/123 | Menunjukkan resource/endpoint |
| Query | ?search=test | Input dari URL |
| Header | Authorization, Cookie | Identitas/session/auth |
| Body/Payload | JSON/form-data | Data yang dikirim user |

## Bagian Response yang Perlu Dibaca

| Bagian | Contoh | Makna |
|---|---|---|
| Status code | 200, 401, 403, 404, 500 | Hasil umum request |
| Header | Location, Set-Cookie | Redirect/session/content type |
| Body | JSON/HTML/error | Data atau pesan dari server |
| Content-Type | application/json, text/html | Jenis response |

## Status Code Dasar

| Status | Makna Pemula |
|---|---|
| 200 | Request berhasil |
| 201 | Data berhasil dibuat |
| 400 | Request salah |
| 401 | Belum login/token tidak valid |
| 403 | Login, tapi tidak punya izin |
| 404 | Data/endpoint tidak ditemukan atau disembunyikan |
| 429 | Terlalu banyak request |
| 500 | Error internal server |

## Cara Berpikir Saat Melihat Request

Tanyakan:

```txt
1. Endpoint ini untuk fitur apa?
2. Ada ID resource tidak?
3. Ada data user lain tidak?
4. Ada field sensitif tidak?
5. Response normalnya seperti apa?
6. Response berubah kalau input diganti tidak?
```

## Contoh Membaca IDOR

Request:

```http
GET /api/invoices/991
Authorization: Bearer token-akun-b
```

Pertanyaan:

```txt
Invoice 991 ini milik siapa?
Akun B boleh melihat invoice ini tidak?
```

Expected secure response:

```http
HTTP/1.1 403 Forbidden
```

Suspicious response:

```http
HTTP/1.1 200 OK
```

```json
{
  "invoice_id": 991,
  "owner_email": "akun-a@example.com"
}
```

## Contoh Membaca Error Disclosure

Request:

```http
GET /api/products?search='
```

Suspicious response:

```txt
SQL syntax error
```

Makna:

```txt
Input masuk ke query database secara tidak aman atau error database bocor.
```

## Evidence yang Perlu Dicatat

```txt
- Request normal
- Request test
- Response normal
- Response test
- Status code
- Parameter yang berubah
- Akun/role yang digunakan
```

## Kesalahan Pemula

```txt
- Hanya melihat tampilan halaman, tidak melihat response
- Tidak mencatat request normal
- Mengubah terlalu banyak bagian sekaligus
- Tidak tahu beda 401 dan 403
- Langsung mencari payload tanpa tahu endpoint melakukan apa
```
