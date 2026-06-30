# IDOR Read

IDOR Read terjadi ketika user bisa membaca resource milik user lain dengan mengganti ID resource.

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

## Test Aman

Gunakan dua akun milik sendiri.

### Request akun A

```http
GET /api/invoices/991
Authorization: Bearer token-akun-a
```

### Request akun B

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

Jika akun B bisa membaca resource akun A, kemungkinan:

```txt
IDOR Read / Broken Object Level Authorization
```

Jika hanya metadata non-sensitif yang muncul, analisis lagi impact-nya. Tidak semua perbedaan response otomatis valid.

## Next Step Aman

```txt
- Jangan akses resource user asli
- Jangan enumerate banyak ID
- Simpan request akun A dan akun B
- Sensor data sensitif
- Jelaskan bahwa data akun A dapat diakses akun B
```

## Evidence

```txt
- Endpoint terdampak
- Request akun A
- Request akun B
- Response 200 yang menunjukkan data akun A
- Bukti bahwa akun B tidak seharusnya punya akses
```
