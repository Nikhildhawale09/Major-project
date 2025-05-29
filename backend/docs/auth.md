# 🔐 Authentication

## 1. Email/Password Login
- Endpoint: `POST /api/auth/login`
- Returns JWT on success

## 2. Google Admin Login
- Endpoint: `GET /api/auth/google/callback`
- Only whitelisted admin emails can login via OAuth

## 3. Me Endpoint
- Endpoint: `GET /api/auth/me`
- Requires Bearer Token

## 4. Google OAuth Login (Admin Only)

- Redirect to Google for login:
  - `GET /api/auth/google`
- OAuth Callback handler:
  - `GET /api/auth/google/callback`

### 🔐 Notes:
- Only whitelisted admin emails are allowed
- Token is returned in a secure HTTP-only cookie
- Redirects to `/admin/verify` on success