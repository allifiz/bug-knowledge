# Role Tampering

Role tampering terjadi ketika user bisa mengubah role/permission dengan memodifikasi request dari client.

Contoh sederhana:

```txt
User biasa mengirim request update profile.
Lalu user menambahkan field role=admin.
Jika role berubah, itu suspicious.
```

## Tool Level

| Kebutuhan | Jawaban |
|---|---|
| Bisa tanpa Burp? | Sebagian, tapi kurang nyaman |
| Minimal tools | DevTools Network + Copy as cURL / API Client |
| Disarankan | API Client / Proxy Tool |
| Proxy tool | Opsional, sangat membantu untuk edit body request |
| Butuh akun testing? | Satu akun sendiri untuk self-role, dua akun/role untuk team role |

## Kapan Curiga

```txt
- request body punya field role/is_admin/permission;
- user bisa mengubah role diri sendiri;
- user biasa bisa mengubah role member lain;
- role default saat register bisa dimanipulasi;
- invite role dikontrol dari client.
```

## Field Sensitif

```txt
role
is_admin
is_owner
permission
permissions
status
user_type
account_type
plan
```

## Cara Mencoba Secara Aman

### Mode 1 — DevTools + Copy as cURL

```txt
1. Login memakai akun sendiri.
2. Buka fitur profile/register/team member.
3. Buka DevTools → Network.
4. Jalankan request normal.
5. Lihat payload/body yang dikirim frontend.
6. Copy request sebagai cURL atau pindahkan ke API Client.
7. Tambahkan field role/is_admin secara terbatas.
8. Kirim request sekali.
9. Cek apakah role berubah atau tetap aman.
```

### Mode 2 — Team/workspace testing

```txt
1. Buat workspace milik sendiri.
2. Buat user/member testing dengan role rendah.
3. Dari member role rendah, coba akses endpoint update role.
4. Expected-nya server menolak.
5. Jangan mengubah role di organisasi nyata yang bukan milikmu.
```

## Request Test

```json
{
  "name": "User Test",
  "role": "admin",
  "is_admin": true
}
```

## Expected Secure Output

```txt
Field role/is_admin ditolak atau diabaikan.
```

## Suspicious Output

```json
{
  "id": 123,
  "role": "admin",
  "is_admin": true
}
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Field role diabaikan | Kemungkinan aman |
| Field role ditolak validasi | Kemungkinan aman |
| Role berubah | Role tampering |
| Role berubah saat register | Mass assignment / default privilege issue |
| Member bisa ubah role member lain | Broken access control |

## Evidence yang Perlu Disimpan

```txt
- Role sebelum test
- Request normal
- Request dengan field role/is_admin
- Response setelah test
- Bukti role berubah jika ada
- Akun/workspace milik sendiri
- Sensor token/cookie
```

## Kapan Harus Stop

```txt
- Jangan memakai privilege baru untuk akses data user lain
- Jangan mengubah role organisasi nyata
- Jangan invite/remove member sungguhan
- Cukup buktikan field role diproses atau role berubah
```

## Recommendation

```txt
- Jangan menerima role dari request user biasa
- Gunakan allowlist field
- Validasi permission per action
- Set role default dari server
- Pisahkan endpoint admin dan user biasa
```
