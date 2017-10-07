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

io.on("connection", function(socket){
	console.log("Connected");

	socket.on("register-rom", function(data) {
		console.log("registed");
	});

	socket.emit("registed", true);

	socket.on("messages", function(data) {
		var msg = [];
		msg.push({
			id: socket.id,
			msg: data
		});
		io.sockets.emit("inbox", JSON.stringify(msg));
	});

	socket.on("typing", function(status) {
		if(status) {
			var msg = [];
			msg.push({
				id: socket.id,
				status: true
			});
			io.sockets.emit("focusin", JSON.stringify(msg));
		} else {
			var msg = [];
			msg.push({
				id: socket.id,
				status: false
			});
			io.sockets.emit("focusin", JSON.stringify(msg));
		}
	});

});

app.get("/", function(request, response) {
	response.render("index");
});