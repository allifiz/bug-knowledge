# Workflow Bypass

Workflow bypass terjadi ketika user bisa melewati urutan proses bisnis yang seharusnya wajib.

## Contoh Flow Normal

```txt
Create order → payment pending → paid → invoice issued
```

atau:

```txt
Register → verify email → access dashboard
```

atau:

```txt
Submit request → review → approve → completed
```

## Kapan Curiga

```txt
- status bisa diubah langsung dari request;
- endpoint step akhir bisa dipanggil tanpa step sebelumnya;
- user bisa akses fitur sebelum syarat terpenuhi;
- approval bisa dilewati;
- pembayaran belum valid tapi order dianggap paid.
```

## Test Aman

Gunakan akun dan data milik sendiri.

```txt
1. Pahami flow normal.
2. Catat endpoint tiap step.
3. Coba panggil step akhir tanpa menyelesaikan step sebelumnya.
4. Bandingkan expected dan actual behavior.
```

## Expected Secure Output

```json
{
  "message": "Previous step is required"
}
```

atau status tidak berubah.

## Suspicious Output

```json
{
  "status": "approved"
}
```

padahal approval tidak seharusnya bisa dilakukan oleh user tersebut.

## Evidence

```txt
- flow normal aplikasi
- endpoint step yang dilewati
- request test
- response actual
- status sebelum dan sesudah
```

## Recommendation

```txt
- Validasi state transition di server
- Jangan percaya status dari client
- Enforce role/permission pada setiap step
- Gunakan state machine untuk flow sensitif
```
