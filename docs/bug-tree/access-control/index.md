# Access Control

Access control adalah aturan yang menentukan siapa boleh mengakses data atau aksi tertentu.

Bug access control terjadi ketika user bisa membaca, mengubah, menghapus, atau menjalankan aksi yang seharusnya tidak boleh dilakukan.

## Tree

```txt
Access Control
├── IDOR / BOLA
│   ├── Read object
│   │   ├── User profile
│   │   ├── Invoice
│   │   ├── Order
│   │   ├── File download
│   │   └── Ticket/support case
│   │
│   ├── Write object
│   │   ├── Update profile user lain
│   │   ├── Update address user lain
│   │   ├── Cancel order user lain
│   │   └── Delete file user lain
│   │
│   └── Action-level object access
│       ├── Approve request
│       ├── Cancel transaction
│       ├── Resend invoice
│       └── Change status
│
├── Vertical Privilege
│   ├── User akses endpoint admin
│   ├── User ubah role sendiri
│   └── Staff akses fitur superadmin
│
└── Identifier Weakness
    ├── Sequential ID
    ├── Encoded ID
    ├── UUID tapi authorization lemah
    └── GraphQL global ID
```

## Kapan Curiga

Curiga jika endpoint:

```txt
- punya ID resource;
- mengembalikan data user tertentu;
- punya aksi update/delete/cancel/approve;
- punya role admin/staff/user;
- memakai URL download file;
- response berbeda antar akun.
```

## Expected Secure Behavior

```txt
User hanya bisa mengakses resource miliknya sendiri.
User biasa tidak bisa menjalankan aksi admin.
Server memvalidasi permission di backend, bukan hanya menyembunyikan tombol di frontend.
```

## Suspicious Behavior

```txt
Akun B bisa membaca data akun A.
Akun B bisa mengubah data akun A.
User biasa bisa mengakses endpoint admin.
User bisa mengubah role/is_admin dari request body.
```
