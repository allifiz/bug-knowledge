# Feature Map: Search & Filter

Search dan filter sering terlihat sederhana, tapi penting karena input user biasanya dipakai untuk mengambil data dari database dan ditampilkan kembali ke halaman.

## Endpoint Pattern

```txt
GET /search?q=
GET /api/products?search=
GET /api/orders?status=
GET /api/users?sort=
GET /api/report?from=&to=
```

Parameter umum:

```txt
q
search
keyword
filter
status
category
sort
order
order_by
from
to
page
limit
```

## Bug yang Mungkin Relevan

```txt
Input Validation
├── SQLi indicator
├── Reflected XSS
├── Error disclosure
├── Sort/order injection concept
└── Type confusion / invalid parameter handling

Information Disclosure
├── Excessive response
├── Debug error
└── Stack trace
```

## Test Aman Awal

### 1. SQL error indicator

Payload deteksi ringan:

```txt
'
```

Expected secure output:

```json
{
  "data": [],
  "message": "No data found"
}
```

atau:

```json
{
  "message": "Invalid search input"
}
```

Suspicious output:

```txt
You have an error in your SQL syntax
ERROR: syntax error at or near
Unclosed quotation mark
SQLite Error: near
```

Lanjut baca: [SQL Injection — Dari Teori ke Real Case](../theory-to-real-case/sql-injection.md).

### 2. Reflected XSS indicator

Payload deteksi aman:

```txt
"><test-xss>
```

Expected secure output:

```html
&lt;test-xss&gt;
```

Suspicious output:

```html
<div class="search-result">"><test-xss></div>
```

### 3. Sort/order parameter behavior

Parameter seperti ini menarik:

```txt
sort=name
order_by=created_at
```

Expected secure output:

```txt
Hanya field sort yang diizinkan yang diproses.
```

Suspicious output:

```txt
Unknown column
column does not exist
Incorrect syntax near
```

Kemungkinan:

```txt
Sort/order parameter masuk ke query secara tidak aman atau error database bocor.
```

## Evidence

```txt
- Request normal
- Request test
- Response normal
- Response error/suspicious
- Parameter terdampak
- Screenshot jika input dirender di HTML
```
