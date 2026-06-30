# Unauthorized Action

Unauthorized action terjadi ketika user bisa menjalankan aksi yang seharusnya bukan haknya.

Contoh aksi:

```txt
- approve request
- cancel order
- resend invoice
- remove member
- change status
- delete file
- assign role
```

## Kapan Curiga

```txt
- endpoint memakai POST/PATCH/DELETE untuk aksi penting;
- ada ID resource/action di URL;
- role user biasa bisa memanggil endpoint action;
- UI menyembunyikan tombol, tapi API tetap bisa dipanggil;
- response berhasil walaupun user tidak punya permission.
```

## Endpoint Umum

```txt
POST /api/orders/{id}/cancel
PATCH /api/tickets/{id}/close
POST /api/requests/{id}/approve
DELETE /api/team/member/{id}
POST /api/invoices/{id}/resend
```

## Test Aman

Gunakan resource milik sendiri atau workspace testing.

```txt
1. Buat resource sebagai akun A.
2. Gunakan akun B dengan role lebih rendah.
3. Panggil endpoint action.
4. Catat apakah aksi berhasil.
```

## Expected Secure Output

```http
HTTP/1.1 403 Forbidden
```

## Suspicious Output

```json
{
  "message": "Action completed successfully"
}
```

## Evidence

```txt
- role akun yang melakukan aksi
- endpoint action
- request test
- response berhasil
- bukti resource berubah/status berubah
```

## Recommendation

```txt
- Validasi permission untuk setiap action
- Jangan hanya validasi ownership read
- Pisahkan authorization read dan write/action
- Audit endpoint POST/PATCH/DELETE yang sensitif
```
