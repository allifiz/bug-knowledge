# Business Logic

Business logic bug terjadi ketika aplikasi mengikuti aturan bisnis yang salah atau bisa dilewati, walaupun secara teknis endpoint tidak error.

Bug jenis ini sering lebih sulit ditemukan karena tidak selalu butuh payload khusus. Yang diuji adalah flow, aturan, dan validasi server.

## Tree

```txt
Business Logic
├── Price manipulation
├── Quantity manipulation
├── Coupon reuse
├── Workflow bypass
├── Limit bypass
├── Race condition concept
├── Payment status mismatch
└── Approval flow bypass
```

## Kapan Curiga

Fitur yang sering relevan:

```txt
- checkout
- order
- coupon/voucher
- wallet/balance
- subscription/plan
- approval
- booking
- refund
- invite quota
```

## Prinsip Analisis

Tanyakan:

```txt
- Aturan bisnisnya apa?
- Apakah validasi dilakukan di server?
- Apakah client mengirim data yang seharusnya dihitung server?
- Apakah flow bisa dilewati?
- Apakah limit bisa diubah dari request?
- Apakah status bisa dimanipulasi?
```

## Contoh Case — Price Manipulation

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
Server menghitung harga dari database dan mengabaikan price dari client.
```

Suspicious behavior:

```txt
Order dibuat dengan harga yang dikirim client.
```

## Contoh Case — Coupon Reuse

Expected secure behavior:

```txt
Kupon sekali pakai tidak bisa digunakan lagi setelah sukses dipakai.
```

Suspicious behavior:

```txt
Kupon yang sama bisa digunakan berulang kali pada akun/order yang sama jika rules melarangnya.
```

## Contoh Case — Workflow Bypass

Flow normal:

```txt
Create order → payment pending → paid → invoice issued
```

Suspicious behavior:

```txt
User bisa langsung mengubah status order menjadi paid tanpa pembayaran valid.
```

## Catatan Aman

```txt
- Jangan menyelesaikan pembayaran real jika tidak perlu
- Gunakan sandbox/test mode jika tersedia
- Jangan merugikan merchant atau user lain
- Validasi impact dengan proof minimal
```

## Evidence

```txt
- Flow normal
- Request yang menunjukkan aturan bisa dilewati
- Response actual
- Bukti perbedaan status/harga/limit
- Penjelasan aturan bisnis yang seharusnya
```
