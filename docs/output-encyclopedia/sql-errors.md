# SQL Error Encyclopedia

Halaman ini membantu pemula mengenali bentuk umum error database.

Catatan:

```txt
Munculnya error database bukan otomatis SQL Injection valid.
Tapi ini adalah sinyal kuat bahwa input menyentuh query atau error handling aplikasi buruk.
```

## MySQL / MariaDB

```txt
You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version
```

```txt
SQLSTATE[42000]: Syntax error or access violation
```

```txt
mysqli_sql_exception
```

```txt
Warning: mysql_fetch_array()
```

```txt
Warning: mysql_num_rows()
```

```txt
Unknown column
```

```txt
Truncated incorrect INTEGER value
```

## PostgreSQL

```txt
ERROR: syntax error at or near "'"
```

```txt
unterminated quoted string at or near
```

```txt
pg_query(): Query failed
```

```txt
invalid input syntax for type integer
```

```txt
column does not exist
```

## SQL Server

```txt
Unclosed quotation mark after the character string
```

```txt
Incorrect syntax near
```

```txt
Microsoft OLE DB Provider for SQL Server
```

```txt
Conversion failed when converting the varchar value
```

## Oracle

```txt
ORA-01756: quoted string not properly terminated
```

```txt
ORA-00933: SQL command not properly ended
```

```txt
ORA-00936: missing expression
```

## SQLite

```txt
SQLite Error: near "'": syntax error
```

```txt
SQLite3::SQLException
```

```txt
unrecognized token
```

## Cara Membaca

| Output | Kemungkinan Makna |
|---|---|
| syntax error | Query rusak karena input tertentu |
| unknown column | Input mungkin masuk ke bagian column/sort/order |
| invalid integer | Parameter angka menerima input non-angka |
| unclosed quotation | Quote tidak ditangani dengan benar |
| SQLSTATE | Error database/driver bocor ke response |

## Apa yang Dilakukan Jika Muncul

```txt
1. Simpan request normal.
2. Simpan request yang memicu error.
3. Simpan response error.
4. Catat parameter terdampak.
5. Jangan lanjut ke dumping database.
6. Tulis report sesuai bukti: SQLi indicator atau database error disclosure.
```
