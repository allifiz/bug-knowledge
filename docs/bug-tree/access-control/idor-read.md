# IDOR Read

IDOR Read terjadi ketika user bisa membaca resource milik user lain dengan mengganti ID resource.

Contoh sederhana:

```txt
Akun A punya invoice 991.
Akun B seharusnya tidak boleh melihat invoice 991.
Tapi ketika Akun B membuka endpoint invoice 991, data Akun A tetap muncul.
```

## Tool Level

| Kebutuhan | Jawaban |
|---|---|
| Bisa tanpa Burp? | Ya, sebagian bisa |
| Minimal tools | Browser + dua akun testing |
| Disarankan | DevTools Network / API Client |
| Proxy tool | Opsional, membantu membandingkan request antar akun |
| Butuh akun testing? | Ya, dua akun milik sendiri |

## Kapan Curiga

Endpoint seperti:

```txt
GET /api/users/{id}
GET /api/orders/{id}
GET /api/invoices/{id}
GET /api/files/{id}/download
GET /api/tickets/{id}
```

Ciri-ciri:

```txt
- Ada ID di URL/query/body
- Resource seharusnya milik user tertentu
- Response berisi data private
- Bisa diuji dengan dua akun milik sendiri
```

## Cara Mencoba Secara Aman

### Mode 1 — Browser biasa

```txt
1. Buat dua akun testing: Akun A dan Akun B.
2. Login sebagai Akun A.
3. Buat atau buka resource milik Akun A, misalnya invoice/order/profile/file.
4. Catat ID resource dari URL atau halaman jika terlihat.
5. Logout dari Akun A.
6. Login sebagai Akun B.
7. Coba buka URL/resource Akun A yang tadi dicatat.
8. Perhatikan apakah aplikasi menolak akses atau malah menampilkan data Akun A.
```

### Mode 2 — DevTools Network

```txt
1. Login sebagai Akun A.
2. Buka DevTools → Network.
3. Buka resource milik Akun A.
4. Cari request API yang membawa ID resource.
5. Simpan endpoint, method, status code, dan response.
6. Login sebagai Akun B.
7. Jalankan request ke endpoint/resource ID yang sama.
8. Bandingkan response Akun A dan Akun B.
```

### Mode 3 — API Client / Proxy

```txt
1. Copy request resource Akun A dari DevTools.
2. Ganti token/session menjadi milik Akun B.
3. Kirim request sekali untuk validasi.
4. Jangan mencoba banyak ID.
5. Simpan request dan response sebagai evidence.
```

## Contoh Request Akun A

```http
GET /api/invoices/991
Authorization: Bearer token-akun-a
```

## Contoh Request Akun B

```http
GET /api/invoices/991
Authorization: Bearer token-akun-b
```

## Expected Secure Output

```http
HTTP/1.1 403 Forbidden
```

atau:

```http
HTTP/1.1 404 Not Found
```

atau:

```json
{
  "message": "You do not have permission to access this resource"
}
```

## Suspicious Output

```http
HTTP/1.1 200 OK
```

```json
{
  "invoice_id": 991,
  "owner_email": "akun-a@example.com",
  "amount": 500000,
  "status": "paid"
}
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Akun B mendapat 403/404 | Kemungkinan aman |
| Akun B mendapat 200 tapi data kosong | Perlu cek lagi |
| Akun B melihat data Akun A | Suspicious, kemungkinan IDOR Read |
| Akun B hanya melihat data public | Belum tentu bug |

## Evidence yang Perlu Disimpan

```txt
- Endpoint terdampak
- Request Akun A
- Request Akun B
- Response Akun B yang menunjukkan data Akun A
- Bukti bahwa Akun B tidak seharusnya punya akses
- Sensor token, cookie, email, dan data sensitif
```

## Kapan Harus Stop

```txt
- Jangan akses resource user asli
- Jangan enumerate banyak ID
- Jangan download banyak file
- Jangan membuka data sensitif lebih dari yang dibutuhkan
- Cukup validasi dengan akun milik sendiri
```

## Recommendation

```txt
- Validasi ownership resource di backend
- Jangan hanya mengandalkan ID yang sulit ditebak
- Return 403/404 untuk resource yang bukan milik user
- Terapkan authorization check di setiap endpoint read
```
