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

## Klik untuk Belajar

| Area | Bug / Output | Halaman |
|---|---|---|
| SQLi indicator | Error database, parameter search/sort/login | [SQL Injection — Theory to Real Case](../../theory-to-real-case/sql-injection.md) |
| SQL error output | Contoh error MySQL/PostgreSQL/SQL Server/etc | [SQL Errors](../../output-encyclopedia/sql-errors.md) |
| XSS | Reflected/stored XSS concept | [XSS — Theory to Real Case](../../theory-to-real-case/xss.md) |
| XSS output context | HTML body, attribute, URL, JavaScript context | [XSS Rendering Context](../../output-encyclopedia/xss-rendering-context.md) |
| Open redirect | next/redirect/returnUrl/callback | [Open Redirect — Theory to Real Case](../../theory-to-real-case/open-redirect.md) |
| Redirect output | Header Location, 301/302/307/308 | [Redirect Headers](../../output-encyclopedia/redirect-headers.md) |
| Path traversal indicator | File parameter/path error indicator | [Path Traversal Indicator](./path-traversal-indicator.md) |
| File exposure | File private terbuka/public URL | [File Exposure](./file-exposure.md) |
| File upload output | URL file, internal path, metadata | [File Upload Output](../../output-encyclopedia/file-upload-output.md) |
| Stack trace/error disclosure | Error internal production | [Stack Trace](../../output-encyclopedia/stack-trace.md) |

## Mulai dari Feature

| Feature ditemukan | Mulai dari sini |
|---|---|
| Search/filter | [Feature Map: Search & Filter](../../feature-map/search-filter.md) |
| Login | [Feature Map: Login](../../feature-map/login.md) |
| Profile input | [Feature Map: Profile](../../feature-map/profile.md) |
| Upload | [Feature Map: Upload](../../feature-map/upload.md) |
| Export/download | [Feature Map: Export & Download](../../feature-map/export-download.md) |

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
