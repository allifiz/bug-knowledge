# Mulai dari Sini

Bug bounty bukan tentang hafal payload. Bug bounty adalah kemampuan memahami aplikasi, membaca rules, menemukan celah secara legal, membuktikan impact dengan aman, lalu menulis report yang jelas.

## Alur Belajar

```txt
1. Pahami aturan legal
2. Belajar HTTP, request, response, cookie, session, dan API
3. Baca scope program
4. Pahami fitur aplikasi sebagai user biasa
5. Mapping endpoint
6. Cocokkan endpoint dengan kemungkinan bug
7. Lakukan test aman
8. Baca output
9. Kumpulkan evidence
10. Tulis report
```

## Yang Pemula Sering Salah

### 1. Langsung cari payload

Payload hanya alat kecil. Yang lebih penting adalah tahu **kapan payload itu relevan**.

Contoh:

```txt
Payload SQLi tidak otomatis dicoba ke semua input.
Lebih masuk akal dicoba ke input yang berhubungan dengan database seperti search, filter, id, sort, login, atau report.
```

### 2. Tidak membaca scope

Target bug bounty punya batas. Kalau keluar scope, testing bisa jadi ilegal.

### 3. Tidak mencatat request normal

Sebelum test, selalu simpan request normal. Tanpa pembanding, kamu sulit tahu output test itu benar-benar aneh atau tidak.

### 4. Menganggap semua 500 adalah bug valid

Status 500 adalah sinyal untuk dianalisis, bukan otomatis bug bounty valid. Harus ada impact, evidence, dan konteks.

## Cara Pakai Website Ini

Mulai dari:

1. baca [Aturan Legal](./aturan-legal.md),
2. lanjut ke [Membaca Scope](./membaca-scope.md),
3. masuk ke [Program Baru](../guided-hunt-flow/program-baru.md),
4. gunakan [Feature Map](../feature-map/index.md) untuk menentukan bug yang mungkin muncul,
5. baca [Theory to Real Case](../theory-to-real-case/sql-injection.md) untuk memahami test dan output.
