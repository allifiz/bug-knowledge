# SQL Injection — Dari Teori ke Real Case

SQL Injection terjadi ketika input user ikut memengaruhi query database secara tidak aman.

Di lab, bentuknya sering sederhana seperti:

```txt
User ID: 1
```

Di real target, bentuknya lebih sering muncul di fitur search, filter, sort, login, detail data, atau export report.

## Tool Level

| Kebutuhan | Jawaban |
|---|---|
| Bisa tanpa Burp? | Ya, untuk indikator awal |
| Minimal tools | Browser biasa |
| Disarankan | DevTools Network untuk melihat status code dan response |
| Proxy tool | Opsional |
| Butuh akun testing? | Tidak selalu, tergantung endpoint |

## Bentuk Real Case

Endpoint yang relevan:

```txt
GET /products?search=laptop
GET /api/users?id=123
GET /api/orders?status=paid
GET /api/report?from=2026-01-01&to=2026-01-31
POST /api/login
```

Parameter yang sering menarik:

```txt
id
search
q
keyword
filter
status
sort
order_by
category
email
username
from
to
```

## Kapan Harus Curiga

Curiga jika:

```txt
- input memengaruhi data yang keluar;
- input dipakai untuk mencari/filter data;
- status berubah jadi 500 ketika input tertentu dikirim;
- response menampilkan error database;
- response normal dan response test berbeda drastis.
```

## Cara Mencoba Secara Aman

### Mode 1 — Browser biasa

```txt
1. Cari fitur yang memakai input, misalnya search, filter, login, atau report.
2. Coba input normal dulu.
3. Catat output normalnya.
4. Masukkan single quote sebagai indikator ringan.
5. Lihat apakah aplikasi tetap memberi response aman atau muncul error database.
6. Jangan lanjut ke payload dump, bypass, atau destructive.
```

### Mode 2 — DevTools Network

```txt
1. Buka DevTools → Network.
2. Jalankan request normal.
3. Catat endpoint, parameter, status code, dan response.
4. Jalankan request test dengan input indikator ringan.
5. Bandingkan response normal dan response test.
6. Simpan error database jika muncul.
```

### Mode 3 — API Client / Proxy

```txt
1. Copy request normal dari DevTools.
2. Ubah hanya satu parameter yang diuji.
3. Kirim request test sekali.
4. Bandingkan status code dan response.
5. Stop jika sudah muncul error database yang jelas.
```

## Test 1 — Single Quote Detection

### Payload

```txt
'
```

### Request normal

```http
GET /api/products?search=laptop
```

### Request test

```http
GET /api/products?search='
```

### Expected secure output

Aplikasi aman biasanya tetap merespons terkontrol:

```json
{
  "data": [],
  "message": "No products found"
}
```

atau:

```json
{
  "message": "Invalid input"
}
```

atau response tetap normal tanpa membocorkan detail database.

### Suspicious output

Jika muncul error database, itu mencurigakan.

MySQL/MariaDB:

```txt
You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version
```

```txt
SQLSTATE[42000]: Syntax error or access violation
```

```txt
mysqli_sql_exception
```

PostgreSQL:

```txt
ERROR: syntax error at or near "'"
```

```txt
unterminated quoted string at or near
```

SQL Server:

```txt
Unclosed quotation mark after the character string
```

```txt
Incorrect syntax near
```

Oracle:

```txt
ORA-01756: quoted string not properly terminated
```

SQLite:

```txt
SQLite Error: near "'": syntax error
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Response tetap normal | Belum ada indikasi kuat |
| Input ditolak validasi | Kemungkinan input ditangani |
| Status berubah 500 | Perlu dicurigai, belum tentu SQLi valid |
| Error database muncul | Indikasi kuat input menyentuh query SQL |
| Response kosong total | Bandingkan ulang dengan request normal |

## Kenapa Single Quote Bisa Memunculkan Error?

Misal query rawan secara konsep:

```sql
SELECT * FROM products WHERE name LIKE '%USER_INPUT%';
```

Jika input adalah `'`, struktur query bisa rusak jika input digabung langsung ke SQL tanpa parameterization.

## Test 2 — Numeric Parameter Behavior

Relevan untuk parameter angka:

```http
GET /api/products?id=123
```

Request pembanding:

```http
GET /api/products?id=123
GET /api/products?id=abc
GET /api/products?id='
```

Expected secure output:

```json
{
  "message": "Invalid id"
}
```

Suspicious output:

```txt
invalid input syntax for type integer
```

```txt
Truncated incorrect INTEGER value
```

```txt
Conversion failed when converting the varchar value
```

## False Positive Umum

Tidak semua 500 berarti SQL Injection.

Bisa saja:

```txt
- validasi backend buruk;
- tipe data salah;
- error handling jelek;
- service internal gagal;
- bug parsing biasa.
```

Indikasi jadi lebih kuat jika:

```txt
- error menyebut database;
- hanya muncul pada karakter tertentu seperti quote;
- endpoint memang mengambil data database;
- response berubah konsisten berdasarkan input.
```

## Evidence yang Perlu Disimpan

```txt
- URL dan parameter terdampak
- Request normal
- Response normal
- Request test
- Response error
- Status code
- Screenshot error database jika ada
- Penjelasan kenapa output mencurigakan
```

## Kapan Harus Stop

```txt
- Jangan dump database
- Jangan mengambil data user
- Jangan menjalankan payload destructive
- Jangan bypass login atau akses data di luar izin
- Cukup validasi indikator awal dan tulis report sesuai bukti
```

## Kesimpulan Report

Jika hanya error database:

```txt
Possible SQL Injection Indicator / Database Error Disclosure
```

Jika sudah ada behavior yang konsisten menunjukkan input memengaruhi query:

```txt
SQL Injection Indicator on [parameter]
```

## Lanjut Baca

- [SQL Errors](../output-encyclopedia/sql-errors.md)
