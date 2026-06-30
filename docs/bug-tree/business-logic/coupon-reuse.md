# Coupon Reuse

Coupon reuse terjadi ketika kupon yang seharusnya terbatas bisa digunakan berulang kali.

## Kapan Curiga

```txt
- kupon sekali pakai bisa dipakai lebih dari satu kali;
- kupon user tertentu bisa dipakai user lain;
- kupon expired masih valid;
- minimum order bisa dilewati;
- coupon bisa diterapkan ke order orang lain.
```

## Test Aman

Gunakan akun dan order milik sendiri.

```txt
1. Pakai kupon pada order pertama.
2. Coba pakai kupon yang sama pada order kedua.
3. Bandingkan dengan rules promo.
```

## Expected Secure Output

```json
{
  "message": "Coupon already used"
}
```

## Suspicious Output

```json
{
  "message": "Coupon applied",
  "discount": 10000
}
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Kupon sekali pakai ditolak setelah digunakan | Aman |
| Kupon bisa dipakai berulang | Coupon reuse |
| Kupon user A bisa dipakai user B | Access control/business logic |
| Kupon expired masih valid | Expiry validation issue |

## Evidence

```txt
- rules promo
- request pertama
- response pertama
- request kedua
- response kedua
- order/account milik sendiri
```

## Recommendation

```txt
- Simpan status penggunaan kupon di server
- Validasi kupon per user/order
- Validasi expiry dan minimum order di server
- Gunakan transaksi database agar kupon tidak race/reuse
```
