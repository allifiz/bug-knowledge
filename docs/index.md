---
layout: home

hero:
  name: Bug Knowledge
  text: Dari teori vulnerability ke real case bug bounty.
  tagline: Panduan bug bounty berbahasa Indonesia untuk pemula yang ingin belajar secara legal, aman, dan terstruktur.
  actions:
    - theme: brand
      text: Mulai dari Sini
      link: /mulai-dari-sini/
    - theme: alt
      text: Guided Hunt Flow
      link: /guided-hunt-flow/program-baru

features:
  - title: Guided Hunt Flow
    details: Langkah dari masuk program bug bounty baru, membaca scope, mapping fitur, mapping endpoint, memilih testing path, sampai report.
  - title: Theory to Real Case
    details: Konsep dari lab seperti DVWA, OWASP, dan PortSwigger diterjemahkan ke fitur nyata seperti login, profile, invoice, upload, search, dan API.
  - title: Output Encyclopedia
    details: Contoh error, status code, response, header redirect, dan output suspicious supaya pemula tahu hasil test itu maksudnya apa.
  - title: Bug Tree
    details: Taxonomy bug dari kategori besar sampai sub-case dan test case yang bisa dipelajari bertahap.
---

## Prinsip Utama

Project ini bukan kumpulan exploit untuk menyerang target sembarangan.

Project ini adalah **fieldbook edukatif** untuk membantu pemula memahami cara berpikir bug hunter:

```txt
Target baru
→ baca rules dan scope
→ pahami fitur
→ mapping endpoint
→ pilih kemungkinan bug
→ lakukan test aman
→ bandingkan expected vs suspicious output
→ validasi impact secara minimal
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
