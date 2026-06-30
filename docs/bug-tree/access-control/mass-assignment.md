# Mass Assignment

Mass assignment terjadi ketika backend menerima field tambahan dari request user dan langsung memakainya untuk create/update data tanpa allowlist yang ketat.

Contoh sederhananya:

```txt
UI hanya mengirim name.
Tapi user menambahkan field role atau is_admin di request.
Jika backend menerima field itu, privilege bisa berubah.
```

## Tool Level

| Kebutuhan | Jawaban |
|---|---|
| Bisa tanpa Burp? | Sebagian, tapi kurang nyaman |
| Minimal tools | DevTools Network + Copy as cURL / API Client |
| Disarankan | API Client atau Proxy Tool |
| Proxy tool | Opsional, sangat membantu |
| Butuh akun testing? | Satu akun sendiri cukup untuk test awal |

## Kapan Curiga

Curiga jika request body berisi object JSON yang bisa ditambah field baru.

Endpoint umum:

```txt
POST /api/register
PATCH /api/profile
PATCH /api/users/{id}
POST /api/team/member
PATCH /api/settings
```

Field yang sering sensitif:

```txt
role
is_admin
is_verified
status
balance
plan
permission
owner_id
user_id
organization_id
```

## Cara Mencoba Secara Aman

### Mode 1 — DevTools + Copy as cURL

```txt
1. Login memakai akun milik sendiri.
2. Buka halaman edit profile atau register.
3. Buka DevTools → Network.
4. Lakukan update normal, misalnya ubah name.
5. Klik request update profile/register.
6. Lihat Payload untuk memahami body normal.
7. Klik kanan request → Copy as cURL.
8. Paste ke text editor atau API client.
9. Tambahkan satu field sensitif untuk validasi aman.
10. Kirim request sekali.
11. Cek apakah field itu diabaikan, ditolak, atau diproses.
```

### Mode 2 — API Client / Proxy

```txt
1. Ambil request normal dari DevTools atau proxy history.
2. Simpan request normal sebagai pembanding.
3. Tambahkan field sensitif pada body request.
4. Kirim request menggunakan akun sendiri.
5. Cek response dan dashboard akun.
6. Jangan memakai privilege baru untuk mengakses data orang lain.
```

## Request Normal

```json
{
  "name": "User Test"
}
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
Field sensitif ditolak, diabaikan, atau tidak muncul di response.
```

Contoh:

```json
{
  "id": 123,
  "name": "User Test",
  "role": "user"
}
```

## Suspicious Output

```json
{
  "id": 123,
  "name": "User Test",
  "role": "admin",
  "is_admin": true
}
```

atau privilege di dashboard berubah setelah request.

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Field sensitif diabaikan | Kemungkinan aman |
| Field sensitif ditolak dengan error validasi | Kemungkinan aman |
| Field sensitif muncul tapi tidak berpengaruh | Perlu validasi lagi |
| Role/permission berubah | Indikasi mass assignment valid |
| Field owner_id bisa diganti | Bisa berhubungan dengan access control |

## Evidence yang Perlu Disimpan

```txt
- Request normal
- Request test dengan field tambahan
- Response normal
- Response test
- Bukti role/permission/status sebelum dan sesudah
- Sensor token/cookie/email
```

## Kapan Harus Stop

```txt
- Gunakan akun sendiri
- Jangan mencoba mendapatkan akses admin di luar izin
- Jangan membuka data user lain
- Jangan mengubah data organisasi nyata
- Cukup buktikan perubahan field/privilege secara minimal
```

## Recommendation

Backend harus memakai allowlist field yang boleh diubah user.

Contoh konsep aman:

```txt
User hanya boleh update: name, bio, avatar
User tidak boleh update: role, is_admin, balance, status
```
