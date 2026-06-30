# Tools untuk Pemula

Tidak semua bug bounty harus langsung memakai Burp Suite.

Untuk pemula, yang paling penting adalah paham dulu:

```txt
request → response → status code → header → body → perubahan output
```

Tools hanya membantu melihat dan mengulang proses itu.

## Level Tools

| Level | Tools | Cocok untuk |
|---|---|---|
| 1 | Browser biasa | login, register, redirect, file access, visual check |
| 2 | Browser DevTools | melihat request/response, status code, header, payload |
| 3 | API Client / curl | mengulang request, mengubah body/query secara manual |
| 4 | Proxy Tool | intercept/modify request lebih nyaman |

## Level 1 — Browser Biasa

Browser biasa cukup untuk banyak test awal.

Cocok untuk:

```txt
- user enumeration sederhana
- open redirect
- file public access
- reset token reusable
- old session masih valid
- flow bypass sederhana
```

Contoh aktivitas:

```txt
1. Buka halaman aplikasi.
2. Coba flow normal sebagai user biasa.
3. Bandingkan output normal dan output mencurigakan.
4. Catat URL, pesan error, dan perubahan halaman.
```

## Level 2 — Browser DevTools

DevTools adalah tool paling penting untuk pemula.

Buka dengan:

```txt
Chrome/Edge/Firefox: F12
atau klik kanan → Inspect
```

Bagian yang sering dipakai:

| Tab | Fungsi |
|---|---|
| Network | melihat request dan response |
| Elements | melihat HTML yang dirender |
| Application | melihat cookie/localStorage/sessionStorage |
| Console | melihat error JavaScript |

## Level 3 — API Client / curl

Dipakai ketika kamu perlu mengulang request dengan lebih rapi.

Contoh tools:

```txt
- Postman
- Insomnia
- curl
```

Cocok untuk:

```txt
- IDOR read/write
- mass assignment
- role tampering
- reset password flow
- coupon apply
- upload/download API
```

## Level 4 — Proxy Tool

Proxy tool membantu menangkap request dari browser, lalu mengubahnya sebelum dikirim ke server.

Contoh tools:

```txt
- Burp Suite
- Caido
- OWASP ZAP
```

Cocok untuk:

```txt
- mengubah request body dengan cepat
- membandingkan request antar akun
- melihat header/cookie/token
- menyusun evidence teknis
```

## Apakah Burp Wajib?

Tidak selalu.

Untuk belajar awal:

```txt
Browser + DevTools sudah cukup.
```

Burp/Caido/ZAP berguna ketika kamu sudah paham request-response dan ingin workflow lebih cepat.

## Prinsip Aman Menggunakan Tools

```txt
- Jangan brute force massal
- Jangan enumerate data orang lain
- Jangan memakai wordlist credential
- Jangan mengirim request berlebihan
- Gunakan akun testing sendiri
- Ikuti scope dan rules program
```

## Cara Memilih Tool

| Situasi | Tool minimal |
|---|---|
| Mau lihat pesan error login | Browser |
| Mau lihat status code dan response JSON | DevTools Network |
| Mau ubah body request | API Client / Proxy |
| Mau cek cookie/session | DevTools Application |
| Mau cek redirect header | DevTools Network |
| Mau akses URL file tanpa login | Browser incognito |

## Kesimpulan

Mulai dari yang paling sederhana:

```txt
Browser → DevTools → API Client → Proxy Tool
```

Jangan lompat ke tool berat sebelum paham apa yang sedang dilihat.
