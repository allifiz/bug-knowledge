# IDOR Write

IDOR Write terjadi ketika user bisa mengubah, menghapus, membatalkan, atau menjalankan aksi pada resource milik user lain.

Impact IDOR Write biasanya lebih tinggi dibanding IDOR Read karena ada perubahan data.

## Endpoint Pattern

```txt
PATCH /api/users/{id}
PUT /api/addresses/{id}
DELETE /api/files/{id}
PATCH /api/orders/{id}/cancel
POST /api/invoices/{id}/resend
PATCH /api/team/member/{id}/role
```

## Kapan Curiga

```txt
- Ada method PATCH/PUT/DELETE/POST action
- Ada ID resource
- Aksi mengubah status/data
- Resource seharusnya milik user tertentu
```

## Test Aman

Gunakan resource milik akun A, lalu coba aksi dari akun B.

### Request normal akun A

```http
PATCH /api/addresses/77
Authorization: Bearer token-akun-a
Content-Type: application/json

{
  "label": "Rumah Baru"
}
```

### Request test akun B

```http
PATCH /api/addresses/77
Authorization: Bearer token-akun-b
Content-Type: application/json

{
  "label": "Test Unauthorized Update"
}
```

## Expected Secure Output

```http
HTTP/1.1 403 Forbidden
```

atau:

```http
HTTP/1.1 404 Not Found
```

## Suspicious Output

```http
HTTP/1.1 200 OK
```

```json
{
  "id": 77,
  "label": "Test Unauthorized Update",
  "owner_id": 123
}
```

## Cara Membaca Hasil

Jika akun B bisa mengubah resource akun A, kemungkinan:

```txt
IDOR Write / Broken Object Level Authorization
```

Jika aksi yang dilakukan adalah delete/cancel/approve, impact bisa lebih besar.

## Next Step Aman

```txt
- Gunakan resource milik sendiri
- Jangan ubah data user asli
- Jangan melakukan aksi irreversible pada target nyata
- Simpan request dan response
- Jelaskan before/after dengan jelas
```

## Evidence

```txt
- Resource dibuat oleh akun A
- Request aksi dari akun B
- Response berhasil
- Bukti resource berubah
- Sensor data sensitif
```
