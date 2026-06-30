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

## Tool Level

| Kebutuhan | Jawaban |
|---|---|
| Bisa tanpa Burp? | Sebagian, tergantung aksi |
| Minimal tools | DevTools Network + role/akun testing |
| Disarankan | API Client / Proxy Tool |
| Proxy tool | Opsional, membantu replay request action |
| Butuh akun testing? | Biasanya dua akun/role atau workspace testing |

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

## Cara Mencoba Secara Aman

### Mode 1 — DevTools Network

```txt
1. Gunakan workspace/resource testing milik sendiri.
2. Login sebagai akun yang punya izin, misalnya owner/admin.
3. Jalankan aksi normal, misalnya cancel order testing atau remove member dummy.
4. Buka DevTools → Network.
5. Catat endpoint, method, ID resource, dan payload.
6. Login sebagai akun dengan role lebih rendah.
7. Coba panggil endpoint action yang sama pada resource testing.
8. Expected-nya server menolak dengan 403/404.
```

### Mode 2 — API Client / Proxy

```txt
1. Copy request action dari akun yang punya izin.
2. Ganti token/session menjadi akun yang tidak punya izin.
3. Pastikan resource yang diuji adalah resource dummy milik sendiri.
4. Kirim request sekali.
5. Cek apakah status/resource berubah.
6. Jangan lakukan aksi irreversible pada data nyata.
```

## Expected Secure Output

```http
HTTP/1.1 403 Forbidden
```

atau:

```json
{
  "message": "You do not have permission to perform this action"
}
```

## Suspicious Output

```json
{
  "message": "Action completed successfully"
}
```

atau status/resource berubah walaupun role tidak punya izin.

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Role rendah mendapat 403/404 | Kemungkinan aman |
| Response 200 tapi tidak ada perubahan | Perlu validasi lagi |
| Aksi berhasil dilakukan role rendah | Unauthorized action |
| UI menyembunyikan tombol tapi API berhasil | Broken access control |

## Evidence yang Perlu Disimpan

```txt
- Role akun yang melakukan aksi
- Endpoint action
- Request dari role yang punya izin
- Request test dari role rendah
- Response berhasil jika tidak seharusnya
- Bukti resource berubah/status berubah
- Sensor token/cookie/data sensitif
```

## Kapan Harus Stop

```txt
- Jangan menjalankan aksi pada resource user asli
- Jangan delete/cancel/approve data nyata
- Jangan mengubah member organisasi nyata
- Gunakan resource dummy dan proof minimal
```

## Recommendation

```txt
- Validasi permission untuk setiap action
- Jangan hanya validasi ownership read
- Pisahkan authorization read dan write/action
- Audit endpoint POST/PATCH/DELETE yang sensitif
- Jangan hanya mengandalkan tombol yang disembunyikan di frontend
```
