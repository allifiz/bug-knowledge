# Cara Baca Request & Response

Hampir semua analisis web security berawal dari sini: membaca request dan response.

Kamu tidak harus langsung hafal banyak payload. Kalau belum bisa membaca apa yang dikirim browser dan apa yang dibalas server, payload apa pun akan terasa seperti tebak-tebakan.

Gambaran sederhananya:

```txt
browser mengirim sesuatu → server memproses → server membalas sesuatu
```

Dari balasan itu, kita mulai menilai apakah perilakunya normal, ditolak dengan benar, atau justru mencurigakan.

## Request Itu Apa?

Request adalah permintaan dari browser atau client ke server.

Contoh:

```http
GET /api/users/123 HTTP/1.1
Host: app.example.com
Authorization: Bearer token-user
```

Kalau dibaca manusia:

```txt
Client sedang meminta data user dengan ID 123.
```

Dari satu request saja, sudah ada beberapa pertanyaan penting:

- endpoint ini untuk fitur apa?
- ID `123` itu milik siapa?
- token yang dipakai punya izin apa?
- response-nya nanti berisi data private atau public?

## Response Itu Apa?

Response adalah jawaban server setelah menerima request.

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

Kalau dibaca sederhana:

```txt
Server berhasil mengembalikan data user.
```

Yang perlu diperhatikan bukan cuma datanya, tapi juga status code, header, dan apakah response itu pantas diberikan ke user yang sedang login.

## Bagian Request yang Perlu Dibaca

| Bagian | Contoh | Kenapa Penting |
|---|---|---|
| Method | GET, POST, PATCH, DELETE | Menunjukkan jenis aksi |
| URL/path | /api/users/123 | Menunjukkan resource atau endpoint |
| Query | ?search=test | Input yang dikirim lewat URL |
| Header | Authorization, Cookie | Identitas, session, atau token |
| Body/Payload | JSON/form-data | Data yang dikirim user |

## Bagian Response yang Perlu Dibaca

| Bagian | Contoh | Makna |
|---|---|---|
| Status code | 200, 401, 403, 404, 500 | Gambaran hasil request |
| Header | Location, Set-Cookie | Redirect, session, content type |
| Body | JSON/HTML/error | Data atau pesan dari server |
| Content-Type | application/json, text/html | Jenis response |

## Status Code yang Paling Sering Muncul

| Status | Cara membacanya |
|---|---|
| 200 | Request berhasil |
| 201 | Data berhasil dibuat |
| 400 | Request dianggap salah |
| 401 | Belum login atau token tidak valid |
| 403 | Sudah login, tapi tidak punya izin |
| 404 | Data/endpoint tidak ditemukan, atau sengaja disembunyikan |
| 429 | Terlalu banyak request |
| 500 | Error internal server |

Status code tidak bisa berdiri sendiri. Tetap lihat konteksnya.

Misalnya, `404` pada IDOR bisa saja berarti data benar-benar tidak ada, tapi bisa juga strategi aman untuk menyembunyikan resource yang bukan milik user.

## Cara Berpikir Saat Melihat Request

Biasakan bertanya seperti ini:

```txt
1. Endpoint ini milik fitur apa?
2. Ada ID resource di URL, query, atau body?
3. Resource itu milik siapa?
4. Token/cookie yang dipakai punya role apa?
5. Response normalnya seperti apa?
6. Kalau input diganti sedikit, response berubah seperti apa?
7. Apakah response itu membocorkan data, error, atau izin yang tidak seharusnya?
```

## Contoh Membaca IDOR

Request:

```http
GET /api/invoices/991
Authorization: Bearer token-akun-b
```

Pertanyaan utamanya:

```txt
Invoice 991 ini milik siapa?
Akun B memang boleh melihat invoice ini?
```

Response yang aman biasanya:

```http
HTTP/1.1 403 Forbidden
```

atau:

```http
HTTP/1.1 404 Not Found
```

Response yang mencurigakan:

```http
HTTP/1.1 200 OK
```

```json
{
  "invoice_id": 991,
  "owner_email": "akun-a@example.com"
}
```

Kalau Akun B bisa melihat invoice Akun A, itu sinyal kuat adanya masalah access control.

## Contoh Membaca Error Disclosure

Request:

```http
GET /api/products?search='
```

Response mencurigakan:

```txt
SQL syntax error
```

Artinya belum tentu langsung SQL Injection valid. Tapi itu indikator bahwa input mungkin menyentuh query database atau error database bocor ke user.

Di tahap ini, cukup simpan request dan response. Jangan lanjut ke payload yang mengambil data.

## Evidence yang Perlu Dicatat

```txt
- Request normal
- Request test
- Response normal
- Response test
- Status code
- Parameter yang berubah
- Akun atau role yang digunakan
```

## Kesalahan Pemula

- hanya melihat tampilan halaman, tapi tidak melihat response;
- tidak menyimpan request normal sebagai pembanding;
- mengubah terlalu banyak bagian sekaligus;
- belum paham beda 401 dan 403;
- langsung mencari payload tanpa tahu endpoint itu melakukan apa.

Semakin rapi kamu membaca request dan response, semakin kecil kemungkinan kamu salah klaim bug.
