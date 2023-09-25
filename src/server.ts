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
  console.log("A user connected");

  // Example: Sending a message to the client when they connect
  socket.emit("welcome", "Welcome to the server!");

  // Define your custom event listeners for this socket

  socket.on("send", () => {
    console.log(counter);
    const datas = [
      "https://wa.me/+919556316819",
      "https://wa.me/+916009626040",
      "https://wa.me/+916009967624",
      "https://wa.me/+916009779710",
      "https://wa.me/+919366586938",
      "https://wa.me/+918414862274",
      "https://wa.me/+919366315089",
      "https://wa.me/+919863764531",
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
