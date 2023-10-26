import { log } from "console";

const EventEmitter = require("events");
const myEmitter = new EventEmitter();
const cors = require("cors");
const bodyParser = require("body-parser"); // Import the body-parser module

// Increase the maximum number of listeners
myEmitter.setMaxListeners(200);
var express = require("express");
var app = express();
var http = require("http").createServer(app);
app.use(cors());
app.use(bodyParser.json());

const socketIo = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"], // Add the HTTP methods you intend to use
  },
});

const router = express.Router();

// Define a POST route
let data: any;
router.post("/send", (req: any, res: any) => {
  // Handle the POST request here
  data = req.body.links.map((item: any) => item.link); // You can access the request data from req.body
  // Perform some actions based on the request data
  // For example, you can emit a socket event here

  // Send a response back to the client
  res.json({ message: "POST request received successfully" });
});
app.use("/api", router);

let currentIndex = 0;
// Define your Socket.IO event listeners here
socketIo.on("connection", function (socket: any) {
  if (data) {
    console.log(data[currentIndex]);
    
    socket.emit("send__links", data[currentIndex]);
    currentIndex = (currentIndex + 1) % data.length;
  }
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
http.listen(3000, function () {
  console.log("Server Started ...");
});
