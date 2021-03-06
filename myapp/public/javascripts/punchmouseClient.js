var socket = io.connect("http://localhost:8888");
var client = function () {};
client.prototype.result = [];

socket.on("getTarget", function(data){
    client.objTarget = data;
    console.log(data);
});

socket.on("lvUnlock", function(data){
    client.prototype.lvUnlock = parseInt(data)
});

//receive score from server and update
socket.on("sendScore", function(data){
    PlayLayerGlobal._status.updateLabelScore(parseInt(data));
});

//receive target update
socket.on("updateTarget", function(objData){
    var muoselife = parseInt(objData.LIFEMOUSE);
    PlayLayerGlobal._status.updateMouseTarget(muoselife);
    var diamond = parseInt(objData.DIAMOND);
    PlayLayerGlobal._status.updateDiamondTarget(diamond);
    var combotarget = parseInt(objData.COMBO);
    PlayLayerGlobal._status.updateComboTarget(combotarget);
});
//receive combo in order to show label combo
socket.on("countCombo", function(data){
    var combo = parseInt(data);
    PlayLayerGlobal._status.updateComboLabel(combo);
});
//receive check Win ???
socket.on("checkWin", function(){
    PlayLayerGlobal._status.winGame();
});
//delete label combo
socket.on("delLabelCombo", function(){
    PlayLayerGlobal._status.delLabelCombo();
});
//update mouse Life
socket.on("updateMouseLife", function(data){
    PlayLayerGlobal._status.updateLabelMouseLife(parseInt(data));
});
//listen numbers Star from server
socket.on("getStarAndBestScore", function(data){
    // client.star = parseInt(data.star);
    var lv = parseInt(data.lv);
    var bestScore = parseInt(data.bs);
    var star = parseInt(data.star);
    client.prototype.result.push({lv, bestScore, star});
    // var level = parseInt(data.lv);
    // localStorage.setItem("Star-Lv" + level, parseInt(data.star));
    // localStorage.setItem("BestScore" + level, parseInt(data.bs));
    PlayLayerGlobal._status.addChild(new popupWinLayer(), 5);
});

//event hit: send type hit to server
client.prototype.sendType = function (data) {
    socket.emit('type', data);
};
//send level play
client.prototype.sendLevel = function(data){
    socket.emit("level", data);
    // setCookie("lv", data, 7);
};
//send event miss combo
client.prototype.missCombo = function(){
    socket.emit("missCombo");
};
//send event mouse down
client.prototype.mouseDown = function(){
    socket.emit("mouseDown");
};
//send event reset Game
client.prototype.resetGame = function(data){
    socket.emit("resetGame", data);
};
//send time to play
client.prototype.sendTimePlay = function(data){
    socket.emit("timePlay", data);
};
//Send event go to menu level
client.prototype.gotoLevel = function(){
    socket.emit("go-to-Level");
};
//get Result: get star, get star
client.prototype.getResult = function(lv, arr, str){
    for(let i = 0; i < arr.length; i++){
        if(lv === arr[i].lv){
            if(str == "star"){
                return arr[i].star;
            }else  if(str == "bs"){
                return arr[i].bestScore;
            }
        }
    }
    return null;
}

// client.prototype.setCookie = function(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*1000));
//     var expires = "expires="+ d.toUTCString();
//     document.cookie = cname + "=" + cvalue + "; " + expires;
// }

// client.prototype.getCookie = function(cname) {
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for(var i = 0; i <ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0)==' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length,c.length);
//         }
//     }
//     return "";
// }

var clientInstance = new client();