var express = require("express");
var morgan = require("morgan");
var compression = require('compression');
var helmet = require('helmet');

const io = require('socket.io')(server, {
  path: '/chat/socket.io'
});

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('new-channel-added', channel => {
    console.log(channel);
    socket.broadcast.emit('new-channel-added-broadcast-from-server', channel);
  });
  
  socket.on('channel-deleted', channelId => {
    socket.broadcast.emit('channel-deleted-broadcast-from-server', channelId);
  });

  socket.on('joined-channel', data => {
    socket.broadcast.emit('joined-channel-broadcast-from-server', data);
  });
  
  socket.on('left-channel', data => {
    socket.broadcast.emit('left-channel-broadcast-from-server', data);
  });

  socket.on('new-message-added', message => {
    socket.broadcast.emit('new-message-added-broadcast-from-server', message);
  });

  socket.on('message-deleted', messageId => {
    socket.broadcast.emit('message-deleted-broadcast-from-server', messageId);
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