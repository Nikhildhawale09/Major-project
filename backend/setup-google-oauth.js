/**
 * Google OAuth Setup Guide
 * 
 * This script guides you through setting up Google OAuth for your application.
 */

console.log(`
====================================================
            GOOGLE OAUTH SETUP GUIDE
====================================================

Follow these steps to set up Google OAuth for your application:

1. Create a project in the Google Cloud Console
   - Go to https://console.cloud.google.com/
   - Create a new project or select an existing one

2. Enable APIs and Services
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" or "Google Identity" and enable it

3. Configure OAuth Consent Screen
   - Go to "APIs & Services" > "OAuth consent screen"
   - Choose "External" user type
   - Fill in the required information (App name, support email, etc.)
   - Add scopes: .../auth/userinfo.email, .../auth/userinfo.profile
   - Add your email as a test user

4. Create OAuth 2.0 Credentials
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Select "Web application" as the application type
   - Add a name for your OAuth client
   - Add authorized JavaScript origins (e.g., http://localhost:5173)
   - Add authorized redirect URIs (e.g., http://localhost:5000/api/auth/google/callback)

5. Get your Client ID and Secret
   - After creating credentials, Google will display your Client ID and Secret
   - Copy these values

6. Add these values to your .env file
   - Create or update your .env file with the following:

GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:5173

7. Restart your server
   - Stop and restart your Node.js server to apply the changes

====================================================

After completing these steps, Google OAuth should work in your application.
Users will be able to log in with their Google accounts.

====================================================
`); 