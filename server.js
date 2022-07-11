const fs = require("fs");
const cors = require("cors");
const https = require("https");
const express = require("express");
const { Server } = require("socket.io");
const app = express();

require("dotenv").config();

const { SERVER_HOST, SERVER_PORT, CERT, KEY } = process.env;

// ###########################
// #      server config      #
// ###########################
const serverConfig = {
  key: fs.readFileSync(__dirname + "/" + KEY),
  cert: fs.readFileSync(__dirname + "/" + CERT),
};

// ##################################
// #      socket server config      #
// ##################################
const socketServerConfig = {
  cors: {
    origin: `*`,
  },
};

// ###########################################
// #      create server & socket server      #
// ###########################################
const server = https.createServer(serverConfig, app);
const io = new Server(server, socketServerConfig);

// #############################
// #      server settings      #
// #############################
app.use(cors());
app.use(express.json());
app.use("/", (req, res) => {
  res.send("server test");
});

server.listen(SERVER_PORT, () => {
  console.log(`listening on https://${SERVER_HOST}:${SERVER_PORT}`);
});

// ####################################
// #      socket server settings      #
// ####################################
let roomList = {};
io.on("connection", (socket) => {
  // room id 저장 변수
  let room = "";

  const roomCount = (list) => list[room].length;

  // user 참여
  socket.on("join", (msg) => {
    // room id 받아 저장
    room = msg;

    // roomList가 없으면 빈 배열 할당
    if (!roomList[room]) {
      roomList[room] = [];
    }

    const check = consoleCheck(room, socket.id, roomCount);
    // roomList의 해당 방에 유저 소켓아이디가 없으면 추가
    if (roomList[room].indexOf(socket.id) === -1) {
      roomList[room].push(socket.id);
    }

    // 확인 콘솔
    consoleCheck.log(room, socket.id, "IN");
    consoleCheck.log(room, socket.id, roomCount);

    // room에 socket을 join시킴
    socket.join(room);
    // 해당 방의 본인 외 모두에게 메세지 날림
    socket.broadcast.to(room).emit("message", check);

    // 본인에게 메세지
    io.emit("userInRoom", roomList[room].length);
    // 본인 외 모두에게 메세지
    socket.broadcast.to(room).emit("userInRoom", roomList[room].length);
  });

  // offer, answer, icecandidate 교환
  socket.on("message", (message) => {
    // icecandidate 등 교환
    socket.broadcast.to(room).emit("message", message);
  });

  // 영상 끊어졌을 때
  socket.on("disconnect", () => {
    consoleCheck.log(room, socket.id, 2);
    roomList[room] = roomList[room].filter(
      (socketId) => socketId !== socket.id
    );

    socket.broadcast.to(room).emit("userInRoom", roomList[room].length);
  });
});

const MESSAGE = new (function (TYPES) {
  const root = this;
  TYPES.map((_, __) => (root[(root[_] = __)] = _));
})(["JOIN", "IN", "OUT"]);

function consoleCheck(roomId, userId, message) {
  if (typeof message !== "function") {
    return `room:${roomId} / user-id:${userId} / [${MESSAGE[message]}]`;
  } else {
    return `room:${roomId} / user-id:${userId} / [total-users: ${message(
      roomList
    )}]`;
  }
}

consoleCheck.log = function (roomId, userId, message) {
  if (typeof message !== "function") {
    console.log(`room:${roomId} / user-id:${userId} / [${MESSAGE[message]}]`);
  } else {
    console.log(
      `room:${roomId} / user-id:${userId} / [total-users: ${message(roomList)}]`
    );
  }
};

// openssl ecparam -out rootca.key -name prime256v1 -genkey
// openssl req -new -sha256 -key rootca.key -out rootca.csr
// openssl x509 -req -sha256 -days 999999 -in rootca.csr -signkey rootca.key -out rootca.crt
