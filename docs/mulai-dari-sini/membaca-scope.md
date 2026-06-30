# Cara Membaca Scope

Scope adalah batas target yang boleh dites. Ini harus dibaca sebelum melakukan request testing apa pun.

## Contoh Scope

```txt
In scope:
- example.com
- app.example.com
- api.example.com

Out of scope:
- blog.example.com
- status.example.com
- third-party payment gateway
- social engineering
- DDoS
```

## Cara Membaca

### 1. Pisahkan in-scope dan out-of-scope

Buat catatan sederhana:

```txt
Boleh dites:
- app.example.com
- api.example.com

Jangan dites:
- blog.example.com
- payment gateway pihak ketiga
```

### 2. Cek jenis aset

```txt
Web app     → login, dashboard, profile, upload, invoice
API         → endpoint, token, access control, excessive response
Mobile API  → request dari aplikasi mobile
Marketing   → biasanya lebih sedikit fitur sensitif
Third-party → jangan dites kecuali eksplisit in-scope
```

### 3. Cek larangan teknik

Kalau rules melarang automation, jangan jalankan scanner agresif.

Kalau rules melarang brute force, jangan test login dengan percobaan banyak.

Kalau rules melarang DoS, jangan test payload berat atau request berulang.

## Output Tahap Ini

Setelah membaca scope, kamu harus punya catatan:

```txt
Target utama:
- app.example.com
- api.example.com

Boleh:
- manual testing
- membuat akun testing
- testing fitur user sendiri

Tidak boleh:
- DDoS
- spam
- social engineering
- brute force massal
- target third-party
```

## Kalau Scope Tidak Jelas

Jangan nebak. Pilih aset yang paling eksplisit disebut in-scope.

Kalau masih ragu, jangan test bagian itu.
