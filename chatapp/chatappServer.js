var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
// Listen application request on port 3000
http.listen(3000, function(){
    console.log('listening on *:3000');
});

var arrUsername = [];

var run = function(socket){
    console.log("A User connect..." + socket.id);
    //listen client send username
    socket.on("client-send-UserName", function(data){
        console.log(data);
        if(arrUsername.indexOf(data) >= 0){
            socket.emit("Fail-Register");
        }else{
            arrUsername.push(data);
            socket.UserName = data;
            socket.emit("Register-Success", data);
            //send for all user
            io.sockets.emit("Server-List_UserOnline", arrUsername);
        }
    });
    //listen user on
    socket.on("Logout", function(){
        arrUsername.splice(arrUsername.indexOf(socket.UserName), 1);
        socket.broadcast.emit("A-User-Logout", arrUsername);
    });
    //liset user send message
    socket.on("user-send-message", function(data){
        console.log(data);
        io.sockets.emit("server-send-message", {un: socket.UserName, nd: data});
    });
    // send notication a user typing
    socket.on("Client-A-user-type", function(){
        var str = socket.UserName + " Typing...";
        socket.broadcast.emit("Server-A-user-typing", str);
    });
    //send notication stop typing
    socket.on("Client-User-stop type", function(){
        console.log(socket.UserName + " Stop typing...");
        socket.broadcast.emit("Server-Stop-typing");
    });
};

io.on("connection", run);

app.get("/", function(req, res){
    res.render("index");
});