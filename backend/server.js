const http = require('node:http');
const express = require('express');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const cors = require('cors'); 
require('dotenv').config();

const eventEmitter = require('./utils/EventEmitter');
const beefRoutes = require('./routes/Beef');
const userRoutes = require('./routes/User');

const app = express();
const port = 4000;

//middleware 
app.use(express.json());
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

app.use((req,res, next ) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/beef', beefRoutes);
app.use('/api/user', userRoutes);

//connect to DB
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    const server = http.createServer(app);
    const io = socketIO(server);

    io.on('connection', (socket) => {
      console.log('A client connected', socket.id);

      socket.on('disconnect', () => {
      console.log('A client disconnected');
      });
    });
    
    //listen for friend request events
    eventEmitter.on('friendRequest', ({recievingUserId, sendingUsername}) => {
      io.emit('friendRequest', {recievingUserId, sendingUsername}); //Emit to all connected sockets
      console.log(`friend request to ${recievingUserId} sent from ${sendingUsername}`);
    });

    eventEmitter.on('userUpdated', ({ userId }) => {
      io.emit('userUpdated', { userId }); // Emit to all connected sockets
      console.log(`user with ID ${userId} has updated their beef array`);
    });

    eventEmitter.on('beefCreated', ({ beef }) => {
      io.emit('beefCreated', { beef }); // Emit to all connected sockets
      console.log(`beef created between ${beef.user1} and ${beef.user2}`);
    });

    server.prependListener("request", (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
   });

    //listen for requests once we connect to DB
    server.listen(port, () => {
      console.log(`connected to database and port ${port}`);
    })
  })
  .catch((error) => {
      console.log(error);
      process.exit(1);
  })