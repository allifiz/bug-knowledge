# Input Validation

Input validation adalah cara aplikasi menerima, memproses, dan menampilkan input dari user.

Bug input validation muncul ketika input user tidak divalidasi, tidak di-escape, atau dipakai langsung dalam query/HTML/redirect/path.

## Tree

```txt
Input Validation
├── SQL Injection Indicator
│   ├── Error-based indicator
│   ├── Numeric parameter behavior
│   ├── Search/filter input
│   ├── Sort/order parameter
│   └── Login form indicator
│
├── XSS
│   ├── Reflected XSS
│   ├── Stored XSS
│   ├── DOM XSS concept
│   ├── HTML body context
│   ├── Attribute context
│   └── JavaScript context
│
├── Open Redirect
│   ├── next=
│   ├── redirect=
│   ├── returnUrl=
│   ├── callback=
│   └── continue=
│
├── Path Traversal
│   ├── File download
│   ├── Image preview
│   ├── Export result
│   └── Template/file viewer
│
└── File Upload Validation
    ├── Extension validation weak
    ├── MIME/content-type trust issue
    ├── File size limit missing
    └── Server path disclosure
```

## Prinsip Pemula

Jangan hanya bertanya:

```txt
Payload apa yang harus dicoba?
```

Tanya dulu:

```txt
Input ini dipakai untuk apa?
Apakah masuk ke database?
Apakah ditampilkan lagi ke HTML?
Apakah menjadi URL redirect?
Apakah menjadi nama/path file?
```

## Expected Secure Behavior

```txt
- Input divalidasi
- Error ditangani tanpa detail internal
- Output di-escape sesuai konteks
- Query memakai parameterization
- Redirect hanya ke domain/path aman
- File path tidak dikontrol langsung oleh user
```
