# Bug Knowledge

Bug Knowledge adalah panduan bug bounty berbahasa Indonesia yang fokus ke praktik aman di dunia nyata.

Banyak materi security berhenti di teori atau payload. Repo ini mencoba menjembatani bagian yang sering bikin pemula bingung:

```txt
Aku nemu fitur ini. Harus cek apa?
Aku perlu tool apa?
Output seperti ini aman atau mencurigakan?
Kapan aku harus berhenti?
Evidence apa yang layak masuk report?
```

Targetnya sederhana: membantu pembaca memahami cara berpikir bug hunter tanpa keluar dari jalur legal dan etis.

## Untuk Siapa?

Repo ini dibuat untuk:

- pemula yang baru masuk bug bounty;
- developer yang ingin paham pola bug dari sisi backend/frontend;
- pembaca yang sudah pernah belajar dari lab, tapi bingung menerapkannya ke fitur nyata;
- siapa pun yang butuh referensi cepat untuk membaca request, response, output, dan evidence.

## Yang Dipelajari

Di dalam repo ini, kamu akan menemukan materi tentang:

- cara membaca scope dan rules program;
- cara mapping fitur dan endpoint;
- bug apa yang mungkin muncul pada fitur tertentu;
- tool apa yang dibutuhkan untuk mulai testing;
- langkah verbal untuk mencoba bug secara aman;
- expected output vs suspicious output;
- cara membaca hasil test;
- evidence yang perlu disimpan;
- kapan harus berhenti;
- cara menulis report yang rapi.

> Fokus repo ini adalah edukasi dan safe testing. Tidak ada brute force massal, credential stuffing, auto exploit, data dumping, atau instruksi destructive.

## Menjalankan Lokal

Website dokumentasi ini memakai VitePress.

```bash
npm install
npm run dev
```

Buka:

```txt
http://localhost:5173
```

## Struktur Materi

```txt
docs/
├── mulai-dari-sini/
├── guided-hunt-flow/
├── feature-map/
├── bug-tree/
├── theory-to-real-case/
├── output-encyclopedia/
├── contribution/
└── report-template/
```

## Prinsip Konten

Materi di sini tidak hanya menjawab “bug ini apa”, tapi juga “gimana cara mulai ngeceknya dengan aman”.

Format ideal halaman bug:

```txt
1. Ringkasan pemula
2. Contoh sederhana
3. Tool Level
4. Kapan harus curiga
5. Endpoint/feature yang relevan
6. Cara mencoba secara aman
7. Request normal
8. Request test
9. Expected secure output
10. Suspicious output
11. Cara membaca hasil
12. Evidence yang perlu disimpan
13. Kapan harus stop
14. Recommendation
```

## Kontribusi

Kontribusi terbuka selama tetap legal, aman, dan edukatif.

Yang boleh ditambahkan:

- simulasi real-world yang aman;
- safe detection payload;
- contoh output error umum;
- checklist analisis;
- report template;
- referensi resmi/edukatif;
- penjelasan tool untuk pemula.

Yang tidak boleh ditambahkan:

- script brute force;
- credential stuffing;
- payload pencurian token/cookie;
- dumping database;
- exploit destructive;
- instruksi menyerang target di luar scope.

Sebelum menulis materi baru, baca:

```txt
docs/contribution/content-template.md
docs/contribution/content-style-guide.md
```
