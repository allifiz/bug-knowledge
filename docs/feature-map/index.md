# Feature Map

Feature Map membantu pemula menjawab:

> Aku ketemu fitur ini. Bug apa yang mungkin relevan?

Gunakan halaman ini ketika kamu sudah mapping fitur aplikasi.

## Peta Cepat

| Fitur | Kemungkinan Bug |
|---|---|
| Login | user enumeration, missing rate limit, session issue, SQLi indicator |
| Register | email verification bypass, role tampering, mass assignment |
| Forgot Password | reusable token, expired token lemah, session lama masih aktif |
| Profile | IDOR, mass assignment, stored XSS, excessive data exposure |
| Upload | file exposure, weak validation, path disclosure, predictable URL |
| Search/Filter | SQLi indicator, reflected XSS, error disclosure |
| Invoice/Order | IDOR, business logic, data exposure, predictable download |
| Team/Role | privilege escalation, broken access control, role tampering |
| Export/Download | IDOR, sensitive data exposure, public file access |
| Admin Panel | vertical privilege, endpoint exposure, role bypass |

## Cara Menggunakan

1. Pilih fitur yang kamu temukan.
2. Baca kemungkinan bug.
3. Pilih test aman.
4. Bandingkan expected output dan suspicious output.
5. Jika ada indikasi, baca halaman bug tree terkait.

## Prioritas Pemula

Mulai dari fitur yang paling jelas impact-nya:

```txt
1. Profile dengan ID user
2. Invoice/order dengan ID
3. File upload/download
4. Login/forgot password
5. Team/role/admin
6. Search/filter
```
