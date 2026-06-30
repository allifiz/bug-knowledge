# Price Manipulation

Price manipulation terjadi ketika harga final dari transaksi bisa dikontrol oleh client.

## Kapan Curiga

```txt
- request checkout mengirim field price/amount/total;
- server menerima harga dari client;
- subtotal/discount/final_amount dikirim dari frontend;
- perubahan harga di request memengaruhi order;
- payment amount tidak dihitung ulang di server.
```

## Field yang Sering Relevan

```txt
price
amount
total
subtotal
final_amount
discount
shipping_cost
admin_fee
```

## Test Aman

Gunakan akun sendiri dan jangan menyelesaikan pembayaran real.

```json
{
  "product_id": 10,
  "quantity": 1,
  "price": 1
}
```

## Expected Secure Behavior

```txt
Server menghitung harga dari database, bukan dari client.
```

## Suspicious Behavior

```txt
Order berhasil dibuat dengan harga yang dikirim client.
```

## Evidence

```txt
- request normal
- request dengan harga diubah
- response order
- total order aktual
- bukti harga berubah
```

## Recommendation

```txt
- Hitung semua harga di server
- Abaikan field harga dari client
- Validasi payment amount dengan order amount
- Audit endpoint checkout/payment callback
```
