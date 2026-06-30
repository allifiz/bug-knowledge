# Endpoint Scenarios

Endpoint Scenarios menjawab pertanyaan praktis:

> Aku nemu endpoint ini. Harus cek apa?

Bagian ini dibuat untuk pemula yang sudah membuka DevTools/Network/Burp dan menemukan endpoint, tapi belum tahu kemungkinan bug apa yang relevan.

## Cara Pakai

1. Cocokkan endpoint yang kamu temukan dengan pola di bawah.
2. Baca kemungkinan bug.
3. Lakukan test aman.
4. Bandingkan expected output dan suspicious output.
5. Jika ada indikasi, lanjut baca Bug Tree atau Theory to Real Case.

## Peta Cepat

| Endpoint Pattern | Kemungkinan Bug |
|---|---|
| `GET /api/users/{id}` | IDOR read, excessive data exposure |
| `PATCH /api/users/{id}` | IDOR write, mass assignment |
| `POST /api/login` | user enumeration, missing rate limit, SQLi indicator |
| `POST /api/register` | mass assignment, email verification issue |
| `POST /api/forgot-password` | user enumeration, reset token issue |
| `POST /api/upload` | file exposure, weak validation |
| `GET /api/files/{id}/download` | IDOR download, public file exposure |
| `GET /api/invoices/{id}` | IDOR read, sensitive data exposure |
| `PATCH /api/team/member/{id}/role` | privilege escalation, role tampering |
| `POST /api/coupon/apply` | coupon reuse, business logic |

## Prinsip

Jangan test semuanya secara membabi buta.

Tanya dulu:

```txt
Endpoint ini melakukan apa?
Data siapa yang dibaca/diubah?
Ada ID resource?
Ada role/permission?
Ada file?
Ada input yang masuk database atau HTML?
Apa expected output jika user tidak punya akses?
```
