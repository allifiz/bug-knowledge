# Mulai dari Sini

Bug bounty bukan lomba hafal payload.

Yang paling penting justru kemampuan membaca aplikasi: fitur apa yang ada, request apa yang dikirim, response seperti apa yang balik, dan apakah perilaku itu masuk akal atau tidak.

Kalau dari awal sudah paham alurnya, tools seperti DevTools, Postman, Burp, Caido, atau ZAP akan terasa sebagai alat bantu. Bukan sesuatu yang menakutkan.

## Alur Belajar yang Disarankan

```txt
1. Pahami batas legalnya dulu.
2. Belajar membaca request dan response.
3. Baca scope program dengan teliti.
4. Pakai aplikasi seperti user biasa.
5. Catat fitur penting.
6. Mapping endpoint yang muncul dari fitur itu.
7. Cocokkan endpoint dengan bug yang mungkin relevan.
8. Lakukan test kecil dan aman.
9. Bandingkan output normal dan output mencurigakan.
10. Simpan evidence seperlunya.
11. Tulis report yang jelas.
```

## Kesalahan yang Sering Terjadi

### Langsung mencari payload

Payload itu cuma bagian kecil dari proses.

Yang lebih penting adalah tahu kapan sebuah input memang layak diuji.

Misalnya, indikator SQLi lebih masuk akal dicek pada input yang berhubungan dengan pencarian, filter, ID, sorting, login, atau report. Bukan asal ditempel ke semua form.

### Tidak membaca scope

Setiap program punya batas.

Ada asset yang boleh diuji, ada yang tidak. Ada teknik yang diizinkan, ada juga yang dilarang. Kalau keluar dari scope, aktivitas yang awalnya belajar bisa berubah jadi masalah legal.

### Tidak punya request normal

Sebelum melakukan test, simpan dulu request normalnya.

Tanpa pembanding, kamu akan sulit menjawab pertanyaan sederhana:

```txt
Output ini benar-benar aneh, atau memang normal dari aplikasinya?
```

### Menganggap semua 500 sebagai bug valid

Status 500 adalah sinyal untuk dianalisis.

Kadang itu memang error yang relevan. Kadang hanya bug handling biasa tanpa impact security yang jelas. Tetap perlu konteks, evidence, dan dampak.

## Cara Memakai Website Ini

Mulai dari urutan ini:

1. baca [Aturan Legal](./aturan-legal.md),
2. lanjut ke [Tools untuk Pemula](./tools-untuk-pemula.md),
3. pelajari [Cara Baca Request & Response](./cara-baca-request-response.md),
4. baca [Membaca Scope](./membaca-scope.md),
5. masuk ke [Program Baru](../guided-hunt-flow/program-baru.md),
6. pakai [Feature Map](../feature-map/index.md) untuk memilih bug yang masuk akal,
7. buka [Bug Tree](../bug-tree/index.md) untuk belajar bug secara bertahap.

Tidak perlu buru-buru. Lebih baik paham satu alur dengan benar daripada mencoba banyak payload tanpa tahu output-nya berarti apa.
