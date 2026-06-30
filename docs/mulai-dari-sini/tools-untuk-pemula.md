# Tools untuk Pemula

Kamu tidak harus langsung memakai Burp Suite untuk mulai belajar bug bounty.

Di awal, yang perlu dipahami adalah alur dasarnya:

```txt
request dikirim → server membalas → kita baca status code, header, body, dan perubahan output
```

Tools hanya membantu melihat proses itu dengan lebih jelas.

## Urutan yang Enak untuk Belajar

| Level | Tools | Dipakai saat |
|---|---|---|
| 1 | Browser biasa | mengecek flow, tampilan, redirect, file public, pesan error |
| 2 | Browser DevTools | melihat request, response, status code, header, payload |
| 3 | API Client / curl | mengulang request dan mengubah parameter/body secara manual |
| 4 | Proxy Tool | intercept dan modify request dengan workflow yang lebih nyaman |

## Level 1 — Browser Biasa

Banyak test awal bisa dimulai hanya dari browser.

Contohnya:

- membandingkan pesan error login;
- mencoba redirect ke domain netral;
- membuka URL file lewat incognito;
- memakai ulang link reset password milik sendiri;
- mengecek apakah session lama masih aktif setelah password diganti.

Alurnya sederhana:

```txt
1. Pakai aplikasi seperti user biasa.
2. Catat output normalnya.
3. Lakukan perubahan kecil yang aman.
4. Bandingkan output sebelum dan sesudah.
```

## Level 2 — Browser DevTools

DevTools adalah tool pertama yang sebaiknya dikuasai.

Cara membukanya:

```txt
F12
atau klik kanan → Inspect
```

Bagian yang paling sering dipakai:

| Tab | Fungsi |
|---|---|
| Network | melihat request dan response |
| Elements | melihat HTML yang dirender |
| Application | melihat cookie, localStorage, dan sessionStorage |
| Console | melihat error JavaScript |

Kalau baru mulai, fokus dulu ke **Network**.

Di sana kamu bisa melihat endpoint, method, status code, payload, response, dan header.

## Level 3 — API Client / curl

Setelah paham request normal, kamu bisa mengulang request dengan API Client atau curl.

Contoh tools:

- Postman;
- Insomnia;
- curl.

Ini berguna untuk case seperti:

- IDOR read/write;
- mass assignment;
- role tampering;
- reset password flow;
- coupon apply;
- upload/download API.

Gunakan dengan hati-hati. Ubah satu bagian saja, lalu bandingkan hasilnya.

## Level 4 — Proxy Tool

Proxy tool membantu menangkap request dari browser, lalu mengubahnya sebelum request sampai ke server.

Contoh tools:

- Burp Suite;
- Caido;
- OWASP ZAP.

Proxy tool berguna ketika kamu sudah mulai sering:

- membandingkan request antar akun;
- mengubah body request;
- melihat cookie/token/header;
- menyusun evidence teknis;
- mengulang request dengan variasi kecil.

## Apakah Burp Wajib?

Tidak selalu.

Untuk awal, kombinasi ini sudah cukup:

```txt
Browser + DevTools
```

Burp, Caido, atau ZAP baru terasa berguna setelah kamu paham apa itu request dan response. Kalau belum paham, proxy tool justru bisa terlihat membingungkan.

## Prinsip Aman Menggunakan Tools

```txt
- Jangan brute force massal.
- Jangan enumerate data orang lain.
- Jangan memakai wordlist credential.
- Jangan mengirim request berlebihan.
- Gunakan akun testing sendiri.
- Ikuti scope dan rules program.
```

## Memilih Tool yang Tepat

| Situasi | Tool minimal |
|---|---|
| Melihat pesan error login | Browser |
| Melihat status code dan response JSON | DevTools Network |
| Mengubah body request | API Client / Proxy |
| Mengecek cookie/session | DevTools Application |
| Mengecek redirect header | DevTools Network |
| Membuka URL file tanpa login | Browser incognito |

## Intinya

Mulai dari yang ringan dulu:

```txt
Browser → DevTools → API Client → Proxy Tool
```

Jangan buru-buru memakai tool berat sebelum paham apa yang sedang kamu lihat.
