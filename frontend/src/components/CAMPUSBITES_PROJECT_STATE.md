# CampusBites

CampusBites is a campus food ordering platform.

Users:
- Students
- Restaurant Owners

Stack:
- React + Vite frontend
- Node.js + Express backend
- PostgreSQL (Neon)
- JWT Authentication
- Socket.IO for real-time features


## Student Features

✅ Student Registration
✅ Student Login
✅ Restaurant Listing
✅ Restaurant Details
✅ Menu Browsing
✅ Cart
✅ Checkout
✅ Order History
✅ Order Details
✅ Real-time Order Status Updates

## Restaurant Owner Features

✅ Owner Login
✅ Dashboard
✅ Restaurant Management
✅ Menu Categories
✅ Menu Items
✅ Combo Packages
✅ Order Management
✅ Real-time Notifications

## Backend

✅ JWT Authentication
✅ Role-Based Authorization
✅ PostgreSQL
✅ Socket.IO
✅ Owner Rooms
✅ Student Rooms


Repository:
https://github.com/John7292688/campusbites

Current Stable Tag:
v0.7-realtime-notifications


Authentication:

Student Token:
localStorage["token"]

Owner Token:
localStorage["ownerToken"]

Socket.IO:

Owner Room:
owner_{ownerId}

Student Room:
student_{studentId}



### Real-Time Notifications

Completed:

- Owner receives instant notifications for new orders.
- Student receives instant order status updates.
- Order status changes update without page refresh.



### Needs Refactor

Socket creation is currently done inside components.

Files:
- MyOrders.jsx
- Topbar.jsx

Future improvement:
Create SocketContext.jsx and maintain one socket per user session.



Priority 1:
Customer Notification Center

Examples:
- Order is being prepared
- Order is ready
- Order is out for delivery
- Order delivered

Priority 2:
Analytics Dashboard

Priority 3:
Payment Integration
(Paystack)



User preference:

- Work one task at a time.
- Never skip steps.
- Give exact code replacements.
- Explain exactly where to paste code.
- Do not jump ahead.



## Last Completed Milestone

Tag:
v0.7-realtime-notifications

Completed:
- Real-time owner notifications
- Real-time student order status updates
- Socket.IO integration
- JWT-authenticated sockets
- Owner rooms
- Student rooms

Verified:
- Tested after restart
- Tested with owner and student accounts
- Updates occur instantly without refresh