var express = require('express');
app = express();
var path = require('path');
var session = require('express-session');
// var cookieParser = require('cookie-parser');
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 1000*60*60*24*7}}));

server = require('http').Server(app);
var io = require('socket.io').listen(server);
server.listen(8888, function(){
    console.log("Port 8888 listening....");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

var levelUnlock = 1;
var result = [];
var arrTargetforLevel = [];
var arrBestSocre = [];
for(let i = 1; i < 16; i++){
    var numberLevel = i;
    var lifeMouse = 10 + i - 1;
    var combo = 2 + i - 1;
    var diamond = 0 + i - 1;
    var bestScore = 0;
    arrTargetforLevel.push({numberLevel, lifeMouse, combo, diamond});
    arrBestSocre.push({numberLevel, bestScore});
}

var checkBestScore = function(arr, socre, lv){
    for(let j = 0; j < arr.length; j++){
        if(arr[j].numberLevel == lv){
            if(arr[j].bestScore == 0 || arr[j].bestScore <= score){
                arr[j].bestScore = socre;
                return socre;
            }else if(arr[j].bestScore > socre){
                return arr[j].bestScore;
            }
        }
    }
    return 0;
};

var run =  function(socket){
    var mouselifeDefault = 100;
    var score = 0;
    var level = 0;
    var objTarget = {
        LIFEMOUSE: 10,
        COMBO: 2,
        DIAMOND: 0
    };
    console.log("A user connect " + socket.id);
    //send target for level
    socket.emit("getTarget", arrTargetforLevel);
    //send lv unlock
    socket.on("go-to-Level", function(){
        socket.emit("lvUnlock", levelUnlock);
    });

    var countCombo = 0;
    socket.on("type", function(data){
        console.log(data);
        if(data == "Mouse"){
            score += 20;
            if(objTarget.LIFEMOUSE > 0){
                objTarget.LIFEMOUSE--;
            }
            
            countCombo++;
            if(countCombo >= 2 && objTarget.COMBO > 0){
                objTarget.COMBO--;
            }
        }else if(data == "Old"){
            score -= 15;
        }else if(data == "Diamond"){
            score += 35;
            if(objTarget.DIAMOND > 0){
                objTarget.DIAMOND--;
            }
        }
        console.log("Score: " + score);
        socket.emit("sendScore", score);
        socket.emit("updateTarget", objTarget);
        console.log(objTarget);
        socket.emit("countCombo", (countCombo - 1));
        console.log("combo: " + (countCombo - 1));

        if(objTarget.LIFEMOUSE == 0){
            if(objTarget.COMBO == 0 && objTarget.DIAMOND == 0){
                socket.emit("checkWin");
                levelUnlock++;
            }
        }
    });
    //count down mouse life
    socket.on("mouseDown", function(){
        mouselifeDefault--;
        socket.emit("updateMouseLife", mouselifeDefault);
    });
    //listen miss combo event
    socket.on("missCombo", function(){
        countCombo = 0;
        socket.emit("delLabelCombo");
    });
    //listen event reset game
    socket.on("resetGame", function(data){
        var lv = parseInt(data);
        //reset targer
        objTarget.LIFEMOUSE = 10;
        objTarget.COMBO = 2;
        objTarget.DIAMOND = 0;
        countCombo = 0;
        score = 0;
        //current target
        objTarget.LIFEMOUSE += lv - 1;
        objTarget.COMBO += lv - 1;
        objTarget.DIAMOND += lv - 1;
    });

    // listen event send level
    socket.on("level", function(data){
        //restart target and count combo
        objTarget.LIFEMOUSE = 10;
        objTarget.COMBO = 2;
        objTarget.DIAMOND = 0;
        countCombo = 0;
        score = 0;

        level = data;
        console.log("Lv: " + level);
        objTarget.LIFEMOUSE += level - 1;
        objTarget.COMBO += level - 1;
        objTarget.DIAMOND += level - 1;
        console.log(objTarget);
        socket.emit("showTarget", objTarget);
    });
    //listen tim play
    socket.on("timePlay", function(data){
        var timeSub = parseInt(data.ts);
        var timeCurrent = parseInt(data.tc);
        var numberStar = 0;
        if(timeSub <= (1/3) * timeCurrent)
        {
            numberStar = 3;
        }
        else if(timeSub > (1/3) * timeCurrent && timeSub <= (2/3) * timeCurrent)
        {
            numberStar = 2;
        }
        else if(timeSub> (2/3) * timeCurrent)
        {
            numberStar = 1;
        }
        else if(timeSub = timeCurrent){
            numberStar = 0;
        }
        //send star to client
        var bestScore = checkBestScore(arrBestSocre, score, level);
        socket.emit("getStarAndBestScore", {lv: level, star: numberStar, bs: bestScore});
        result.push({lv: level, star: numberStar, bs: bestScore});
    });
};

// io.set('authorization', function(handshake, accept) {
//     session(handshake, {}, function (err) {
//       if (err) return accept(err)
//       var session = socket.handshake.session;
//       // check the session is valid
//       accept(null, session.userid != null)
//     })
// })

//run socket
io.sockets.on('connection', run);


app.get('/', function(req, res) {
    res.render('index');
    req.session.levelUnlock = levelUnlock;
    req.session.Result = result;
    req.session.save();
    console.log(req.session);
});

