const express = require("express");
const morgan = require("morgan");
const compression = require('compression');
const helmet = require('helmet');
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server, {
  path: '/chat/socket.io'
});

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


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

// Listen to port 3000
app.listen(3000);