# Token Leaked in Response

Token leaked in response terjadi ketika token sensitif muncul di response yang tidak seharusnya terlihat oleh user atau client tertentu.

## Token yang Perlu Diwaspadai

```txt
- reset password token
- email verification token
- access token user lain
- refresh token
- API key
- invite token
- internal service token
```

## Kapan Curiga

```txt
- response forgot password mengembalikan reset token;
- response register mengembalikan verification token;
- response error menampilkan token;
- response debug menampilkan header Authorization;
- response API mengandung token user lain.
```

## Expected Secure Output

```json
{
  "message": "If the email exists, a reset link will be sent"
}
```

Token dikirim lewat channel aman yang sesuai, bukan dibocorkan sembarangan ke response.

## Suspicious Output

```json
{
  "message": "Reset link generated",
  "reset_token": "[TOKEN]"
}
```

atau:

```json
{
  "debug": {
    "authorization": "Bearer [TOKEN]"
  }
}
```

## Cara Membaca Hasil

| Hasil | Makna |
|---|---|
| Token hanya dikirim ke channel yang sesuai | Kemungkinan aman |
| Reset token muncul di response API | Suspicious |
| Token muncul di stack trace | Sensitive data exposure |
| Token user lain muncul | Serious access control/data exposure issue |

## Evidence

```txt
- endpoint terdampak
- request yang memicu response
- response yang mengandung token
- token disensor
- jelaskan token untuk apa
```

## Recommendation

```txt
- Jangan tampilkan token sensitif di response
- Sensor token di log/error/debug response
- Matikan debug mode production
- Batasi visibility token hanya ke channel yang diperlukan
```
