# Reset Token Reusable

Reset token reusable terjadi ketika token reset password bisa dipakai lebih dari satu kali.

## Kapan Curiga

```txt
- link reset tetap valid setelah berhasil dipakai;
- token reset tidak langsung invalid setelah password diganti;
- token lama tetap bisa digunakan untuk membuat password baru lagi;
- endpoint reset tidak memeriksa status token used/unused.
```

## Test Aman

Gunakan akun milik sendiri.

```txt
1. Request forgot password.
2. Buka link reset.
3. Set password baru.
4. Coba gunakan link/token yang sama lagi.
```

## Expected Secure Output

```json
{
  "message": "Invalid or expired token"
}
```

## Suspicious Output

```txt
Token yang sama bisa dipakai ulang untuk reset password.
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Token invalid setelah dipakai | Aman secara umum |
| Token tetap bisa dipakai | Reset token reusable |
| Token tetap valid tapi butuh login | Perlu analisis flow |
| Token bisa dipakai untuk akun lain | Lebih serius, access control issue |

## Evidence

```txt
- request reset pertama
- response sukses
- penggunaan token kedua
- response actual
- token disensor
```

## Recommendation

```txt
- Tandai token sebagai used setelah sukses dipakai
- Hapus token lama setelah password berubah
- Rotasi semua token reset aktif
- Invalidasi session lama sesuai risiko
```
