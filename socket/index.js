const { Server } = require("socket.io");

const io = new Server(8000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("user connected");
});
