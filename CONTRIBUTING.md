# Contributing

Terima kasih ingin berkontribusi ke Bug Knowledge.

Project ini berfokus pada edukasi bug bounty yang legal, aman, dan mudah dipahami pemula.

## Format Konten yang Disarankan

Setiap halaman bug sebaiknya mengikuti format:

```txt
1. Ringkasan pemula
2. Kapan harus curiga
3. Muncul di fitur apa
4. Endpoint pattern
5. Test aman
6. Request normal
7. Request test
8. Expected secure output
9. Suspicious output + contoh umum
10. Cara membaca hasil
11. False positive umum
12. Next step aman
13. Kapan harus stop
14. Evidence
15. Template report
16. Referensi
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
```

## Gaya Bahasa

Gunakan bahasa Indonesia yang sederhana.

Prioritaskan pemula:

```txt
Jangan cuma tulis "SQL syntax error muncul".
Berikan contoh bentuk error-nya dan cara membacanya.
```

## Prinsip Evidence

Selalu arahkan pembaca untuk:

```txt
- memakai akun milik sendiri;
- melakukan proof minimal;
- menyensor data sensitif;
- tidak mengakses data user asli;
- mematuhi scope program.
```
