# Weak Password Policy

Weak password policy terjadi ketika aplikasi mengizinkan password yang terlalu lemah untuk akun yang seharusnya dilindungi.

## Kapan Curiga

```txt
- password sangat pendek diterima;
- password umum diterima;
- tidak ada minimum length;
- tidak ada pencegahan password yang sama dengan email/username;
- tidak ada validasi saat reset password;
- policy register dan reset password berbeda.
```

## Test Aman

Gunakan akun milik sendiri.

```txt
1. Register atau change password.
2. Coba password yang jelas lemah.
3. Catat apakah server menerima atau menolak.
```

## Expected Secure Output

```json
{
  "message": "Password does not meet security requirements"
}
```

## Suspicious Output

```txt
Aplikasi menerima password sangat lemah seperti panjang terlalu pendek atau sama dengan email/username.
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Password lemah ditolak | Kemungkinan aman |
| Password lemah diterima | Weak password policy |
| Register ketat, reset longgar | Inconsistent policy |
| Password sama dengan email diterima | Suspicious |

## Evidence

```txt
- request register/change password
- response berhasil
- aturan password yang seharusnya jika ada
- akun testing sendiri
```

## Recommendation

```txt
- Terapkan minimum length yang memadai
- Cegah password umum/lemah
- Konsisten antara register dan reset password
- Jangan memberi pesan yang membocorkan data sensitif
```
