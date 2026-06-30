# IDOR — Dari Teori ke Real Case

IDOR terjadi ketika user bisa mengakses resource berdasarkan ID tanpa validasi ownership/permission yang benar.

Di real program, IDOR sering muncul pada invoice, order, profile, file, address, ticket, dan team member.

## Bentuk Real Case

```txt
GET /api/users/123
PATCH /api/users/123
GET /api/orders/991
GET /api/invoices/991/download
DELETE /api/files/883
PATCH /api/team/member/5/role
```

## Kapan Harus Curiga

```txt
- Ada ID resource di URL/query/body
- Resource seharusnya milik user tertentu
- Endpoint butuh login
- Bisa dibuat resource dengan akun sendiri
- Ada aksi read/update/delete/cancel/download
```

## Test Aman

Gunakan dua akun milik sendiri.

```txt
Akun A membuat resource.
Akun B mencoba akses resource Akun A.
```

## Case 1 — Read Resource

Request akun A:

```http
GET /api/invoices/991
Authorization: Bearer token-akun-a
```

Request akun B:

```http
GET /api/invoices/991
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
```

```json
{
  "invoice_id": 991,
  "owner_email": "akun-a@example.com",
  "amount": 500000
}
```

Kesimpulan:

```txt
Kemungkinan IDOR Read / Broken Object Level Authorization.
```

## Case 2 — Write Resource

Request akun B:

```http
PATCH /api/addresses/77
Authorization: Bearer token-akun-b
Content-Type: application/json

{
  "label": "Changed by B"
}
```

Expected secure output:

```txt
403/404 atau update ditolak.
```

Suspicious output:

```json
{
  "id": 77,
  "label": "Changed by B",
  "owner_id": "akun-a"
}
```

Kesimpulan:

```txt
Kemungkinan IDOR Write / Broken Access Control.
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| 403/404 | Kemungkinan aman |
| 200 tapi data kosong | Perlu cek apakah response memang tidak expose data |
| 200 + data akun A | Indikasi kuat IDOR read |
| 200 + resource berubah | Indikasi kuat IDOR write |

## Next Step Aman

```txt
- Jangan enumerate ID banyak-banyak
- Jangan akses data user asli
- Gunakan resource milik akun testing sendiri
- Jangan melakukan aksi irreversible pada data real
- Simpan request akun A dan akun B
- Sensor data sensitif
```
