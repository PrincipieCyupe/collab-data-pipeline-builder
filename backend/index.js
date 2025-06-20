import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import pkg from "pg";

dotenv.config();
const { Pool } = pkg;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// PostgreSQL setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.get("/pipelines/:userId", async (req, res) => {
  const { userId } = req.params;
  const { rows } = await pool.query("SELECT data FROM pipelines WHERE user_id = $1", [userId]);
  res.json(rows[0] || { data: null });
});

app.post("/pipelines/:userId", async (req, res) => {
  const { userId } = req.params;
  const { data } = req.body;
  await pool.query(
    "INSERT INTO pipelines (user_id, data) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET data = $2",
    [userId, data]
  );
  res.json({ success: true });
});

// Real-time collaboration
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("join", (room) => socket.join(room));

  socket.on("update", ({ room, data }) => {
    socket.to(room).emit("update", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`🚀 Backend running on http://localhost:${port}`);
});

