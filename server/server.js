import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import env from "dotenv";
env.config();
import apiRoutes from "./api-routes/index.js";
import leaveRoom from "./utils/leave-room.js";
import "./helpers/db.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const PORT = 3000;

app.use(
  cors({
    //   // どこからのアクセスを許可するか。オリジン(スキーマ、ドメイン、ポート)を記す。
    origin: "http://localhost:5173",
    //   // どのメソッドを許可するかは配列で記述。書かない場合は全て通す。
    methods: ["GET", "POST", "PUT", "DELETE"],
    //   // クッキーを残すかどうか
    credentials: true,
  })
);
app.use(express.json());
app.use("/", apiRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/index.html");
  console.log("connected!!!");
});

const CHAT_BOT = "ChatBot";
let chatRoom = ""; // E.g. javascript, node,...
let allUsers = []; // All users in current chat room

// Listen for when the client connects via socket.io-client
io.on("connection", (socket) => {
  // Add a user to a room
  socket.on("join_room", (data) => {
    const { username, room } = data;
    socket.join(room);

    let __createdtime__ = Date.now();
    // Send message to all users currently in the room, apart from the user that just joined
    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });

    // Send welcome msg to user that just joined chat only
    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });

    // Save the new user to the room
    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    let chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);
  });

  socket.on("send_message", (data) => {
    const { username, room, message, __createdtime__ } = data;
    // console.log(data);

    io.in(room).emit("receive_message", data);

    // axios
    //   .post("http://localhost:3000/chat", data)
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  });

  socket.on('leave_room', (data) => {
    const { username, room } = data;
    socket.leave(room);
    const __createdtime__ = Date.now();
    // Remove user from memory
    allUsers = leaveRoom(socket.id, allUsers);
    socket.to(room).emit('chatroom_users', allUsers);
    socket.to(room).emit('receive_message', {
      username: CHAT_BOT,
      message: `${username} has left the chat`,
      __createdtime__,
    });
    console.log(`${username} has left the chat`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from the chat');
    const user = allUsers.find((user) => user.id == socket.id);
    console.log(socket.id)
    if (user?.username) {
      allUsers = leaveRoom(socket.id, allUsers);
      socket.to(chatRoom).emit('chatroom_users', allUsers);
      socket.to(chatRoom).emit('receive_message', {
        message: `${user.username} has disconnected from the chat.`,
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
