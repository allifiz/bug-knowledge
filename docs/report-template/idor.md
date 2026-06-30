# IDOR Report Template

```md
# IDOR on [Resource Name] Endpoint

## Summary
The application allows a user to access a resource owned by another user by changing the resource identifier.

## Affected Endpoint
GET /api/invoices/{invoice_id}

## Accounts Used
- Account A: resource owner
- Account B: unauthorized user

## Steps to Reproduce
1. Login as Account A.
2. Create or open a resource owned by Account A.
3. Capture the resource ID.
4. Login as Account B.
5. Send a request to the same resource ID using Account B session/token.
6. Observe that Account B can access Account A's resource.

## Expected Behavior
Account B should receive `403 Forbidden`, `404 Not Found`, or a response without Account A's data.

## Actual Behavior
Account B receives `200 OK` and the response contains Account A's resource data.

## Evidence
### Request as Account B
```http
GET /api/invoices/991
Authorization: Bearer [ACCOUNT_B_TOKEN]
```

### Response
```json
{
  "invoice_id": 991,
  "owner_email": "[REDACTED]",
  "amount": 500000
}
```

## Impact
An unauthorized user may access sensitive data belonging to another user.

## Recommendation
Validate that the authenticated user owns the requested resource before returning the response.
```
