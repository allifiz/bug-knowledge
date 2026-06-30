# Quantity Manipulation

Quantity manipulation terjadi ketika jumlah item bisa dibuat tidak masuk akal dan memengaruhi harga, stok, atau status order.

## Kapan Curiga

```txt
- quantity dikirim dari client;
- quantity bisa 0, negatif, desimal, atau sangat besar;
- stok tidak divalidasi di server;
- total order berubah karena quantity tidak valid;
- limit pembelian bisa dilewati.
```

## Test Aman

Gunakan akun dan order milik sendiri.

Contoh input yang perlu divalidasi server:

```txt
quantity = 0
quantity = -1
quantity = 999999
quantity = 1.5
```

## Expected Secure Behavior

```json
{
  "message": "Invalid quantity"
}
```

## Suspicious Behavior

```txt
Order berhasil dibuat dengan quantity tidak valid atau total menjadi tidak masuk akal.
```

## Evidence

```txt
- request normal
- request quantity tidak valid
- response order
- total/stok yang berubah
- screenshot jika perlu
```

## Recommendation

```txt
- Validasi quantity di server
- Pastikan quantity integer positif
- Batasi maximum quantity
- Validasi stok sebelum checkout
- Hitung ulang total di server
```
