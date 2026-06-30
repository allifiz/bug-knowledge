# Program Baru: Mulai dari Mana?

Halaman ini menjawab pertanyaan paling umum pemula:

> Aku baru masuk program bug bounty. Targetnya misalkan.com. Harus ngapain dulu?

## Flow Utama

```txt
1. Baca rules dan scope
2. Tentukan target aman
3. Pakai aplikasi sebagai user biasa
4. Mapping fitur
5. Mapping endpoint
6. Kelompokkan endpoint berdasarkan fungsi
7. Cocokkan fitur dengan kemungkinan bug
8. Lakukan test aman
9. Bandingkan expected vs suspicious output
10. Kumpulkan evidence
11. Tulis report
```

## Step 1 — Baca Rules dan Scope

Pertanyaan wajib:

```txt
[ ] Domain mana yang in-scope?
[ ] API mana yang in-scope?
[ ] Apakah boleh membuat akun?
[ ] Apakah boleh test multi-account?
[ ] Apakah automation diizinkan?
[ ] Apakah brute force dilarang?
[ ] Apakah social engineering dilarang?
[ ] Apakah ada batas rate request?
```

Expected output:

```txt
Kamu punya daftar target yang boleh dites dan batasan testing yang jelas.
```

Kalau tidak sesuai ekspektasi:

```txt
Jika scope tidak jelas, jangan nebak. Fokus hanya ke aset yang eksplisit in-scope.
```

## Step 2 — Pakai Aplikasi sebagai User Biasa

Sebelum cari bug, pahami dulu aplikasinya.

Checklist:

```txt
[ ] Register akun
[ ] Login
[ ] Update profile
[ ] Upload avatar/file
[ ] Buat data/order/project jika ada
[ ] Coba fitur search/filter
[ ] Coba download/export
[ ] Coba forgot password
[ ] Logout
```

Expected output:

```txt
Kamu tahu fitur utama aplikasi dan flow normal user.
```

## Step 3 — Mapping Fitur

Contoh hasil mapping:

```txt
Auth:
- Login
- Register
- Forgot password

User:
- Profile
- Avatar
- Change password

Order:
- Create order
- View order
- Download invoice

Team:
- Invite member
- Change role
```

## Step 4 — Mapping Endpoint

Contoh:

```txt
POST /api/login
POST /api/register
GET /api/me
PATCH /api/users/123
POST /api/avatar
GET /api/orders/991
GET /api/invoices/991/download
PATCH /api/team/member/5/role
```

## Step 5 — Pilih Testing Path

```txt
Login/Register/Forgot Password
→ Auth Testing

Profile/User ID/Invoice/Order
→ Access Control / IDOR

Upload Avatar/File
→ File Upload Testing

Search/Filter/Sort
→ Input Validation

Checkout/Coupon/Payment
→ Business Logic

Team/Admin/Role
→ Privilege Testing
```

## Step 6 — Bandingkan Output

Setiap test harus punya pembanding.

```txt
Request normal
vs
Request test
```

Jangan simpulkan bug hanya dari satu response.

## Step 7 — Validasi Impact Minimal

Validasi secukupnya:

```txt
- Apakah data user lain terlihat?
- Apakah data bisa diubah tanpa izin?
- Apakah error membocorkan teknologi internal?
- Apakah redirect bisa ke domain luar?
- Apakah file private bisa diakses publik?
```

## Step 8 — Tulis Report

Report harus menjawab:

```txt
Apa bug-nya?
Endpoint mana yang terdampak?
Bagaimana langkah reproduksi?
Apa expected behavior?
Apa actual behavior?
Apa impact-nya?
Apa rekomendasi fix-nya?
```
