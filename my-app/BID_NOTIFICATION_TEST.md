# Bid Notification Test Guide

## 🎯 What We Fixed

1. **Event Name Mismatch**: Changed from `bid_placed` to `bid:placed` (frontend expects colon)
2. **Missing Notification Event**: Added `notification:new` event emission
3. **Data Structure**: Updated event data to match frontend expectations

## 🧪 Testing Steps

### 1. Restart Your Server
```bash
cd prawnbox-backend
npm restart
# or
node index.js
```

### 2. Check Server Console
Look for these logs when server starts:
- `JWT_SECRET loaded: Yes`
- `Backend is running` 
- Socket connection logs

### 3. Test Bid Placement
1. Login to your frontend app
2. Go to available jobs
3. Place a bid on any package
4. Check server console for:
   ```
   📤 bid:placed event emitted to room: user_XXXXX
   📤 notification:new event emitted to room: user_XXXXX
   ```

### 4. Check Frontend
1. Look for notification in UI
2. Check browser console for:
   - `🔔 Dashboard received notification:`
   - Toast notification should appear

## 🔍 Debugging

### If No Server Logs:
- Check if Socket.IO is initialized properly
- Verify the endpoint is being called (`/package/:id/bid/test`)
- Check if user is authenticated

### If No Frontend Notification:
- Verify WebSocket connection (check browser console)
- Check if user joined correct room (`user_{userId}`)
- Verify user IDs match between frontend and backend

### If Events Don't Match:
- Frontend expects: `bid:placed` and `notification:new`
- Server now emits: `bid:placed` and `notification:new` ✅

## 📊 Expected Flow

1. User places bid → `POST /package/123/bid/test`
2. Server creates bid ✅
3. Server emits `bid:placed` to sender's room ✅
4. Server emits `notification:new` to sender's room ✅
5. Frontend receives events ✅
6. Notification appears in UI ✅

## 🎯 Success Indicators

- ✅ Server logs show both events emitted
- ✅ Browser console shows notification received
- ✅ Toast notification appears
- ✅ Notification count increases
- ✅ Notification shows in notification list

## 🚨 Common Issues

1. **Room Mismatch**: Make sure user joins `user_{userId}` room
2. **User ID Mismatch**: Frontend `user.id` should match backend `user._id`
3. **Socket Not Connected**: Check WebSocket connection status
4. **Authentication**: Make sure JWT token is valid

## 🔧 Quick Fix Commands

If something doesn't work, check:
```javascript
// In browser console
console.log('Socket connected:', socketService.isConnected())
console.log('User ID:', user?.id, user?._id)
```

The implementation should now work perfectly! 🎉
