# Weak Reset Flow

Weak reset flow adalah kondisi ketika alur forgot/reset password punya validasi yang lemah atau bisa dilewati.

## Contoh Pola Lemah

```txt
- reset token bisa dipakai ulang;
- reset token tidak expired;
- token lama tetap valid setelah token baru dibuat;
- session lama tetap aktif setelah password berubah;
- user_id/email di body bisa diganti;
- reset password berhasil tanpa token valid;
- response membocorkan reset token.
```

## Endpoint Umum

```txt
POST /api/forgot-password
GET /reset-password?token=
POST /api/reset-password
POST /api/password/reset
```

## Test Aman

Gunakan akun sendiri.

```txt
1. Request reset password.
2. Amati response apakah token bocor.
3. Gunakan token untuk reset.
4. Coba gunakan token yang sama lagi.
5. Cek apakah session lama masih aktif.
```

## Expected Secure Behavior

```txt
- token tidak bocor di response;
- token punya expiry;
- token hanya bisa dipakai sekali;
- token lama invalid setelah token baru dibuat;
- session lama invalid setelah password berubah.
```

## Suspicious Behavior

```txt
Salah satu kontrol reset password di atas tidak berjalan.
```

## Cara Membaca Hasil

| Hasil | Kemungkinan Bug |
|---|---|
| Token bocor di response | Token leaked in response |
| Token bisa dipakai ulang | Reset token reusable |
| Token lama tetap valid | Reset token not expired/old token valid |
| Session lama tetap aktif | Session invalidation issue |
| user_id/email bisa diganti | Broken access control / parameter tampering |

## Evidence

```txt
- endpoint reset flow
- request/response tiap langkah
- status token setelah dipakai
- bukti session lama masih aktif jika relevan
- semua token disensor
```

## Recommendation

```txt
- Gunakan token sekali pakai
- Terapkan expiry singkat
- Hash token di database
- Invalidasi token lama saat token baru dibuat
- Invalidasi session lama setelah password berubah
```
