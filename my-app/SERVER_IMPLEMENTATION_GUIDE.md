# Server-Side Bid Notification Implementation

## 🎯 Problem
When bids are placed via the test endpoint `/package/{packageId}/bid/test`, the server creates the bid but doesn't emit socket events to trigger frontend notifications.

## 🔧 Solution
Add socket event emission to your bid test endpoint handler.

## 📁 Implementation

### Step 1: Find Your Bid Test Endpoint
Locate your server file that handles:
```
POST /package/:packageId/bid/test
```

### Step 2: Add Socket Emission
Replace or modify your existing test endpoint with this implementation:

```javascript
// Express.js Example
const express = require('express');
const router = express.Router();

// Bid Test Endpoint with Socket Events
router.post('/package/:packageId/bid/test', async (req, res) => {
  try {
    const { packageId } = req.params;
    const { bidAmount } = req.body;
    
    // 1. Validate input
    if (!bidAmount || bidAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid bid amount'
      });
    }

    // 2. Get package details
    const package = await Package.findById(packageId);
    if (!package) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }

    // 3. Create the bid (your existing logic)
    const newBid = await Bid.create({
      packageId,
      bidderId: req.user.id,
      bidderName: req.user.name || req.user.userName,
      amount: bidAmount,
      status: 'pending',
      createdAt: new Date(),
      // ... other bid fields
    });

    // 4. Get Socket.IO instance
    const io = req.app.get('io');
    if (!io) {
      console.warn('⚠️ Socket.IO not found in app instance');
    }

    // 5. Emit bid:placed event to sender's room
    if (io && package.senderId) {
      const bidEventData = {
        packageId: package.id,
        bidId: newBid.id,
        bidderId: req.user.id,
        bidderName: req.user.name || req.user.userName,
        amount: bidAmount,
        senderId: package.senderId,
        packageTitle: package.title || package.orderNumber || 'Package'
      };

      // Emit to sender's room
      io.to(`user_${package.senderId}`).emit('bid:placed', bidEventData);
      console.log('📤 bid:placed event emitted to room:', `user_${package.senderId}`);

      // Alternative: Also emit notification:new event
      const notificationData = {
        id: `bid-${newBid.id}-${Date.now()}`,
        userId: package.senderId,
        type: 'bid-placed',
        title: 'New Bid Received! 💰',
        message: `${req.user.name || req.user.userName} placed a bid of ₦${bidAmount} for your ${package.title || package.orderNumber}. Review and accept now.`,
        timestamp: new Date().toISOString(),
        read: false,
        actionRequired: true,
        category: 'alert',
        priority: 'urgent',
        actionUrl: `/jobs/${packageId}`
      };

      io.to(`user_${package.senderId}`).emit('notification:new', notificationData);
      console.log('📤 notification:new event emitted to room:', `user_${package.senderId}`);
    }

    // 6. Return success response
    res.json({
      success: true,
      data: newBid,
      message: 'Bid placed successfully'
    });

  } catch (error) {
    console.error('❌ Error placing bid:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to place bid',
      error: error.message
    });
  }
});
```

### Step 3: Ensure Socket.IO is Available
Make sure Socket.IO is initialized in your main server file:

```javascript
// server.js or app.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Make io available to routes
app.set('io', io);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);

  // Join user-specific room
  socket.on('join-room', (room) => {
    socket.join(room);
    console.log('🔌 User joined room:', room);
    
    // Confirm room join
    socket.emit('room-joined', room);
  });

  socket.on('leave-room', (room) => {
    socket.leave(room);
    console.log('🔌 User left room:', room);
  });

  socket.on('disconnect', () => {
    console.log('🔌 User disconnected:', socket.id);
  });
});

// Your routes...
app.use('/api', require('./routes'));

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

### Step 4: User Authentication
Make sure your middleware sets `req.user`:

```javascript
// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Apply to bid endpoint
router.post('/package/:packageId/bid/test', authenticateToken, async (req, res) => {
  // ... implementation from above
});
```

## 🧪 Testing

1. Start your server
2. Place a bid via the frontend
3. Check server console for:
   - `📤 bid:placed event emitted to room: user_XXXXX`
   - `📤 notification:new event emitted to room: user_XXXXX`
4. Check browser console for notification logs
5. Verify notification appears in UI

## 🔍 Debugging

If notifications don't appear:

1. **Check Server Logs**: Look for the emission logs
2. **Check Room Joining**: Verify users join `user_{userId}` rooms
3. **Check Socket Connection**: Verify WebSocket is connected
4. **Check User IDs**: Ensure senderId matches the logged-in user's ID

## 📝 Notes

- The frontend expects both `bid:placed` and `notification:new` events
- User IDs should match between frontend and backend
- Socket.IO must be properly initialized before routes
- Room names must be exactly `user_{userId}` format

## ✅ Expected Result

After implementation:
1. User places bid
2. Server creates bid ✅
3. Server emits socket events ✅ 
4. Frontend receives events ✅
5. Notification appears in UI ✅
