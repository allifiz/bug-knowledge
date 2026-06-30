# Feature Map: Team & Role

Fitur team dan role biasanya muncul pada aplikasi SaaS, dashboard organisasi, admin panel, project management, dan aplikasi internal.

## Endpoint Pattern

```txt
POST /api/team/invite
GET /api/team/members
PATCH /api/team/member/{id}/role
DELETE /api/team/member/{id}
POST /api/organization/{id}/members
PATCH /api/users/{id}/role
```

## Bug yang Mungkin Relevan

```txt
Access Control
├── Vertical privilege escalation
├── Horizontal privilege issue
├── Role tampering
├── Invite abuse
├── Unauthorized member removal
└── Object action authorization

Business Logic
├── Invite accepted without permission
├── Expired invite still valid
├── Reusing invite token
└── Role downgrade/upgrade bypass
```

## Test Aman Awal

### 1. User biasa ubah role

Request mencurigakan:

```http
PATCH /api/team/member/5/role
Content-Type: application/json

{
  "role": "admin"
}
```

Expected secure output:

```http
HTTP/1.1 403 Forbidden
```

atau:

```json
{
  "message": "You do not have permission to perform this action"
}
```

Suspicious output:

```json
{
  "member_id": 5,
  "role": "admin"
}
```

Kemungkinan bug:

```txt
Privilege escalation / role tampering.
```

### 2. Member menghapus member lain

Expected secure output:

```txt
Hanya owner/admin yang bisa remove member.
```

Suspicious output:

```txt
Member biasa bisa menghapus user lain dari team.
```

### 3. Invite token reuse

Expected secure output:

```txt
Invite token hanya bisa dipakai sesuai rules, punya expiry, dan tidak bisa disalahgunakan untuk role lebih tinggi.
```

Suspicious output:

```txt
Invite lama masih bisa dipakai, role bisa dimanipulasi, atau user bisa join organization yang tidak seharusnya.
```

## Evidence

```txt
- Role akun yang melakukan request
- Endpoint aksi role/member
- Request normal
- Request test
- Response berhasil jika tidak seharusnya
- Screenshot role/member berubah jika ada
```

## Catatan Aman

Gunakan workspace/team milik sendiri. Jangan mengubah member atau role pada organisasi nyata yang bukan milikmu.
