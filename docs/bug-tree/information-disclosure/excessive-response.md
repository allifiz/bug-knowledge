# Excessive Response

Excessive response terjadi ketika API mengembalikan data lebih banyak dari yang dibutuhkan user atau UI.

## Kapan Curiga

```txt
- response profile mengandung role/is_admin/internal_id;
- response order mengandung data user lain;
- response list mengandung field sensitif yang tidak ditampilkan di UI;
- endpoint public mengembalikan metadata internal;
- response mobile API terlalu lengkap.
```

## Contoh Suspicious Output

```json
{
  "id": 123,
  "name": "User Test",
  "email": "user@example.com",
  "phone": "08123456789",
  "role": "user",
  "is_admin": false,
  "internal_note": "...",
  "last_login_ip": "..."
}
```

## Expected Secure Behavior

```txt
API hanya mengembalikan field yang dibutuhkan oleh fitur tersebut.
```

## Cara Membaca Hasil

| Field | Risiko |
|---|---|
| email/phone/address | PII exposure |
| role/is_admin | internal authorization detail |
| token/api_key | sensitive secret exposure |
| internal_note | business/internal data leakage |
| last_login_ip | privacy/security metadata |

## Evidence

```txt
- endpoint terdampak
- response yang mengandung field berlebihan
- jelaskan field mana yang tidak perlu
- sensor data sensitif
```

## Recommendation

```txt
- Gunakan response DTO/serializer allowlist
- Jangan return model database mentah
- Pisahkan response public/private/admin
- Review field sensitif di API response
```
