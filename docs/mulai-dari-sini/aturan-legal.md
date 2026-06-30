# Aturan Legal

Sebelum melakukan testing, pastikan kamu punya izin.

Bug bounty hanya legal jika dilakukan pada target yang memang membuka program dan kamu mengikuti rules program tersebut.

## Wajib Dicek Sebelum Testing

```txt
[ ] Domain atau aplikasi in-scope
[ ] Jenis testing yang boleh dilakukan
[ ] Testing yang dilarang
[ ] Boleh atau tidak membuat akun testing
[ ] Boleh atau tidak memakai automation
[ ] Batas rate request
[ ] Cara report
[ ] Safe harbor atau kebijakan perlindungan researcher
```

## Hal yang Umumnya Dilarang

```txt
- DDoS atau load testing
- Spam
- Social engineering
- Phishing ke karyawan/user
- Credential stuffing
- Brute force massal
- Mengakses data user asli
- Mengubah data user asli
- Mengambil data sensitif
- Testing third-party di luar scope
```

## Prinsip Safe Testing

### 1. Gunakan akun milik sendiri

Untuk access control/IDOR, idealnya gunakan dua akun testing milik sendiri.

```txt
Akun A: membuat resource
Akun B: mencoba akses resource Akun A
```

### 2. Minimal proof

Buktikan bug secukupnya. Jangan eksploitasi lebih jauh dari yang dibutuhkan untuk menunjukkan impact.

### 3. Sensor data sensitif

Jika response mengandung email, nama, invoice, token, nomor telepon, alamat, atau data pribadi, sensor sebelum dimasukkan ke report.

### 4. Stop jika mulai menyentuh data asli

Kalau test mulai membuka data user lain yang bukan milikmu, berhenti dan tulis report dengan bukti minimal.

## Kapan Harus Berhenti

Berhenti jika:

```txt
- mulai melihat data user asli;
- test menyebabkan perubahan data yang tidak disengaja;
- server mulai error berulang;
- rules program tidak mengizinkan teknik yang sedang kamu lakukan;
- kamu tidak yakin target masih in-scope.
```
