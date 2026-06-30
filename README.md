# Bug Knowledge

Panduan bug bounty berbahasa Indonesia yang menerjemahkan teori vulnerability dari lab dan referensi security ke skenario real-world.

Project ini dibuat untuk membantu pemula memahami:

- mulai dari mana ketika masuk program bug bounty baru;
- cara membaca scope dan rules;
- cara mapping fitur dan endpoint;
- bug apa yang mungkin muncul pada suatu fitur;
- test aman yang bisa dilakukan;
- expected output vs suspicious output;
- cara membaca hasil test;
- evidence apa yang perlu dikumpulkan;
- kapan harus berhenti testing;
- cara menulis report yang rapi.

> Fokus project ini adalah edukasi, legalitas, dan safe testing. Tidak ada brute force massal, credential stuffing, auto exploit, data dumping, atau instruksi destructive.

## Stack

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
└── report-template/
```

## Prinsip Konten

Setiap materi bug idealnya memakai format:

```txt
1. Ringkasan pemula
2. Kapan harus curiga
3. Muncul di fitur apa
4. Endpoint pattern
5. Test aman
6. Request normal
7. Request test
8. Expected secure output
9. Suspicious output + contoh nyata
10. Cara membaca hasil
11. False positive umum
12. Next step aman
13. Kapan harus stop
14. Evidence
15. Template report
16. Referensi
```

## Kontribusi

Kontribusi sangat terbuka selama mengikuti prinsip legal dan edukatif.

Yang boleh ditambahkan:

- real-world case simulation;
- safe detection payload;
- contoh output error umum;
- checklist analisis;
- report template;
- referensi resmi/edukatif.

Yang tidak boleh ditambahkan:

- script brute force;
- credential stuffing;
- payload pencurian token/cookie;
- dumping database;
- exploit destructive;
- instruksi menyerang target di luar scope.
