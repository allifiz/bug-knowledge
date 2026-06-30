# Feature Map: Profile

Profile sering punya banyak surface bug karena berisi data user, ID user, update data, dan kadang upload avatar.

## Endpoint Pattern

```txt
GET /api/me
GET /api/users/{id}
PATCH /api/users/{id}
PATCH /api/profile
POST /api/profile/avatar
```

## Bug yang Mungkin Relevan

```txt
Access Control
├── IDOR read profile
├── IDOR update profile
└── Broken access control

Input/Output
├── Stored XSS di nama/bio
├── Mass assignment
└── Excessive data exposure

File
├── Avatar public access
├── Weak file validation
└── Old avatar still accessible
```

### Klik untuk belajar

| Bug | Buka halaman |
|---|---|
| IDOR read profile | [IDOR Read](../bug-tree/access-control/idor-read.md) |
| IDOR update profile | [IDOR Write](../bug-tree/access-control/idor-write.md) |
| Broken access control | [Access Control](../bug-tree/access-control/index.md) |
| Stored XSS | [XSS — Theory to Real Case](../theory-to-real-case/xss.md) |
| Mass assignment | [Mass Assignment](../bug-tree/access-control/mass-assignment.md) |
| Excessive data exposure | [Access Control Response](../output-encyclopedia/access-control-response.md) |
| Avatar public access | [File Exposure](../bug-tree/input-validation/file-exposure.md) |
| Weak file validation | [File Upload Output](../output-encyclopedia/file-upload-output.md) |
| Old avatar still accessible | [File Exposure](../bug-tree/input-validation/file-exposure.md) |

## Test Aman Awal

### 1. IDOR read

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
  "email": "akun-a@example.com",
  "name": "Akun A"
}
```

### 2. Mass assignment

Cek apakah update profile menerima field yang tidak seharusnya user ubah.

Contoh field mencurigakan:

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
Field role/is_admin/status diabaikan atau ditolak.
```

Suspicious output:

```txt
Role atau privilege berubah karena field tambahan dari user.
```

Catatan:

```txt
Lakukan hanya pada akun sendiri. Jangan ubah privilege untuk merusak sistem.
```

### 3. Stored XSS indicator

Field relevan:

```txt
name
bio
address
website
company
```

Payload deteksi aman:

```txt
"><test-xss>
```

Expected secure output:

```html
&lt;test-xss&gt;
```

Suspicious output:

```html
<div class="name">"><test-xss></div>
```
