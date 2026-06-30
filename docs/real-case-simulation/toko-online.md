# Real Case Simulation: Toko Online

Simulasi ini memakai target fiktif:

```txt
https://toko-online.test
```

Semua data, endpoint, akun, dan response adalah contoh edukatif.

## 1. Rules dan Scope

Program membuka bug bounty untuk:

```txt
In scope:
- toko-online.test
- app.toko-online.test
- api.toko-online.test

Allowed:
- manual testing
- membuat akun testing
- multi-account testing dengan akun milik sendiri

Out of scope:
- DDoS
- spam
- social engineering
- brute force massal
- payment gateway pihak ketiga
```

Output tahap ini:

```txt
Target aman:
- app.toko-online.test
- api.toko-online.test

Batas:
- test manual saja
- tidak boleh brute force massal
- tidak menyentuh payment gateway pihak ketiga
```

## 2. Pakai Aplikasi sebagai User Biasa

Aktivitas normal:

```txt
[ ] Register akun A
[ ] Register akun B
[ ] Login akun A
[ ] Update profile
[ ] Upload avatar
[ ] Tambah produk ke cart
[ ] Buat order
[ ] Download invoice
[ ] Apply coupon
[ ] Logout
```

Fitur yang ditemukan:

```txt
Auth:
- Register
- Login
- Forgot password

User:
- Profile
- Avatar

Shop:
- Product search
- Cart
- Checkout
- Coupon

Order:
- Order detail
- Invoice download
```

## 3. Endpoint yang Ditemukan

```txt
POST /api/register
POST /api/login
GET /api/me
GET /api/users/123
PATCH /api/users/123
POST /api/avatar
GET /api/products?search=sepatu
POST /api/cart
POST /api/coupon/apply
POST /api/checkout
GET /api/orders/991
GET /api/invoices/991/download
```

## 4. Prioritas Testing

Endpoint paling menarik:

```txt
GET /api/users/123
→ cek IDOR read dan excessive data exposure

PATCH /api/users/123
→ cek IDOR write dan mass assignment

GET /api/invoices/991/download
→ cek IDOR download dan public file exposure

POST /api/coupon/apply
→ cek coupon reuse dan order ownership

GET /api/products?search=sepatu
→ cek SQLi indicator dan reflected XSS indicator
```

## 5. Test Case 1 — Invoice IDOR Download

### Situasi

Akun A membuat order dan mendapat invoice ID `991`.

### Request normal akun A

```http
GET /api/invoices/991/download
Authorization: Bearer token-akun-a
```

Expected normal output:

```http
HTTP/1.1 200 OK
Content-Type: application/pdf
```

### Request test akun B

```http
GET /api/invoices/991/download
Authorization: Bearer token-akun-b
```

### Expected secure output

```http
HTTP/1.1 403 Forbidden
```

atau:

```http
HTTP/1.1 404 Not Found
```

### Suspicious output

```http
HTTP/1.1 200 OK
Content-Type: application/pdf
```

PDF berisi invoice milik akun A.

### Cara membaca hasil

Jika akun B bisa download invoice akun A, kemungkinan:

```txt
IDOR Download / Broken Object Level Authorization
```

### Next step aman

```txt
- Jangan download invoice user asli
- Jangan enumerate invoice ID
- Sensor PDF
- Simpan request akun A dan akun B
```

## 6. Test Case 2 — Profile Mass Assignment

### Request normal

```http
PATCH /api/users/123
Authorization: Bearer token-akun-a
Content-Type: application/json

{
  "name": "Akun A"
}
```

### Request test

```http
PATCH /api/users/123
Authorization: Bearer token-akun-a
Content-Type: application/json

{
  "name": "Akun A",
  "role": "admin",
  "is_admin": true
}
```

### Expected secure output

```json
{
  "id": 123,
  "name": "Akun A",
  "role": "user"
}
```

### Suspicious output

