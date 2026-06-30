# Sensitive Metadata Exposure

Sensitive metadata exposure terjadi ketika response membocorkan metadata yang tidak seharusnya diketahui user.

## Contoh Metadata Sensitif

```txt
owner_id
internal_id
storage_bucket
private_path
is_admin
role
permission
last_login_ip
debug_id
trace_id
server_name
```

## Kapan Curiga

```txt
- response upload mengembalikan storage bucket/path;
- response profile mengandung role/internal permission;
- response file mengandung owner_id milik user lain;
- error response mengandung trace/debug data terlalu detail.
```

## Expected Secure Behavior

```txt
Response hanya mengandung metadata yang dibutuhkan fitur dan aman ditampilkan ke user.
```

## Suspicious Output

```json
{
  "file_id": 883,
  "owner_id": 123,
  "storage_bucket": "private-user-documents",
  "internal_path": "/var/www/app/private/user-123.pdf"
}
```

## Cara Membaca Hasil

| Metadata | Risiko |
|---|---|
| owner_id | membantu IDOR/access control testing |
| storage_bucket | storage architecture leakage |
| internal_path | internal path leakage |
| role/is_admin | authorization detail leakage |
| trace/debug id | bisa bantu korelasi internal/debug |

## Evidence

```txt
- endpoint terdampak
- response metadata
- jelaskan kenapa metadata tidak perlu ditampilkan
- sensor data sensitif jika perlu
```

## Recommendation

```txt
- Gunakan response allowlist
- Jangan return object database/storage mentah
- Pisahkan metadata internal dan public
- Sensor debug/trace info di production
```
