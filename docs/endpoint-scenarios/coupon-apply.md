# Scenario: `POST /api/coupon/apply`

Endpoint coupon digunakan untuk menerapkan diskon, voucher, promo, atau benefit pada order.

## Contoh Endpoint

```txt
POST /api/coupon/apply
POST /api/voucher/apply
POST /api/checkout/coupon
POST /api/orders/{id}/coupon
```

Body umum:

```json
{
  "coupon_code": "PROMO10",
  "order_id": 991
}
```

## Pertanyaan Analisis

```txt
- Apakah coupon hanya boleh dipakai sekali?
- Apakah coupon berlaku untuk user tertentu?
- Apakah coupon punya minimum order?
- Apakah coupon expired?
- Apakah diskon dihitung server?
- Apakah order_id milik user yang sedang login?
```

## Kemungkinan Bug

```txt
Business Logic
├── Coupon reuse
├── Expired coupon still valid
├── Minimum order bypass
├── User-specific coupon bypass
└── Discount manipulation

Access Control
├── Apply coupon to another user's order
└── Order ownership issue
```

## Test Aman 1 — Coupon Reuse

Gunakan akun dan order milik sendiri.

Flow:

```txt
1. Pakai coupon pada order pertama.
2. Coba pakai coupon yang sama lagi jika rules menyatakan sekali pakai.
```

Expected secure output:

```json
{
  "message": "Coupon already used"
}
```

Suspicious output:

```json
{
  "discount": 10000,
  "message": "Coupon applied"
}
```

## Test Aman 2 — Minimum Order Bypass

Jika coupon minimum order Rp100.000, coba pada order di bawah minimum dengan akun sendiri.

Expected secure output:

```json
{
  "message": "Minimum order not reached"
}
```

Suspicious output:

```txt
Coupon berhasil diterapkan walaupun total order di bawah minimum.
```

## Test Aman 3 — Order Ownership

Akun A punya order `991`.

Akun B mencoba apply coupon ke order A:

```http
POST /api/coupon/apply
Authorization: Bearer token-akun-b
Content-Type: application/json

{
  "coupon_code": "PROMO10",
  "order_id": 991
}
```

Expected secure output:

```txt
403/404 atau order tidak ditemukan.
```

Suspicious output:

```txt
Coupon berhasil diterapkan pada order akun A.
```

## Catatan Aman

```txt
- Jangan menyelesaikan pembayaran real jika tidak perlu
- Gunakan sandbox/test mode jika tersedia
- Jangan merugikan merchant
- Validasi dengan proof minimal
```

## Link Terkait

- [Business Logic](../bug-tree/business-logic/index.md)
- [Invoice & Order Feature Map](../feature-map/invoice-order.md)
