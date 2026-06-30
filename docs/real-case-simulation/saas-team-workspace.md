# Real Case Simulation: SaaS Team Workspace

Simulasi ini memakai target fiktif:

```txt
https://workspace-app.test
```

Fokus simulasi:

```txt
team, organization, role, invite, privilege, dan mass assignment.
```

## 1. Rules dan Scope

```txt
In scope:
- app.workspace-app.test
- api.workspace-app.test

Allowed:
- manual testing
- membuat workspace sendiri
- membuat beberapa akun testing
- testing role dalam workspace sendiri

Out of scope:
- social engineering
- spam invite ke email orang lain
- brute force
- DDoS
```

## 2. Fitur yang Ditemukan

```txt
Auth:
- register
- login

Workspace:
- create workspace
- invite member
- list member
- change role
- remove member

Project:
- create project
- add task
- assign task
```

## 3. Endpoint yang Ditemukan

```txt
POST /api/register
POST /api/login
POST /api/workspaces
GET /api/workspaces/10/members
POST /api/workspaces/10/invite
PATCH /api/workspaces/10/members/5/role
DELETE /api/workspaces/10/members/5
PATCH /api/users/123
```

## 4. Role Testing Setup

Buat data testing:

```txt
Akun Owner:
- membuat workspace
- mengundang member

Akun Member:
- menerima invite
- role awal: member
```

Expected permission:

```txt
Owner boleh:
- invite member
- change role
- remove member

Member biasa tidak boleh:
- change role
- remove member lain
- menjadikan dirinya admin/owner
```

## 5. Test Case 1 — Member Biasa Mengubah Role

### Request dari member biasa

```http
PATCH /api/workspaces/10/members/5/role
Authorization: Bearer token-member
Content-Type: application/json

{
  "role": "admin"
}
```

### Expected secure output

```http
HTTP/1.1 403 Forbidden
```

atau:

```json
{
  "message": "You do not have permission to perform this action"
}
```

### Suspicious output

```json
{
  "member_id": 5,
  "role": "admin"
}
```

### Kesimpulan

Jika role member berubah menjadi admin, kemungkinan:

```txt
Privilege Escalation / Broken Access Control
```

## 6. Test Case 2 — User Mengubah Role Sendiri via Profile

### Request normal

```http
PATCH /api/users/123
Authorization: Bearer token-member
Content-Type: application/json

{
  "name": "Member Test"
}
```

### Request test

```http
PATCH /api/users/123
Authorization: Bearer token-member
Content-Type: application/json

{
  "name": "Member Test",
  "role": "owner",
  "is_admin": true
}
```

### Expected secure output

```json
{
  "id": 123,
  "name": "Member Test",
  "role": "member"
}
```

### Suspicious output

```json
{
  "id": 123,
  "name": "Member Test",
  "role": "owner",
  "is_admin": true
}
```

### Kesimpulan

Jika field sensitif diproses, kemungkinan:

```txt
Mass Assignment / Privilege Escalation
```

## 7. Test Case 3 — Invite Token Reuse

### Flow normal

```txt
Owner invite member → member menerima invite → token invite tidak bisa dipakai lagi.
```

### Test

1. Owner membuat invite untuk akun B.
2. Akun B menerima invite.
3. Coba gunakan link invite yang sama lagi untuk akun C milik sendiri.

### Expected secure output

```json
{
  "message": "Invite token is invalid or already used"
}
```

### Suspicious output

```json
{
  "message": "Joined workspace successfully"
}
```

### Kesimpulan

Jika invite sekali pakai bisa dipakai berulang, kemungkinan:

```txt
Business Logic: Reusable Invite Token
```

## 8. Test Case 4 — Remove Member Tanpa Permission

### Request dari member biasa

```http
DELETE /api/workspaces/10/members/6
Authorization: Bearer token-member
```

### Expected secure output

```http
HTTP/1.1 403 Forbidden
```

### Suspicious output

```json
{
  "message": "Member removed successfully"
}
```

### Kesimpulan

Jika member biasa bisa menghapus member lain:

```txt
Broken Access Control / Unauthorized Action
```

## 9. Prioritas Report

```txt
1. Member biasa bisa change role → high impact
2. Mass assignment role/is_admin → high impact jika privilege berubah
3. Remove member tanpa permission → medium/high tergantung impact
4. Invite token reuse → medium, tergantung flow dan data yang bisa diakses
```

## 10. Draft Report — Role Privilege Escalation

```md
# Privilege Escalation via Team Role Update Endpoint

## Summary
A regular workspace member can update a team member's role to admin by sending a direct request to the role update endpoint.

## Affected Endpoint
PATCH /api/workspaces/{workspace_id}/members/{member_id}/role

## Steps to Reproduce
1. Create a workspace as Account A.
2. Invite Account B as a regular member.
3. Login as Account B.
4. Send a request to update the member role to `admin`.
5. Observe that the role is updated successfully.

## Expected Behavior
Only workspace owners or authorized admins should be able to update member roles.

## Actual Behavior
A regular member can update the role successfully.

## Impact
A regular member can escalate privileges and gain administrative access to the workspace.

## Recommendation
Enforce server-side authorization checks for role management actions.
```

## 11. Pelajaran dari Simulasi

```txt
- Jangan percaya UI. Tombol yang disembunyikan bukan security.
- Role dan permission harus divalidasi di backend.
- Endpoint action seperti change role/remove member sering lebih penting daripada endpoint read.
- Mass assignment sering muncul saat backend menerima field JSON terlalu bebas.
- Invite flow perlu dicek expiry, reuse, dan role default.
```
