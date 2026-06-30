# Scenario: `GET /api/users/{id}`

Endpoint ini biasanya digunakan untuk mengambil data user berdasarkan ID.

## Contoh Endpoint

```txt
GET /api/users/123
GET /api/v1/users/123
GET /users?id=123
```

## Pertanyaan Analisis

```txt
- Data user siapa yang dikembalikan?
- Apakah endpoint ini hanya boleh mengembalikan data user sendiri?
- Apakah user biasa boleh melihat user lain?
- Apakah response berisi data sensitif?
- Apakah ada role/admin context?
```

## Kemungkinan Bug

```txt
Access Control
├── IDOR read
├── Broken object level authorization
└── Excessive data exposure

Information Disclosure
├── Email/phone/address leakage
├── Internal role leakage
└── Hidden field leakage
```

## Test Aman

Gunakan dua akun milik sendiri.

Request akun A:

```http
GET /api/users/123
Authorization: Bearer token-akun-a
```

Request akun B:

```http
GET /api/users/123
Authorization: Bearer token-akun-b
```

## Expected Secure Output

Jika user B tidak boleh melihat user A:

```http
HTTP/1.1 403 Forbidden
```

atau:

```http
HTTP/1.1 404 Not Found
```

atau response hanya menampilkan data publik yang memang boleh dilihat.

## Suspicious Output

```http
HTTP/1.1 200 OK
```

```json
{
  "id": 123,
  "email": "akun-a@example.com",
  "phone": "08123456789",
  "address": "Garut",
  "role": "user",
  "is_verified": true
}
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| 403/404 | Kemungkinan access control aman |
| 200 + data publik saja | Belum tentu bug |
| 200 + email/phone/private data user lain | Indikasi IDOR/data exposure |
| 200 + field internal seperti role/is_admin | Potensi excessive data exposure |

## Next Step

```txt
- Jangan enumerate ID banyak-banyak
- Gunakan akun milik sendiri
- Sensor data sensitif
- Lanjut cek endpoint update jika ada: PATCH /api/users/{id}
```

## Link Terkait

- [IDOR Read](../bug-tree/access-control/idor-read.md)
- [IDOR — Theory to Real Case](../theory-to-real-case/idor.md)
- [Access Control Response](../output-encyclopedia/access-control-response.md)
