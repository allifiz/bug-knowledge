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
