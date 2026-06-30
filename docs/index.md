---
layout: home

hero:
  name: Bug Knowledge
  text: Belajar bug bounty dari fitur nyata.
  tagline: Panduan berbahasa Indonesia untuk memahami bug, tools, output, evidence, dan batas aman saat testing.
  actions:
    - theme: brand
      text: Mulai dari Sini
      link: /mulai-dari-sini/
    - theme: alt
      text: Guided Hunt Flow
      link: /guided-hunt-flow/program-baru

features:
  - title: Guided Hunt Flow
    details: Alur dari masuk program baru, baca scope, mapping fitur, mapping endpoint, pilih bug yang relevan, sampai menulis report.
  - title: Feature Map
    details: Mulai dari fitur yang kamu temukan, lalu lihat kemungkinan bug yang masuk akal untuk dicek.
  - title: Bug Tree
    details: Kategori bug disusun bertahap, dari gambaran besar sampai langkah testing yang aman.
  - title: Output Encyclopedia
    details: Bantu membaca status code, error, header, response, dan output mencurigakan supaya tidak asal klaim bug.
---

## Kenapa Repo Ini Ada?

Belajar bug bounty sering mentok di bagian yang sama.

Kita tahu nama bug-nya, tapi bingung saat ketemu aplikasi asli:

```txt
Fitur ini harus dicek apa?
Aku perlu Burp atau cukup browser?
Request mana yang penting?
Kalau output-nya begini, artinya apa?
Kapan harus berhenti biar tetap aman?
```

Bug Knowledge dibuat untuk menjawab bagian itu.

Bukan sebagai kumpulan exploit, tapi sebagai catatan belajar yang membantu pembaca memahami alur berpikirnya.

## Alur Belajar

```txt
Mulai dari rules dan scope
→ pahami fitur yang tersedia
→ lihat request dan response
→ mapping endpoint
→ pilih kemungkinan bug
→ lakukan test aman
→ bandingkan expected dan suspicious output
→ simpan evidence secukupnya
→ tulis report
```

## Batas Legal

Gunakan materi ini hanya untuk:

- program bug bounty yang jelas mengizinkan testing;
- aset milik sendiri;
- lab legal;
- pembelajaran defensive security.

Jangan gunakan untuk:

- brute force massal;
- credential stuffing;
- mengambil data user;
- dumping database;
- menyerang sistem di luar scope;
- mengganggu layanan.