```json
{
  "id": 123,
  "name": "Akun A",
  "role": "admin",
  "is_admin": true
}
```

### Cara membaca hasil

Jika field `role` atau `is_admin` berubah, kemungkinan:

```txt
Mass Assignment / Privilege Escalation
```

## 7. Test Case 3 — Coupon Reuse

### Situasi

Rules promo menyebut:

```txt
Coupon PROMO10 hanya bisa dipakai satu kali per user.
```

### Request pertama

```http
POST /api/coupon/apply
Authorization: Bearer token-akun-a
Content-Type: application/json

{
  "coupon_code": "PROMO10",
  "order_id": 991
}
```

Output normal:

```json
{
  "message": "Coupon applied",
  "discount": 10000
}
```

### Request kedua pada order lain

```http
POST /api/coupon/apply
Authorization: Bearer token-akun-a
Content-Type: application/json

{
  "coupon_code": "PROMO10",
  "order_id": 992
}
```

### Expected secure output

```json
{
  "message": "Coupon already used"
}
```

### Suspicious output

```json
{
  "message": "Coupon applied",
  "discount": 10000
}
```

### Cara membaca hasil

Jika coupon sekali pakai bisa dipakai berulang kali, kemungkinan:

```txt
Business Logic: Coupon Reuse
```

## 8. Test Case 4 — Product Search Error Indicator

### Request normal

```http
GET /api/products?search=sepatu
```

Expected normal output:

```json
{
  "data": [
    {
      "id": 10,
      "name": "Sepatu Hitam"
    }
  ]
}
```

### Request test ringan

```http
GET /api/products?search='
```

### Expected secure output

```json
{
  "data": [],
  "message": "No products found"
}
```

atau:

```json
{
  "message": "Invalid search input"
}
```

### Suspicious output

```txt
You have an error in your SQL syntax
```

atau:

```txt
SQLSTATE[42000]: Syntax error or access violation
```

### Cara membaca hasil

Ini belum otomatis full SQL Injection valid, tapi bisa dilaporkan sebagai:

```txt
Possible SQL Injection Indicator / Database Error Disclosure
```

jika evidence hanya berupa error database.

## 9. Prioritas Report

Dari simulasi ini, bug yang paling kuat untuk dilaporkan:

```txt
1. Invoice IDOR Download
2. Profile Mass Assignment jika role benar-benar berubah
3. Coupon Reuse jika rules melarang reuse
4. Database Error Disclosure jika hanya error SQL muncul
```

## 10. Draft Report — Invoice IDOR Download

```md
# IDOR on Invoice Download Endpoint

## Summary
The invoice download endpoint allows an authenticated user to download another user's invoice by changing the invoice ID.

## Affected Endpoint
GET /api/invoices/{invoice_id}/download

## Accounts Used
- Account A: invoice owner
- Account B: unauthorized user

## Steps to Reproduce
1. Login as Account A.
2. Create an order and obtain invoice ID `991`.
3. Login as Account B.
4. Send a request to `GET /api/invoices/991/download` using Account B's token.
5. Observe that Account B receives Account A's invoice PDF.

## Expected Behavior
Account B should receive `403 Forbidden` or `404 Not Found`.

## Actual Behavior
Account B receives `200 OK` and can download Account A's invoice PDF.

## Impact
An unauthorized user may access sensitive invoice data belonging to another user.

## Recommendation
Validate that the authenticated user owns the requested invoice before returning the file.
```

## 11. Pelajaran dari Simulasi

```txt
- Mulai dari scope, bukan payload.
- Mapping fitur dulu sebelum testing.
- Endpoint dengan ID resource sering menarik untuk access control.
- Output 200 belum selalu bug, tapi 200 + data/resource user lain adalah sinyal kuat.
- Business logic perlu dibandingkan dengan rules aplikasi.
- SQL error perlu dipahami sebagai indikator, bukan langsung klaim full exploit.
```
