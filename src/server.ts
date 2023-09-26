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
      "https://wa.me/919863771515",
      "https://wa.me/916009358837",
      "https://wa.me/919366570296",
      "https://wa.me/918787341056",
      "https://wa.me/+919366395692",
      "https://wa.me/+918837058351",
      "https://wa.me/+918787341056",
      "https://wa.me/+919863970982",
      "https://wa.me/916009417168",
      "https://wa.me/919863436782",
      "https://wa.me/+918837035599",
      "https://wa.me/918837373371",
      "https://wa.me/916009222381",
      "https://wa.me/918787741070",
      "https://wa.me/919366936594",
      "https://wa.me/+916009885639",
      "https://wa.me/+916009569499",
      "https://wa.me/+917005759591",
      "https://wa.me/+916009928026",
      "https://wa.me/+917005955913",
      "https://wa.me/+919366341553",
      "https://wa.me/+917005810975",
      "https://wa.me/+916009626040",
      "https://wa.me/+919366456244",
      "https://wa.me/+918119060528",
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
