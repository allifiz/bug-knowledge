# Authentication

Authentication adalah proses membuktikan identitas user.

Bug authentication sering muncul di login, register, forgot password, reset password, logout, session, token, OTP, dan MFA.

## Tree

```txt
Authentication
├── Login
│   ├── User enumeration
│   ├── Missing rate limit
│   ├── Weak account lockout
│   ├── Verbose error message
│   ├── SQLi indicator
│   └── Session/token not rotated
│
├── Register
│   ├── Email verification bypass
│   ├── Role tampering
│   ├── Mass assignment
│   └── Duplicate account issue
│
├── Forgot Password
│   ├── Reset token reusable
│   ├── Reset token not expired
│   ├── Token leaked in response
│   ├── Weak token entropy indicator
│   └── Old session still valid after reset
│
└── Logout/Session
    ├── Token still valid after logout
    ├── Session timeout missing
    ├── Cookie misconfiguration
    └── Remember-me weak behavior
```

## Klik untuk Belajar

| Area | Bug | Halaman |
|---|---|---|
| Login | User enumeration | [User Enumeration](./user-enumeration.md) |
| Login | Missing rate limit | [Missing Rate Limit](./missing-rate-limit.md) |
| Login | Weak account lockout | [Weak Account Lockout](./weak-account-lockout.md) |
| Login | Session fixation | [Session Fixation](./session-fixation.md) |
| Login/Session | Token/session not rotated | [Token / Session Not Rotated](./token-session-not-rotated.md) |
| Register | Email verification bypass | [Email Verification Bypass](./email-verification-bypass.md) |
| Register | Weak password policy | [Weak Password Policy](./weak-password-policy.md) |
| Forgot Password | Reset token reusable | [Reset Token Reusable](./reset-token-reusable.md) |
| Forgot Password | Reset token not expired | [Reset Token Not Expired](./reset-token-not-expired.md) |
| Forgot Password | Token leaked in response | [Token Leaked in Response](./token-leaked-in-response.md) |
| Forgot Password | Old session still valid after reset | [Old Session Valid After Reset](./old-session-valid-after-reset.md) |
| Forgot Password | Weak reset flow | [Weak Reset Flow](./weak-reset-flow.md) |

## Mulai dari Feature

| Feature ditemukan | Mulai dari sini |
|---|---|
| Login | [Feature Map: Login](../../feature-map/login.md) |
| Register | [Feature Map: Register](../../feature-map/register.md) |
| Forgot password | [Feature Map: Forgot Password](../../feature-map/forgot-password.md) |
| Profile/session | [Feature Map: Profile](../../feature-map/profile.md) |

## Kapan Curiga

```txt
- Response login berbeda antara email valid dan tidak valid
- Banyak percobaan login gagal tetap normal
- Reset password link bisa dipakai ulang
- Token reset muncul di response API
- Logout tidak menghapus session/token
- Cookie tidak punya flag keamanan yang sesuai
```

## Prinsip Testing Aman

```txt
- Gunakan akun sendiri
- Jangan brute force massal
- Jangan memakai credential orang lain
- Jangan memakai leaked password list
- Cukup bukti minimal sesuai rules program
```
