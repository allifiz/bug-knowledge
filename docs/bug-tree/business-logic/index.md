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

## Klik untuk Belajar

| Bug | Cocok untuk | Halaman |
|---|---|---|
| Price manipulation | checkout, order, payment amount | [Price Manipulation](./price-manipulation.md) |
| Quantity manipulation | cart, order, stock, booking | [Quantity Manipulation](./quantity-manipulation.md) |
| Coupon reuse | voucher, promo, coupon apply | [Coupon Reuse](./coupon-reuse.md) |
| Workflow bypass | order, approval, verification, payment status | [Workflow Bypass](./workflow-bypass.md) |
| Role/invite flow issue | team invite, role upgrade/downgrade | [SaaS Team Workspace Simulation](../../real-case-simulation/saas-team-workspace.md) |
| Checkout flow issue | toko online, invoice, coupon | [Toko Online Simulation](../../real-case-simulation/toko-online.md) |

## Mulai dari Feature

| Feature ditemukan | Mulai dari sini |
|---|---|
| Invoice/order/checkout | [Feature Map: Invoice & Order](../../feature-map/invoice-order.md) |
| Coupon endpoint | [Coupon Apply Scenario](../../endpoint-scenarios/coupon-apply.md) |
| Team invite/role | [Feature Map: Team & Role](../../feature-map/team-role.md) |

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

## Contoh Area

| Area | Expected secure behavior | Suspicious behavior |
|---|---|---|
| Harga checkout | Server menghitung harga dari database | Order mengikuti nilai harga dari client |
| Kupon | Server memastikan kupon valid dan belum dipakai | Kupon terbatas bisa dipakai ulang |
| Workflow | Server memaksa urutan step yang benar | Step akhir bisa dipanggil tanpa step sebelumnya |
| Approval | Server validasi role approver | User tanpa izin bisa approve/change status |

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
