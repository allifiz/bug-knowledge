# Information Disclosure

Information disclosure terjadi ketika aplikasi membocorkan informasi yang seharusnya tidak diketahui user.

## Tree

```txt
Information Disclosure
├── Excessive response
├── Stack trace
├── Debug mode
├── Internal path leakage
├── Sensitive metadata exposure
├── Token leakage
└── Public private-file
```

## Kapan Curiga

```txt
- response API mengandung field internal;
- error menampilkan stack trace;
- file private bisa diakses publik;
- response upload membocorkan path server;
- token/API key muncul di response;
- data user lain muncul dalam response.
```

## Expected Secure Behavior

```txt
Aplikasi hanya mengembalikan data yang dibutuhkan user dan tidak membocorkan detail internal.
```

## Suspicious Behavior

```txt
Response mengandung data private, token, path internal, role internal, atau stack trace.
```

## Evidence

```txt
- endpoint terdampak
- request normal
- response yang membocorkan informasi
- informasi yang bocor disensor jika sensitif
- impact dari informasi tersebut
```
