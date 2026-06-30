# Reset Token Reusable

Reset token reusable terjadi ketika token reset password bisa dipakai lebih dari satu kali.

Contoh sederhananya:

```txt
User request forgot password.
User memakai link reset untuk ganti password.
Setelah sukses, link yang sama masih bisa dipakai lagi.
```

## Tool Level

| Kebutuhan | Jawaban |
|---|---|
| Bisa tanpa Burp? | Ya |
| Minimal tools | Browser biasa |
| Disarankan | DevTools Network untuk menyimpan request/response |
| Proxy tool | Opsional |
| Butuh akun testing? | Ya, satu akun milik sendiri |

## Kapan Curiga

```txt
- link reset tetap valid setelah berhasil dipakai;
- token reset tidak langsung invalid setelah password diganti;
- token lama tetap bisa digunakan untuk membuat password baru lagi;
- endpoint reset tidak memeriksa status token used/unused.
```

## Cara Mencoba Secara Aman

### Mode 1 — Browser biasa

```txt
1. Gunakan akun milik sendiri.
2. Klik forgot password.
3. Buka email reset password.
4. Gunakan link reset untuk mengganti password.
5. Pastikan password berhasil berubah.
6. Buka ulang link reset yang sama.
7. Coba lihat apakah aplikasi menolak token lama atau masih membuka form reset.
8. Jika form masih terbuka, coba submit password testing pada akun sendiri.
```

### Mode 2 — DevTools Network

```txt
1. Buka DevTools → Network sebelum submit reset password.
2. Submit reset password pertama.
3. Catat endpoint, status code, dan response.
4. Gunakan token/link yang sama lagi.
5. Catat response penggunaan kedua.
6. Bandingkan apakah token dianggap invalid atau tetap valid.
```

## Expected Secure Output

```json
{
  "message": "Invalid or expired token"
}
```

atau:

```txt
Halaman reset menolak link/token yang sudah dipakai.
```

## Suspicious Output

```txt
Token yang sama bisa dipakai ulang untuk reset password.
```

Contoh response:

```json
{
  "message": "Password reset successfully"
}
```

pada penggunaan token kedua.

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Token invalid setelah dipakai | Aman secara umum |
| Token tetap bisa dipakai | Reset token reusable |
| Token tetap valid tapi butuh login | Perlu analisis flow |
| Token bisa dipakai untuk akun lain | Lebih serius, access control issue |

## Evidence yang Perlu Disimpan

```txt
- Request reset pertama
- Response sukses pertama
- Request penggunaan token kedua
- Response penggunaan token kedua
- Bukti token yang sama dipakai ulang
- Token disensor
```

## Kapan Harus Stop

```txt
- Gunakan akun sendiri
- Jangan memakai token/reset link orang lain
- Jangan membagikan token asli
- Jangan mencoba mengambil alih akun lain
- Cukup buktikan token bisa/tidak bisa dipakai ulang
```

## Recommendation

```txt
- Tandai token sebagai used setelah sukses dipakai
- Hapus token lama setelah password berubah
- Rotasi semua token reset aktif
- Invalidasi session lama sesuai risiko
```
