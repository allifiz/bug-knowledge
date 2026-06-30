# Internal Path Leakage

Internal path leakage terjadi ketika aplikasi membocorkan lokasi file/folder internal server.

## Contoh Output

Linux:

```txt
/var/www/app/storage/uploads/file.pdf
```

Windows:

```txt
C:\inetpub\wwwroot\uploads\file.pdf
```

Node.js:

```txt
/app/src/modules/user/user.service.ts:42:13
```

## Kapan Curiga

```txt
- response error menampilkan path file;
- response upload mengembalikan storage_path internal;
- stack trace muncul di production;
- export/download error menampilkan lokasi file server.
```

## Expected Secure Behavior

```txt
User hanya melihat pesan error generic atau URL/file ID yang aman.
```

## Suspicious Behavior

```txt
Response menampilkan struktur folder, nama file internal, atau lokasi kode source.
```

## Evidence

```txt
- request yang memicu leak
- response yang berisi path
- path disensor sebagian jika perlu
- jelaskan apa yang bocor
```

## Recommendation

```txt
- Jangan tampilkan path internal ke user
- Matikan debug mode production
- Gunakan generic error handler
- Return public URL atau file ID yang aman, bukan storage path internal
```
