# Content Style Guide

Halaman ini menjelaskan gaya penulisan untuk Bug Knowledge.

Tujuan utama project ini:

```txt
Ramah untuk pemula, tetap berguna untuk yang sudah berpengalaman.
```

## Gaya Bahasa

Gunakan bahasa Indonesia yang jelas dan langsung.

Disarankan:

```txt
IDOR Read terjadi ketika user bisa membaca resource milik user lain dengan mengganti ID resource.
```

Hindari:

```txt
Improper object authorization vulnerability caused by insecure direct object references...
```

Boleh memakai istilah teknis, tapi jelaskan dengan bahasa manusia.

## Pola Penjelasan

Setiap konsep sebaiknya punya:

```txt
1. Ringkasnya
2. Contoh sederhana
3. Kapan curiga
4. Cara mencoba secara aman
5. Expected output
6. Suspicious output
7. Evidence
8. Kapan harus stop
```

## Jangan Hanya Memberi Payload

Kurang bagus:

```txt
Coba payload: '
```

Lebih bagus:

```txt
Gunakan single quote sebagai indikator ringan untuk melihat apakah input memicu error database. Jika muncul error seperti SQL syntax error, itu bisa menjadi sinyal bahwa input menyentuh query SQL secara tidak aman.
```

## Jelaskan Tools dengan Bertahap

Setiap materi bug harus menjawab:

```txt
- Bisa tanpa Burp?
- Minimal tools apa?
- Apakah cukup browser biasa?
- Kapan perlu DevTools?
- Kapan API Client atau Proxy Tool membantu?
```

Urutan yang disarankan:

```txt
Browser → DevTools → API Client → Proxy Tool
```

## Expected vs Suspicious Output

Selalu tulis dua sisi:

```txt
Expected secure output:
Aplikasi menolak akses dengan 403/404.
```

```txt
Suspicious output:
Aplikasi mengembalikan 200 OK dan data milik user lain.
```

Pemula perlu tahu bukan hanya cara test, tapi juga cara membaca hasil.

## Safety Boundary

Konten boleh membahas:

```txt
- deteksi aman
- validasi minimal
- akun testing sendiri
- expected/suspicious output
- evidence report
- recommendation fix
```

Konten tidak boleh membahas:

```txt
- brute force massal
- credential stuffing
- dump database
- mengambil data user lain
- bypass login untuk takeover
- exploit chain yang menyerang sistem nyata
- destructive payload
- scanning otomatis tanpa izin
```

## Kapan Harus Stop

Setiap halaman bug harus punya section ini.

Contoh:

```txt
- Jangan akses resource user asli
- Jangan enumerate banyak ID
- Jangan mengambil data sensitif
- Cukup buktikan dengan akun milik sendiri
```

## Evidence yang Aman

Evidence harus cukup untuk report, tapi tidak membocorkan data sensitif.

```txt
- Sensor token/cookie
- Sensor email/nomor telepon/alamat
- Jangan lampirkan data user lain
- Gunakan akun testing sendiri
- Tunjukkan before/after seperlunya
```

## Tone yang Diinginkan

```txt
- Praktis
- Bertahap
- Tidak menggurui
- Tidak sok hacker
- Tidak terlalu akademik
- Tidak terlalu banyak jargon
```

Bayangkan pembaca bertanya:

```txt
Aku harus klik apa?
Aku harus lihat bagian mana?
Kalau output-nya begini artinya apa?
Aku butuh Burp atau cukup browser?
Kapan aku harus berhenti?
```

Materi yang bagus harus menjawab pertanyaan itu.
