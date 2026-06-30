# Feature Map: Invoice & Order

Invoice dan order adalah fitur ber-impact tinggi karena biasanya berisi data transaksi, alamat, email, harga, status pembayaran, dan file PDF.

## Endpoint Pattern

```txt
GET /api/orders
GET /api/orders/{id}
PATCH /api/orders/{id}/cancel
GET /api/invoices/{id}
GET /api/invoices/{id}/download
POST /api/coupon/apply
POST /api/checkout
```

## Bug yang Mungkin Relevan

```txt
Access Control
├── IDOR read order/invoice
├── IDOR download invoice PDF
├── Cancel order user lain
└── Update shipping address user lain

Business Logic
├── Price manipulation
├── Quantity manipulation
├── Coupon reuse
├── Negative quantity/amount
└── Workflow bypass

Information Disclosure
├── Excessive invoice response
├── Predictable invoice URL
└── Public invoice PDF
```

### Klik untuk belajar

| Bug | Buka halaman |
|---|---|
| IDOR read order/invoice | [IDOR Read](../bug-tree/access-control/idor-read.md) |
| IDOR download invoice PDF | [Invoice Download Scenario](../endpoint-scenarios/invoice-download.md) |
| Cancel/update order user lain | [IDOR Write](../bug-tree/access-control/idor-write.md) |
| Price manipulation | [Business Logic](../bug-tree/business-logic/index.md) |
| Quantity manipulation | [Business Logic](../bug-tree/business-logic/index.md) |
| Coupon reuse | [Coupon Apply Scenario](../endpoint-scenarios/coupon-apply.md) |
| Workflow bypass | [Business Logic](../bug-tree/business-logic/index.md) |
| Excessive invoice response | [Access Control Response](../output-encyclopedia/access-control-response.md) |
| Predictable/public invoice file | [File Exposure](../bug-tree/input-validation/file-exposure.md) |

## Test Aman Awal

### 1. IDOR invoice read

Akun A membuat order/invoice.

Request akun B:

```http
GET /api/invoices/991
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
  "invoice_id": 991,
  "owner_email": "akun-a@example.com",
  "amount": 500000,
  "status": "paid"
}
```

### 2. Invoice download access

Request:

```http
GET /api/invoices/991/download
Authorization: Bearer token-akun-b
```

Expected secure output:

```txt
403/404 atau file tidak diberikan.
```

Suspicious output:

```http
HTTP/1.1 200 OK
Content-Type: application/pdf
```

### 3. Price or quantity manipulation concept

Cek apakah client mengirim harga final.

Suspicious request body:

```json
{
  "product_id": 10,
  "quantity": 1,
  "price": 1
}
```

Expected secure behavior:

```txt
Server menghitung harga dari database, bukan percaya harga dari client.
```

Suspicious behavior:

```txt
Order berhasil dibuat dengan harga dari client yang dimanipulasi.
```

Catatan:

```txt
Jangan menyelesaikan pembayaran atau merugikan merchant. Gunakan akun/test mode jika tersedia.
```

## Evidence

```txt
- request akun A dan akun B
- invoice/order ID milik akun sendiri
- status code
- response yang menunjukkan data transaksi terbuka
- screenshot PDF jika perlu dengan sensor data
```
