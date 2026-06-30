# HTTP Status Code untuk Bug Hunting

Status code membantu membaca response, tapi tidak boleh dipakai sendirian untuk menyimpulkan bug.

## Status Umum

### 200 OK

Request berhasil.

Dalam access control, `200 OK` bisa mencurigakan jika user tidak seharusnya mendapat data.

Contoh suspicious:

```http
HTTP/1.1 200 OK
```

```json
{
  "invoice_id": 991,
  "owner_email": "akun-a@example.com"
}
```

Jika request dikirim oleh akun B dan data milik akun A muncul, ini indikasi IDOR.

### 401 Unauthorized

User belum login atau token tidak valid.

Expected untuk resource private tanpa login:

```http
HTTP/1.1 401 Unauthorized
```

### 403 Forbidden

User sudah dikenali, tapi tidak punya izin.

Expected untuk akses resource orang lain:

```http
HTTP/1.1 403 Forbidden
```

### 404 Not Found

Resource tidak ditemukan atau sengaja disembunyikan.

Dalam access control, 404 sering dipakai untuk tidak membocorkan keberadaan resource.

### 429 Too Many Requests

Ada rate limit.

Expected untuk percobaan login gagal berulang sesuai batas program:

```http
HTTP/1.1 429 Too Many Requests
```

### 500 Internal Server Error

Server error.

Ini sinyal untuk dianalisis, bukan otomatis bug valid.

Suspicious jika:

```txt
- hanya muncul saat input tertentu dikirim;
- response menyebut database/framework;
- stack trace muncul;
- error mengandung path server.
```

## Ringkasan Access Control

| Test | Expected Secure | Suspicious |
|---|---|---|
| Akun B akses data Akun A | 403/404 | 200 + data Akun A |
| Logout akses file private | 401/403 | 200 + file terbuka |
| User akses admin endpoint | 403/404 | 200 + data admin |
| Login gagal berulang | 429/delay/lockout | response normal terus |

## Tips

Selalu bandingkan:

```txt
Request normal
vs
Request test
```

Status code hanya satu bagian dari evidence. Response body dan konteks permission lebih penting.
