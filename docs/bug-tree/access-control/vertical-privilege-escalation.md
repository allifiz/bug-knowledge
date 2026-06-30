# Vertical Privilege Escalation

Vertical privilege escalation terjadi ketika user dengan role rendah bisa mengakses fitur atau aksi milik role lebih tinggi.

Contoh:

```txt
user biasa → akses endpoint admin
member → menjadi admin workspace
staff → akses fitur superadmin
```

## Kapan Curiga

```txt
- endpoint admin bisa dipanggil langsung;
- tombol disembunyikan di UI, tapi API tetap bisa diakses;
- role dikirim dari client;
- endpoint action seperti approve/cancel/change-role tidak cek permission;
- response 200 muncul untuk role yang tidak seharusnya.
```

## Endpoint Umum

```txt
GET /api/admin/users
PATCH /api/users/{id}/role
POST /api/approval/{id}/approve
PATCH /api/team/member/{id}/role
DELETE /api/team/member/{id}
```

## Test Aman

Gunakan akun milik sendiri pada workspace/test data sendiri.

```txt
1. Catat role akun testing.
2. Panggil endpoint yang seharusnya hanya untuk admin/owner.
3. Bandingkan expected permission dengan actual response.
```

## Expected Secure Output

```http
HTTP/1.1 403 Forbidden
```

## Suspicious Output

```http
HTTP/1.1 200 OK
```

```json
{
  "message": "Role updated successfully"
}
```

## Evidence

```txt
- role awal akun testing
- endpoint admin/action
- request dari role rendah
- response berhasil
- screenshot role/aksi berubah jika ada
```

## Recommendation

```txt
- Enforce authorization di backend
- Jangan hanya menyembunyikan tombol di frontend
- Validasi role/permission per action
- Gunakan policy/guard/middleware yang konsisten
```
