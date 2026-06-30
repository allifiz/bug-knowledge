# IDOR Write

IDOR Write terjadi ketika user bisa mengubah, menghapus, membatalkan, atau menjalankan aksi pada resource milik user lain.

Impact IDOR Write biasanya lebih tinggi dibanding IDOR Read karena ada perubahan data.

Contoh sederhana:

```txt
Akun A punya alamat ID 77.
Akun B seharusnya tidak boleh mengubah alamat itu.
Tapi request dari Akun B berhasil mengubah alamat Akun A.
```

## Tool Level

| Kebutuhan | Jawaban |
|---|---|
| Bisa tanpa Burp? | Sebagian, tapi kurang nyaman |
| Minimal tools | DevTools Network + dua akun testing |
| Disarankan | API Client / Proxy Tool |
| Proxy tool | Opsional, membantu mengganti token/session antar akun |
| Butuh akun testing? | Ya, dua akun milik sendiri |

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

## Cara Mencoba Secara Aman

### Mode 1 — DevTools Network

```txt
1. Buat dua akun testing: Akun A dan Akun B.
2. Login sebagai Akun A.
3. Buat resource testing, misalnya alamat, profile tambahan, draft, atau file dummy.
4. Buka DevTools → Network.
5. Lakukan update normal pada resource Akun A.
6. Catat endpoint, method, payload, dan ID resource.
7. Login sebagai Akun B.
8. Coba kirim aksi ke ID resource Akun A.
9. Cek apakah server menolak atau malah mengubah data.
```

### Mode 2 — API Client / Proxy

```txt
1. Copy request update/delete/action dari Akun A.
2. Ganti token/session menjadi milik Akun B.
3. Gunakan resource dummy milik sendiri.
4. Kirim request sekali untuk validasi.
5. Cek before/after resource.
6. Jangan lakukan aksi irreversible pada data nyata.
```

## Request Normal Akun A

```http
PATCH /api/addresses/77
Authorization: Bearer token-akun-a
Content-Type: application/json

{
  "label": "Rumah Baru"
}
```

## Request Test Akun B

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

| Hasil | Makna |
|---|---|
| Akun B mendapat 403/404 | Kemungkinan aman |
| Akun B mendapat 200 tapi tidak ada perubahan | Perlu validasi lagi |
| Akun B berhasil mengubah resource Akun A | Suspicious, kemungkinan IDOR Write |
| Aksi delete/cancel/approve berhasil | Impact bisa lebih tinggi |

## Evidence yang Perlu Disimpan

```txt
- Resource dibuat oleh Akun A
- Request normal dari Akun A
- Request aksi dari Akun B
- Response berhasil jika tidak seharusnya
- Bukti before/after resource berubah
- Sensor token, cookie, dan data sensitif
```

## Kapan Harus Stop

```txt
- Gunakan resource dummy milik sendiri
- Jangan ubah data user asli
- Jangan melakukan delete/cancel/approve irreversible pada target nyata
- Jangan enumerate banyak ID
- Cukup buktikan satu perubahan aman
```

## Recommendation

```txt
- Validasi ownership resource di backend sebelum aksi write
- Pisahkan authorization read dan write/action
- Return 403/404 untuk resource yang bukan milik user
- Audit semua endpoint PATCH/PUT/DELETE/POST action
```
