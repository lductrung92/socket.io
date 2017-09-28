var express = require("express");
var http = require("http");
var socketIO = require("socket.io");

var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = http.Server(app);
var io = socketIO(server);

server.listen(2808, function() {
	console.log("server listen port 2808");
});

app.get("/", function(request, response) {
	response.render("index");
});