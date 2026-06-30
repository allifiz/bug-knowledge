# Template Standar Materi Bug

Gunakan template ini ketika menambahkan halaman bug baru.

Tujuannya supaya semua materi konsisten, ramah pemula, dan tetap berguna untuk pembaca yang sudah lebih expert.

## Struktur Wajib

```md
# Nama Bug

Ringkasan singkat dalam bahasa sederhana.

Contoh sederhana:

```txt
Jelaskan bug ini dengan skenario pendek.
```

## Tool Level

| Kebutuhan | Jawaban |
|---|---|
| Bisa tanpa Burp? | Ya / Tidak / Sebagian |
| Minimal tools | Browser / DevTools / API Client |
| Disarankan | DevTools Network / API Client / Proxy Tool |
| Proxy tool | Wajib / Opsional / Tidak perlu |
| Butuh akun testing? | Satu akun / Dua akun / Role berbeda / Tidak selalu |

## Kapan Curiga

```txt
- Sinyal awal 1
- Sinyal awal 2
- Sinyal awal 3
```

## Endpoint / Feature yang Relevan

```txt
GET /api/example/{id}
POST /api/example
PATCH /api/example/{id}
```

## Cara Mencoba Secara Aman

### Mode 1 — Browser biasa

```txt
1. Langkah verbal dari nol.
2. Jelaskan apa yang diklik/dibuka.
3. Jelaskan apa yang harus diamati.
```

### Mode 2 — DevTools Network

```txt
1. Buka DevTools → Network.
2. Jalankan aksi normal.
3. Klik request yang relevan.
4. Lihat status code, payload, dan response.
```

### Mode 3 — API Client / Proxy

```txt
1. Copy request normal.
2. Ubah hanya bagian yang diuji.
3. Kirim request secara terbatas.
4. Simpan request dan response.
```

## Request Normal

```http
GET /api/example/123
Authorization: Bearer token-akun-sendiri
```

## Request Test

```http
GET /api/example/456
Authorization: Bearer token-akun-sendiri
```

## Expected Secure Output

```txt
Jelaskan output yang aman.
```

## Suspicious Output

```txt
Jelaskan output yang mencurigakan.
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Output aman | Kemungkinan aman |
| Output berbeda | Perlu analisis |
| Output mencurigakan | Potensi bug |

## Evidence yang Perlu Disimpan

```txt
- Request normal
- Request test
- Response normal
- Response test
- Status code
- Screenshot jika perlu
- Data sensitif sudah disensor
```

## Kapan Harus Stop

```txt
- Jangan akses data user asli
- Jangan request massal
- Jangan melakukan aksi destructive
- Jangan mengambil token/cookie/data sensitif
- Cukup validasi impact minimal
```

## Recommendation

```txt
- Saran fix 1
- Saran fix 2
- Saran fix 3
```
```

## Prinsip Penulisan

```txt
- Gunakan bahasa Indonesia yang jelas.
- Jelaskan seolah pembaca belum paham tools.
- Jangan hanya menulis payload.
- Selalu jelaskan expected output dan suspicious output.
- Selalu tulis kapan harus berhenti.
- Hindari instruksi eksploitasi lanjutan seperti dump database, brute force, atau mengambil data user lain.
```

## Level Tools yang Dipakai

| Label | Makna |
|---|---|
| Browser | Bisa dicoba dari UI/browser biasa |
| DevTools | Butuh melihat request/response dari Network tab |
| API Client | Lebih nyaman pakai Postman/Insomnia/curl |
| Proxy Tool | Lebih nyaman pakai Burp/Caido/ZAP |

## Format Evidence

Evidence harus membantu reviewer memahami bug tanpa membocorkan data sensitif.

```txt
- Sensor token/cookie
- Sensor email/nomor telepon/alamat jika perlu
- Jangan lampirkan data user lain
- Gunakan akun testing sendiri
- Tunjukkan before/after hanya seperlunya
```
