# Stack Trace

Stack trace adalah detail error internal aplikasi yang kadang bocor ke response.

Bagi developer, stack trace berguna untuk debugging. Bagi user umum, stack trace seharusnya tidak tampil di production karena bisa membocorkan informasi internal.

## Contoh Informasi yang Bisa Bocor

```txt
- framework yang dipakai
- path file server
- nama class/function
- query/database error
- environment variable tertentu
- dependency/library
- versi teknologi
- struktur folder project
```

## Contoh Output PHP/Laravel

```txt
Illuminate\Database\QueryException
```

```txt
SQLSTATE[42S22]: Column not found
```

```txt
/var/www/html/app/Http/Controllers/UserController.php
```

## Contoh Output Node.js/NestJS/Express

```txt
TypeError: Cannot read properties of undefined
```

```txt
at UserService.findOne (/app/src/user/user.service.ts:42:13)
```

```txt
PrismaClientKnownRequestError
```

## Contoh Output Python/Django/Flask

```txt
Traceback (most recent call last):
```

```txt
django.core.exceptions
```

```txt
File "/app/views.py", line 32
```

## Contoh Output Java/Spring

```txt
java.lang.NullPointerException
```

```txt
org.springframework.web
```

```txt
at com.example.app.UserController.getUser
```

## Cara Membaca Hasil

| Output | Kemungkinan Makna |
|---|---|
| Path server muncul | Internal path disclosure |
| Nama framework muncul | Technology disclosure |
| Query error muncul | Database error disclosure |
| Token/secret muncul | Sensitive data exposure, lebih serius |
| Stack trace lengkap muncul | Debug mode/error handling lemah |

## Impact

Stack trace bisa membantu attacker memahami teknologi dan struktur internal aplikasi.

Impact lebih tinggi jika stack trace membocorkan:

```txt
- credential
- API key
- token
- query dengan data sensitif
- path file private
- environment variable
```

## Evidence

```txt
- request yang memicu error
- response error
- bagian stack trace yang relevan
- sensor secret/token jika ada
- jelaskan informasi apa yang bocor
```

## Kapan Layak Report?

Biasanya layak jika:

```txt
- terjadi di production;
- stack trace dapat dipicu oleh user biasa;
- informasi internal cukup detail;
- ada data sensitif atau path/query/framework yang bocor.
```

## Recommendation

```txt
- matikan debug mode di production
- gunakan generic error response
- log detail error hanya di server
- jangan tampilkan stack trace ke user
- sensor data sensitif di error handler
```
