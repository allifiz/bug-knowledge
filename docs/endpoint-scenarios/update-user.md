# Scenario: `PATCH /api/users/{id}`

Endpoint ini biasanya digunakan untuk mengubah data user.

## Contoh Endpoint

```txt
PATCH /api/users/123
PUT /api/users/123
PATCH /api/profile/123
```

Body umum:

```json
{
  "name": "User Test",
  "bio": "Hello"
}
```

## Pertanyaan Analisis

```txt
- User sedang mengubah data siapa?
- Apakah ID di URL harus sama dengan user login?
- Field apa saja yang boleh diubah?
- Apakah server memakai allowlist field?
- Apakah role/is_admin bisa ikut dikirim?
```

## Kemungkinan Bug

```txt
Access Control
├── IDOR write
├── Broken object level authorization
└── Mass assignment

Input Validation
├── Stored XSS
└── Error disclosure
```

## Test Aman 1 — IDOR Write

Akun A punya user ID `123`.

Request akun B:

```http
PATCH /api/users/123
Authorization: Bearer token-akun-b
Content-Type: application/json

{
  "name": "Changed by B"
}
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

```json
{
  "id": 123,
  "name": "Changed by B"
}
```

## Test Aman 2 — Mass Assignment

Request pada akun milik sendiri:

```json
{
  "name": "User Test",
  "role": "admin",
  "is_admin": true,
  "status": "verified"
}
```

Expected secure output:

```txt
Field role/is_admin/status ditolak atau diabaikan.
```

Suspicious output:

```json
{
  "id": 123,
  "name": "User Test",
  "role": "admin",
  "is_admin": true
}
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| 403/404 saat akun B update akun A | Kemungkinan aman |
| 200 dan nama akun A berubah | Indikasi IDOR write |
| Field sensitif diabaikan | Kemungkinan aman |
| Field role/is_admin berubah | Indikasi mass assignment |

## Next Step

```txt
- Gunakan akun milik sendiri
- Jangan mengubah data user asli
- Simpan before/after
- Sensor data sensitif
```

## Link Terkait

- [IDOR Write](../bug-tree/access-control/idor-write.md)
- [Mass Assignment](../bug-tree/access-control/mass-assignment.md)
