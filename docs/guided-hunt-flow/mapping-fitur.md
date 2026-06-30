# Mapping Fitur

Mapping fitur adalah proses mencatat semua fitur yang bisa digunakan oleh user.

Tujuannya agar kamu tahu area mana yang berpotensi punya bug.

## Cara Mapping

Gunakan aplikasi seperti user biasa.

Catat:

```txt
- Nama fitur
- Role yang bisa mengakses
- Data yang dibuat/dibaca/diubah/dihapus
- Apakah ada file upload/download
- Apakah ada ID resource
- Apakah ada input user
- Apakah ada flow sensitif seperti pembayaran, reset password, invite member
```

## Contoh Mapping

```txt
Fitur: Profile
Role: user login
Aksi:
- lihat profile
- update nama
- update email
- upload avatar
Endpoint:
- GET /api/me
- PATCH /api/users/123
- POST /api/avatar
Kemungkinan bug:
- IDOR update profile
- Mass assignment
- Stored XSS di nama/bio
- File exposure di avatar
```

## Feature → Possible Bugs

```txt
Login
→ user enumeration
→ missing rate limit
→ weak session handling
→ SQLi indicator

Register
→ email verification bypass
→ role tampering
→ duplicate account issue
→ mass assignment

Profile
→ IDOR
→ mass assignment
→ stored XSS
→ excessive data exposure

Upload
→ weak file validation
→ public access to private file
→ old file still accessible
→ path disclosure

Search/Filter
→ SQLi indicator
→ XSS reflected
→ error disclosure

Invoice/Order
→ IDOR read/write
→ predictable file download
→ business logic issue
→ excessive data exposure

Team/Role
→ privilege escalation
→ broken access control
→ invite abuse
→ role tampering
```

## Output yang Diharapkan

Setelah mapping, kamu punya tabel seperti ini:

| Fitur | Endpoint | Data Sensitif | Kemungkinan Bug |
|---|---|---|---|
| Profile | PATCH /api/users/123 | email, nama | IDOR, mass assignment |
| Invoice | GET /api/invoices/991 | invoice, alamat | IDOR, data exposure |
| Upload | POST /api/avatar | file user | file exposure, validation |
| Login | POST /api/login | credential | auth issue, rate limit |

## Kalau Bingung Mulai dari Mana

Prioritaskan fitur yang punya:

```txt
1. ID resource
2. Data sensitif
3. File upload/download
4. Role/user permission
5. Auth flow
6. Payment/order/coupon
```
