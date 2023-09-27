import { log } from "console";

const EventEmitter = require("events");
const myEmitter = new EventEmitter();

// Increase the maximum number of listeners
myEmitter.setMaxListeners(200);

var express = require("express");
var app = express();
var http = require("http").createServer(app);
var socketIo = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

http.listen(3000, function () {
  console.log("Server Started ...");
});
let counter = 0;
// Define your Socket.IO event listeners here
socketIo.on("connection", function (socket: any) {

  // Example: Sending a message to the client when they connect
  socket.emit("welcome", "Welcome to the server!");

  // Define your custom event listeners for this socket

  socket.on("send", () => {
    const datas = [
      "https://chat.whatsapp.com/Co5vAd3aZTc6HxEOXkGuVx"
    ];
    counter = (counter + 1) % datas.length;
    socket.emit("send__number", datas[counter]);

    // You can emit data back to the client if needed
    // socket.emit("acknowledge", "Data received");
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
