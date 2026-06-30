# Kapan Harus Berhenti Testing

Bug hunter pemula sering kebablasan karena ingin membuktikan bug terlalu jauh.

Prinsipnya:

> Buktikan impact secukupnya, jangan eksploitasi berlebihan.

## Berhenti Jika Melihat Data User Asli

Contoh:

```json
{
  "email": "user-asli@example.com",
  "phone": "08123456789",
  "address": "..."
}
```

Yang dilakukan:

```txt
- Berhenti testing endpoint itu
- Jangan akses data lain
- Sensor data sensitif
- Simpan request/response minimal
- Tulis report
```

## Berhenti Jika Bisa Mengubah Data Orang Lain

Jika kamu membuktikan akun B bisa mengubah data akun A milikmu sendiri, cukup sampai situ.

Jangan mencoba ke user asli.

## Berhenti Jika Server Mulai Error Berulang

Kalau beberapa request test menyebabkan 500/error berat, hentikan dan evaluasi.

Jangan melakukan request berulang yang bisa mengganggu layanan.

## Berhenti Jika Teknik Dilarang Rules

Contoh:

```txt
Program melarang brute force.
→ Jangan test login dengan percobaan banyak.

Program melarang automation.
→ Jangan jalankan scanner agresif.

Program melarang DoS.
→ Jangan test payload berat atau request paralel.
```

## Berhenti Jika Target Ternyata Out-of-Scope

Kalau saat mapping kamu menemukan subdomain atau third-party yang tidak ada di scope, jangan lanjutkan testing.

## Bukti Minimal yang Baik

Bukti yang baik biasanya cukup:

```txt
- request normal
- request test
- response yang menunjukkan perbedaan
- screenshot jika perlu
- data sensitif disensor
- penjelasan impact
```

Tidak perlu:

```txt
- dump database
- mengambil banyak data
- mengubah data user asli
- membuat service down
- mencoba banyak akun/password
```
