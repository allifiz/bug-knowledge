# Real Case Simulation

Real Case Simulation adalah simulasi alur bug bounty dari awal sampai report.

Bagian ini bukan target asli. Semua domain, endpoint, akun, dan data dibuat fiktif untuk edukasi.

## Tujuan

Membantu pemula memahami alur lengkap:

```txt
Program baru
→ baca scope
→ pakai aplikasi sebagai user biasa
→ mapping fitur
→ mapping endpoint
→ pilih kemungkinan bug
→ lakukan test aman
→ bandingkan output
→ validasi impact minimal
→ tulis report
```

## Simulasi yang Tersedia

| Simulasi | Fokus |
|---|---|
| Toko Online | login, profile, invoice, upload, coupon, access control |
| SaaS Team Workspace | team, role, invite, privilege, mass assignment |
| School App | user, file, data siswa, access control, export |

## Cara Membaca Simulasi

Setiap simulasi memakai format:

```txt
1. Rules dan scope
2. Fitur yang ditemukan
3. Endpoint yang ditemukan
4. Prioritas testing
5. Test case aman
6. Expected output
7. Suspicious output
8. Kesimpulan bug
9. Evidence
10. Draft report
```

## Catatan Aman

Walaupun ini simulasi, prinsipnya tetap sama seperti bug bounty asli:

```txt
- jangan keluar scope;
- jangan akses data user asli;
- jangan brute force;
- jangan dumping database;
- gunakan proof minimal;
- sensor data sensitif.
```
