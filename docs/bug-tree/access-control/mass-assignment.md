# Mass Assignment

Mass assignment terjadi ketika backend menerima field tambahan dari request user dan langsung memakainya untuk update/create data tanpa allowlist yang ketat.

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

## Test Aman

Lakukan hanya pada akun/resource milik sendiri.

Request normal:

```json
{
  "name": "User Test"
}
```

Request test:

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
| Field sensitif muncul tapi tidak berpengaruh | Perlu validasi lagi |
| Role/permission berubah | Indikasi mass assignment valid |
| Field owner_id bisa diganti | Bisa berhubungan dengan access control |

## Next Step Aman

```txt
- Gunakan akun sendiri
- Jangan mencoba mendapatkan akses admin ke sistem nyata di luar izin
- Jangan mengubah data user lain
- Simpan request normal dan request test
- Buktikan dampak secara minimal
```

## Recommendation

Backend harus memakai allowlist field yang boleh diubah user.

Contoh konsep aman:

```txt
User hanya boleh update: name, bio, avatar
User tidak boleh update: role, is_admin, balance, status
```
