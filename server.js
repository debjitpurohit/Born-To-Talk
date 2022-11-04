const express = require("express");
const path= require("path");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server); // socket.ioin server
const port = process.env.PORT || 5001; // have to use like this for heroku app
app.use(express.static(path.join(__dirname, "/public")));
io.on("connection", (socket) => {
    socket.on("newuser", function(username) {
        socket.broadcast.emit("update", username +" joined the conversation");
    });
    socket.on("exituser", function(username) {
        socket.broadcast.emit("update", username +" left the conversation");
    });
    socket.on("chat", function(message) {
        socket.broadcast.emit("chat", message);
    });

    });
server.listen(port, () => console.log(`Listening on port ${port}`)); // for heroku app
