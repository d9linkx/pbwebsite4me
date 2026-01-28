# Local API Configuration (localhost:4000)

Since you're using a local backend server on port 4000, follow these steps to fix the CORS and authentication issues:

## 1. Current Configuration

Your API is configured to run on:
```
http://localhost:4000/api
```

## 2. Fix CORS on Your Backend Server

You need to configure your backend server (localhost:4000) to allow CORS requests from your frontend (localhost:3000).

### If using Express.js:
```javascript
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:3000', 'http://app.localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

### If using different backend framework:
Add these CORS headers to allow requests from localhost:3000:
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

## 3. Start Both Servers

Make sure both servers are running:
1. **Backend API**: `http://localhost:4000`
2. **Frontend**: `http://localhost:3000`

## 4. Test the Connection

1. **Check if backend is running:**
   ```bash
   curl http://localhost:4000/api/user/me
   ```

2. **Test login first:**
   - Go to `http://localhost:3000/auth`
   - Login with valid credentials
   - Check browser console for auth token

3. **Check authentication:**
   - Open browser console
   - Run: `localStorage.getItem('auth_token')`
   - Should show your JWT token

## 5. Debug Steps

If still getting errors:

1. **Check backend logs** - Look for CORS or authentication errors
2. **Verify token format** - Ensure your API expects `Bearer <token>` format
3. **Test API directly:**
   ```bash
   curl -X GET "http://localhost:4000/api/user/me" \
     -H "Authorization: Bearer YOUR_TOKEN_HERE"
   ```

## 6. Common Issues

- **CORS Error**: Backend not configured for localhost:3000
- **Invalid Token**: Need to login first or token format issue
- **Connection Refused**: Backend server not running on port 4000

## 7. Next Steps

Once CORS is fixed:
1. Restart your Next.js dev server: `npm run dev`
2. Login through the web interface
3. Test the `/me` endpoint

**What's your backend framework?** (Express, Fastify, Django, etc.) I can provide specific CORS configuration for your setup.
