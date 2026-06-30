# Contributing

Terima kasih ingin berkontribusi ke Bug Knowledge.

Project ini berfokus pada edukasi bug bounty yang legal, aman, dan mudah dipahami pemula.

## Visi Konten

```txt
Ramah untuk pemula, tetap berguna untuk yang sudah expert.
```

Artinya, setiap materi sebaiknya tidak hanya menjelaskan bug, tapi juga menjawab:

```txt
- Tools apa yang dibutuhkan?
- Bisa tanpa Burp atau tidak?
- Bagaimana langkah mencobanya secara aman?
- Output aman seperti apa?
- Output mencurigakan seperti apa?
- Evidence apa yang perlu disimpan?
- Kapan harus berhenti?
```

## Template Standar

Gunakan template berikut saat menulis halaman bug baru:

```txt
docs/contribution/content-template.md
```

Untuk panduan gaya bahasa, baca:

```txt
docs/contribution/content-style-guide.md
```

## Format Konten yang Disarankan

Setiap halaman bug sebaiknya mengikuti format:

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
10. Suspicious output + contoh umum
11. Cara membaca hasil
12. Evidence yang perlu disimpan
13. Kapan harus stop
14. Recommendation
15. Referensi jika ada
```

## Konten yang Boleh

```txt
- Safe detection payload
- Contoh output error umum
- Real-world case simulation
- Checklist analisis
- Template report
- Penjelasan konsep
- Referensi OWASP/PortSwigger/lab legal
- Langkah verbal menggunakan browser/DevTools/API Client/Proxy Tool
```

## Konten yang Tidak Boleh

```txt
- Brute force script
- Credential stuffing
- Payload pencurian token/cookie
- Data dumping
- Auto exploit untuk target publik
- Instruksi destructive
- Cara bypass sistem untuk mengambil data asli
- Scanning otomatis tanpa izin
```

## Gaya Bahasa

Gunakan bahasa Indonesia yang sederhana.

Prioritaskan pemula:

```txt
Jangan cuma tulis "SQL syntax error muncul".
Berikan contoh bentuk error-nya dan cara membacanya.
```

Gunakan pola:

```txt
Browser → DevTools → API Client → Proxy Tool
```

Jangan membuat pembaca merasa harus langsung memakai Burp Suite.

## Prinsip Evidence

Selalu arahkan pembaca untuk:

```txt
- memakai akun milik sendiri;
- melakukan proof minimal;
- menyensor data sensitif;
- tidak mengakses data user asli;
- mematuhi scope program.
```

## Checklist Sebelum Submit Konten

```txt
- Ada Tool Level
- Ada Cara Mencoba Secara Aman
- Ada Expected Output
- Ada Suspicious Output
- Ada Evidence
- Ada Kapan Harus Stop
- Tidak ada instruksi eksploitasi berbahaya
- Tidak ada data sensitif asli
```
