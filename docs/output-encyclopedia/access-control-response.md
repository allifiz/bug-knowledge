# Access Control Response

Halaman ini membantu membaca response saat testing IDOR/Broken Access Control.

## Test Umum

```txt
Akun A punya resource.
Akun B mencoba akses resource Akun A.
```

## Expected Secure Output

### 403 Forbidden

```http
HTTP/1.1 403 Forbidden
```

```json
{
  "message": "You do not have permission to access this resource"
}
```

Makna:

```txt
Server mengenali request, tapi menolak karena permission tidak cukup.
```

### 404 Not Found

```http
HTTP/1.1 404 Not Found
```

```json
{
  "message": "Resource not found"
}
```

Makna:

```txt
Server tidak mengembalikan resource. Bisa jadi aman, bisa juga sengaja menyembunyikan keberadaan resource.
```

### Empty Response

```json
{
  "data": null
}
```

atau:

```json
{
  "data": []
}
```

Makna:

```txt
Kemungkinan aman, tapi tetap cek konteks endpoint.
```

## Suspicious Output

### Data user lain muncul

```json
{
  "id": 991,
  "owner_email": "akun-a@example.com",
  "amount": 500000
}
```

Makna:

```txt
Kemungkinan IDOR Read.
```

### Update berhasil

```json
{
  "id": 77,
  "label": "Changed by B",
  "owner_id": "akun-a"
}
```

Makna:

```txt
Kemungkinan IDOR Write.
```

### Role berubah

```json
{
  "id": 5,
  "role": "admin"
}
```

Makna:

```txt
Kemungkinan privilege escalation atau role tampering.
```

## Cara Validasi Aman

```txt
- Pastikan resource memang milik akun A.
- Pastikan request test memakai token/cookie akun B.
- Jangan gunakan data user asli.
- Jangan enumerate banyak resource.
- Jangan melakukan perubahan irreversible.
```
