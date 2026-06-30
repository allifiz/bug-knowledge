# Scenario: `PATCH /api/team/member/{id}/role`

Endpoint ini biasanya digunakan untuk mengubah role member dalam team, organization, workspace, atau project.

## Contoh Endpoint

```txt
PATCH /api/team/member/5/role
PATCH /api/organization/10/members/5
PATCH /api/users/5/role
POST /api/team/invite
```

## Pertanyaan Analisis

```txt
- Siapa yang boleh mengubah role?
- Apakah member biasa boleh mengubah role?
- Apakah user bisa mengubah role dirinya sendiri?
- Apakah role dikirim dari client?
- Apakah server memvalidasi permission di backend?
```

## Kemungkinan Bug

```txt
Access Control
├── Vertical privilege escalation
├── Role tampering
├── Unauthorized member update
└── Object action authorization

Business Logic
├── Invite token reuse
├── Expired invite still valid
└── Role downgrade/upgrade bypass
```

## Test Aman 1 — Member Biasa Ubah Role

Gunakan workspace milik sendiri.

Request dari user biasa:

```http
PATCH /api/team/member/5/role
Authorization: Bearer token-member-biasa
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

## Test Aman 2 — User Mengubah Role Sendiri

Request:

```http
PATCH /api/team/member/me/role
Content-Type: application/json

{
  "role": "owner"
}
```

Expected secure output:

```txt
Request ditolak atau field role diabaikan.
```

Suspicious output:

```txt
Role user berubah menjadi admin/owner.
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| 403 untuk member biasa | Kemungkinan aman |
| 200 + role berubah | Privilege escalation / role tampering |
| Field role diabaikan | Kemungkinan aman |
| Invite role bisa dimanipulasi | Business logic / invite flow issue |

## Evidence

```txt
- Role awal akun testing
- Request update role
- Response actual
- Screenshot role berubah jika ada
- Bukti user tidak seharusnya punya permission
```

## Link Terkait

- [Team & Role Feature Map](../feature-map/team-role.md)
- [Mass Assignment](../bug-tree/access-control/mass-assignment.md)
- [Business Logic](../bug-tree/business-logic/index.md)
