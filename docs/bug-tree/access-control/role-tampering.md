# Role Tampering

Role tampering terjadi ketika user bisa mengubah role/permission dengan memodifikasi request dari client.

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

## Test Aman

Gunakan akun/workspace milik sendiri.

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
| Role berubah | Role tampering |
| Role berubah saat register | Mass assignment / default privilege issue |
| Member bisa ubah role member lain | Broken access control |

## Evidence

```txt
- role sebelum test
- request dengan field role
- response setelah test
- bukti role berubah
- akun/workspace milik sendiri
```

## Recommendation

```txt
- Jangan menerima role dari request user biasa
- Gunakan allowlist field
- Validasi permission per action
- Set role default dari server
```
