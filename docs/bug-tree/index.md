# Bug Tree

Bug Tree adalah taxonomy bug dari kategori besar sampai sub-case.

Tujuannya bukan menghafal semua bug, tapi membantu pemula memahami hubungan antara fitur, endpoint, dan kemungkinan vulnerability.

## Struktur

```txt
Bug Category
└── Sub-category
    └── Sub-case
        └── Test case
            ├── Expected secure output
            ├── Suspicious output
            ├── Cara membaca hasil
            ├── Evidence
            └── Report template
```

## Kategori Awal

```txt
Access Control
├── IDOR / BOLA read
├── IDOR / BOLA write
├── Vertical privilege escalation
├── Role tampering
└── Object action authorization

Authentication
├── User enumeration
├── Missing rate limit
├── Reset token issue
├── Session fixation
└── Logout/session issue

Input Validation
├── SQL Injection indicator
├── XSS
├── Open Redirect
├── Path Traversal
└── File Upload validation

Business Logic
├── Coupon reuse
├── Price manipulation
├── Quantity manipulation
├── Workflow bypass
└── Race condition concept

Information Disclosure
├── Excessive response
├── Stack trace
├── Debug mode
├── Token leakage
└── Public private-file
```

## Cara Pakai

Jika kamu sudah tahu bug yang ingin dipelajari, masuk dari Bug Tree.

Jika kamu belum tahu bug apa yang mungkin muncul, mulai dari [Feature Map](../feature-map/index.md).
