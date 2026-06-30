# Weak Account Lockout

Weak account lockout terjadi ketika mekanisme penguncian akun pada percobaan login gagal tidak ada, terlalu longgar, atau mudah dilewati.

## Kapan Curiga

```txt
- Tidak ada lockout setelah beberapa login gagal
- Lockout hanya berdasarkan IP, bukan akun
- Lockout bisa dilewati dengan mengganti header/client/device
- Lockout terlalu cepat reset tanpa alasan jelas
- Pesan lockout berbeda dan membocorkan user valid
```

## Test Aman

Gunakan akun milik sendiri.

```txt
1. Login dengan password salah beberapa kali secara manual.
2. Catat apakah akun terkunci sementara.
3. Coba login dengan password benar setelah batas gagal.
4. Catat apakah sistem tetap mengizinkan login.
```

## Expected Secure Output

```json
{
  "message": "Too many failed attempts. Please try again later."
}
```

atau:

```txt
Akun terkunci sementara setelah beberapa percobaan gagal.
```

## Suspicious Output

```txt
Percobaan gagal berulang tetap diproses normal tanpa lockout, delay, atau challenge.
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Ada lockout sementara | Proteksi ada |
| Tidak ada lockout sama sekali | Weak/missing lockout |
| Lockout hanya per IP | Bisa kurang kuat tergantung threat model |
| Lockout membocorkan akun valid | Bisa terkait user enumeration |

## Evidence

```txt
- akun testing yang digunakan
- jumlah percobaan gagal kecil
- response setiap percobaan
- apakah lockout muncul atau tidak
- timestamp percobaan
```

## Kapan Stop

```txt
Jangan brute force. Jangan memakai akun orang lain. Jangan request massal.
```

## Recommendation

```txt
- Terapkan lockout sementara atau progressive delay
- Batasi percobaan per akun dan per IP
- Gunakan pesan error generic
- Monitor percobaan gagal berulang
```
