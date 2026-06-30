# Mapping Endpoint

Mapping endpoint adalah proses mencatat request yang muncul ketika kamu memakai fitur aplikasi.

Biasanya endpoint bisa dilihat lewat browser DevTools → Network tab, proxy seperti Burp Suite, atau log aplikasi milik sendiri.

## Yang Dicatat

```txt
- Method: GET, POST, PATCH, DELETE
- URL/path
- Query parameter
- Body request
- Auth header/cookie
- Status code
- Response penting
- Fitur asal endpoint
```

## Contoh Catatan Endpoint

```txt
Auth:
POST /api/login
POST /api/register
POST /api/forgot-password

User:
GET /api/me
GET /api/users/123
PATCH /api/users/123

File:
POST /api/avatar
GET /storage/avatar/abc.png

Order:
GET /api/orders
GET /api/orders/991
PATCH /api/orders/991/cancel

Invoice:
GET /api/invoices/991
GET /api/invoices/991/download
```

## Endpoint Pattern dan Bug yang Mungkin

### Ada ID di URL

```txt
GET /api/users/123
GET /api/orders/991
GET /api/invoices/991
```

Kemungkinan:

```txt
- IDOR read
- broken object level authorization
- excessive data exposure
```

### Ada method PATCH/PUT/DELETE

```txt
PATCH /api/users/123
DELETE /api/files/883
PATCH /api/team/member/5/role
```

Kemungkinan:

```txt
- IDOR write
- privilege escalation
- mass assignment
- unauthorized action
```

### Ada search/filter/sort

```txt
GET /api/products?search=laptop
GET /api/orders?status=paid
GET /api/users?sort=name
```

Kemungkinan:

```txt
- SQLi indicator
- reflected XSS
- error disclosure
- sort/order injection concept
```

### Ada upload/download

```txt
POST /api/avatar
POST /api/documents
GET /api/files/883/download
```

Kemungkinan:

```txt
- file exposure
- weak file validation
- public access to private file
- predictable file URL
```

### Ada auth flow

```txt
POST /api/login
POST /api/forgot-password
POST /api/reset-password
POST /api/logout
```

Kemungkinan:

```txt
- user enumeration
- reset token issue
- session not invalidated
- missing rate limit
```

## Output Mapping yang Bagus

```txt
Endpoint: GET /api/invoices/991
Fitur: Invoice detail
Role: user login
Data: invoice, email, amount
Kemungkinan bug:
- IDOR read
- excessive data exposure
- predictable invoice ID
Test awal:
- akun B akses invoice akun A
Expected:
- 403/404
Suspicious:
- 200 + data invoice akun A
```
