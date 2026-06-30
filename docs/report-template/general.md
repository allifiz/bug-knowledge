# General Report Template

Gunakan template ini sebagai dasar report bug bounty.

```md
# [Judul Vulnerability]

## Summary
Jelaskan bug secara singkat dan jelas.

## Affected Asset
- Domain/API:
- Endpoint:
- Parameter/field:
- Account/role used:

## Steps to Reproduce
1. Login sebagai akun testing.
2. Buka fitur terkait.
3. Kirim request normal.
4. Kirim request test.
5. Amati perbedaan response.

## Expected Behavior
Jelaskan output aman yang seharusnya terjadi.

## Actual Behavior
Jelaskan output yang benar-benar terjadi.

## Evidence
- Request normal
- Response normal
- Request test
- Response test
- Screenshot jika diperlukan

## Impact
Jelaskan dampak terhadap confidentiality, integrity, availability, atau business logic.

## Recommendation
Jelaskan saran perbaikan secara ringkas.
```

## Tips

```txt
- Jangan masukkan data sensitif mentah.
- Sensor email, token, alamat, nomor telepon, invoice, dan data pribadi.
- Report harus bisa direproduksi.
- Jangan berlebihan mengklaim impact.
- Jelaskan batas testing yang kamu lakukan.
```
