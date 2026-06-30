# Reset Token Not Expired

Reset token not expired terjadi ketika token reset password tetap valid terlalu lama atau tidak punya expiry yang jelas.

## Kapan Curiga

```txt
- token reset tetap valid setelah waktu lama;
- token tidak invalid setelah user request token baru;
- token lama dan token baru sama-sama valid;
- response tidak pernah menunjukkan expired token.
```

## Test Aman

Gunakan akun milik sendiri dan ikuti rules program.

```txt
1. Request reset password.
2. Tunggu melewati expiry yang diklaim aplikasi jika ada.
3. Coba gunakan token lama.
4. Request token baru dan cek apakah token lama masih valid.
```

## Expected Secure Output

```json
{
  "message": "Invalid or expired token"
}
```

## Suspicious Output

```txt
Token reset lama tetap bisa dipakai setelah seharusnya expired.
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Token expired sesuai aturan | Aman secara umum |
| Token lama tetap valid | Suspicious |
| Token lama invalid saat token baru dibuat | Bagus |
| Banyak token reset aktif bersamaan | Perlu analisis risiko |

## Evidence

```txt
- waktu token dibuat
- waktu token digunakan
- response saat token lama dipakai
- token disensor
```

## Recommendation

```txt
- Gunakan expiry token yang singkat
- Invalidasi token lama saat token baru dibuat
- Invalidasi token setelah sukses dipakai
- Simpan token dalam bentuk hash di database
```
