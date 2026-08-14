require("dotenv").config();

const app = require("./app");
const pool = require("./config/database");
const http = require("http");
const { Server } = require("socket.io");
const { setIO } = require("./socket");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

setIO(io);

io.on("connection", (socket) => {
  try {
    const token =
      socket.handshake.auth.token;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const userId = decoded.id;

    if (decoded.role === "restaurant_owner") {
      socket.join(`owner_${userId}`);

      console.log(
        `🔌 Owner ${userId} connected`
      );
    }

    if (decoded.role === "student") {
      socket.join(`student_${userId}`);

      console.log(
        `🎓 Student ${userId} connected`
      );
    }

    socket.on("disconnect", () => {
      console.log(
        `❌ User ${userId} disconnected`
      );
    });
  } 
  catch (error) {
  console.log(
    "❌ Socket authentication failed:",
    error.message
  );

  socket.disconnect();
}
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  pool
    .query("SELECT NOW()")
    .then(() => console.log("✅ Connected to Neon PostgreSQL"))
    .catch((err) =>
      console.error("❌ Database connection failed:", err.message)
    );
});