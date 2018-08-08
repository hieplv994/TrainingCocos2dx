var socket = io("http://localhost:3000/");

$(document).ready(function(){
    $("#loginForm").show();
    $("#chatForm").hide();
    $("#btnRegister").click(function(){
        console.log($("#txtUserName").val());
        socket.emit("client-send-UserName", $("#txtUserName").val());
    });
    $("#btnLogout").click(function(){
        $("#chatForm").hide(2000);
        $("#loginForm").show(1000);
        socket.emit("Logout");
    });
    $("#btnSend").click(function(){
        //send value to server
        socket.emit("user-send-message", $("#txtMessage").val());
        //clear text inbox
        $("#txtMessage").val("");
    });

    $("#txtMessage").focusin(function(){
        socket.emit("Client-A-user-type");
    });
    $("#txtMessage").focusout(function(){
        socket.emit("Client-User-stop type");
    });
});


//register fail
socket.on("Fail-Register", function(){
    alert("Đăng kí thất bại nhá baby ! hãy dùng tên khác đi cưng ;)");
});

//register success
socket.on("Register-Success", function(data){
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
})

//listen list user online from server
socket.on("Server-List_UserOnline", function(data){
    $("#boxContent").html("");
    data.forEach(function(i){
        $("#boxContent").append("<div class='user'>" + i + "</div>");
    });
});

//listen update list user online
socket.on("A-User-Logout", function(data){
    console.log(data);
    $("#boxContent").html("");
    data.forEach(function(i){
        $("#boxContent").append("<div class='user'>" + i + "</div>");
    });
});
//listen server send message
socket.on("server-send-message", function(data){
    $("#listmessage").append("<div class='ms'>" + data.un + ": "+ data.nd + "</div>");
});

//listen user typing
socket.on("Server-A-user-typing", function(data){
    $("#notication").html("<img width='40' height='20' src='/images/giphy.gif'>" + data);
    // $("#notication").html(data);
});

//listen user typing
socket.on("Server-Stop-typing", function(){
    $("#notication").html("");
});

// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }




