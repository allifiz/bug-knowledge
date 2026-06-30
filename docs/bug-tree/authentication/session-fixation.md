# Session Fixation

Session fixation terjadi ketika session/token tidak diganti setelah user login atau setelah privilege berubah.

Akibatnya, session lama yang sudah diketahui atau dibuat sebelum login tetap berlaku setelah login.

## Kapan Curiga

```txt
- session ID sebelum login sama dengan setelah login;
- token tidak berubah setelah login ulang;
- session tidak berubah setelah reset password;
- session tidak berubah setelah role/permission berubah;
- remember-me token tidak dirotasi.
```

## Test Aman

Gunakan akun sendiri.

```txt
1. Buka aplikasi sebelum login.
2. Catat cookie/session awal.
3. Login.
4. Bandingkan cookie/session setelah login.
```

## Expected Secure Output

```txt
Session ID atau token sensitif berubah setelah login.
```

## Suspicious Output

```txt
Session ID yang sama tetap dipakai sebelum dan sesudah login.
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Session berubah setelah login | Aman secara umum |
| Session tetap sama | Indikasi session fixation |
| Token berubah tapi refresh token tetap | Perlu analisis lebih lanjut |
| Session tetap valid setelah reset password | Terkait session invalidation issue |

## Evidence

```txt
- cookie/session sebelum login
- cookie/session setelah login
- timestamp
- screenshot DevTools/Application/Cookies jika perlu
- sensor token/cookie
```

## Kapan Stop

```txt
Jangan memakai session orang lain. Jangan mencuri cookie/token. Gunakan akun sendiri.
```

## Recommendation

```txt
- Rotate session ID setelah login
- Rotate token setelah privilege berubah
- Invalidate session lama setelah reset password
- Gunakan cookie flag yang sesuai
```
