# Scenario: `GET /api/invoices/{id}/download`

Endpoint invoice download biasanya mengembalikan file PDF atau dokumen transaksi.

## Contoh Endpoint

```txt
GET /api/invoices/991/download
GET /api/invoices/991/pdf
GET /invoice/download?id=991
GET /api/orders/991/invoice
```

## Pertanyaan Analisis

```txt
- Invoice ini milik siapa?
- Apakah user lain boleh mengunduh invoice ini?
- Apakah file bisa diakses tanpa login?
- Apakah ID invoice mudah ditebak?
- Apakah response mengandung data sensitif?
```

## Kemungkinan Bug

```txt
Access Control
├── IDOR download
├── Broken object level authorization
└── Public access to private file

Information Disclosure
├── Sensitive invoice data exposure
├── Predictable file URL
└── Excessive PDF data
```

## Test Aman 1 — Akun B Download Invoice Akun A

Akun A membuat invoice `991`.

Request akun B:

```http
GET /api/invoices/991/download
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

```http
HTTP/1.1 200 OK
Content-Type: application/pdf
```

## Test Aman 2 — Akses Tanpa Login

Buka URL download di incognito/logout.

Expected secure output:

```txt
401/403 atau redirect login.
```

Suspicious output:

```txt
PDF invoice private terbuka tanpa login.
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| 403/404 untuk akun B | Kemungkinan aman |
| 401/403 saat logout | Kemungkinan aman |
| 200 + PDF akun A dari akun B | IDOR download |
| 200 + PDF terbuka tanpa login | Public private-file exposure |

## Evidence

```txt
- Request akun B
- Status code
- Content-Type
- Screenshot PDF dengan data disensor
- Bukti invoice dibuat oleh akun A
```

## Link Terkait

- [Invoice & Order Feature Map](../feature-map/invoice-order.md)
- [File Exposure](../bug-tree/input-validation/file-exposure.md)
- [Access Control Response](../output-encyclopedia/access-control-response.md)
