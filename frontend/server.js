var express = require("express");
var morgan = require("morgan");
var compression = require('compression');
var helmet = require('helmet');
const http = require('http').Server(app);
const io = require('socket.io')(http);

var app = express();
app.use(helmet());
app.use(compression()); 

app.use(morgan("combined"));

// Serve the static files from the build folder
app.use(express.static( __dirname + "/build"));
//app.use('/material-dashboard-react', express.static(__dirname + "/build"));
// Redirect all traffic to the index
app.get("*", function(req, res){
  res.sendFile(__dirname + "/build/index.html");
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('User Disconnected');
  });
  socket.on('example_message', function(msg){
    console.log('message: ' + msg);
  });
});
io.listen(8000)

// Listen to port 3000
app.listen(3000);