//####################################################################
//####################################################################
// Begin: Load Built-in NMP Modules
//####################################################################
//####################################################################

// Load the Path library
// Node Docs page: https://nodejs.org/dist/latest-v10.x/docs/api/path.html
const path = require('path');

// Load the http library
const http = require('http');

//####################################################################
//####################################################################
// End: Load Built-in NMP Modules
//####################################################################
//####################################################################

//####################################################################
//####################################################################
// Begin: Load NMP Modules
//####################################################################
//####################################################################

// Load express
const express = require('express');

// Load socketIO
const socketIO = require('socket.io');

// Load lodash
// var _ = require('lodash');

// Load body-parser
// var bodyParser = require('body-parser');

// Load ObjectID from mongodb library
// var {ObjectID} = require('mongodb');

//####################################################################
//####################################################################
// End: Load NMP Modules
//####################################################################
//####################################################################

//####################################################################
//####################################################################
// Begin: Load Project Methods
//####################################################################
//####################################################################

// Load the mongoose from exports from ./db/mongoose.js
// var {mongosse} = require('./db/mongoose.js');

// Load the Todo model
// var {Todo} = require('./models/todo.js');

// Load the User  model
// var {User} = require('./models/user.js');

//####################################################################
//####################################################################
// End: Load Project Methods
//####################################################################
//####################################################################

//####################################################################
//####################################################################
// Begin: Create Web Server and Static Pages
//####################################################################
//####################################################################

// Declare the path where the index.html is located
const publicPath = path.join(__dirname, '../public');
console.log(`publicPath: ${publicPath}`);

//Declare the port for use in both localHost and Heroku
const port = process.env.PORT || 3000;

//Declare the app to create the web server
var app = express();

//Create server using the http variable with the app as the argument
var server = http.createServer(app);

//Configure server to use socketIO to communicate via the variable 'io'
var io = socketIO(server);

// serve the static page index.html, located in the public folder
app.use(express.static(publicPath));

// Call method io.on which let's us register an event listener:
// the 'connection' in this case, is the event. It let's us listen for the event via the socket

//Event: 'connection' on the socket io server
io.on('connection', (socket) => {
  console.log('New User Connected');

  // #####################################################################
  // Emit Custom Event, 'newMessage', from Server to Client and include Data via an Object
  // socket.emit('newMessage', {
  //   from: 'Michael',
  //   text: 'Hello, can you meet me',
  //   createdAt: 123456
  // });

  // #####################################################################
  // Listen for Custom Event, 'createMessage', from Client to Server
  // The data object from the Client will be the first argument of the function
  socket.on('createMessage', (createMessageData) => {
    console.log('Server Received createMessageData', createMessageData);

    //Emit Custom Event 'newMessage' to all connections with the 'createMessage'
    // that the Server just received from the Client
    io.emit('newMessage', {
      from: createMessageData.from,
      text: createMessageData.text,
      createdAt: new Date().getTime()
    });

  });

  // #####################################################################
  //Event: 'disconnect' on the socket io server
  socket.on('disconnect', () => {
    console.log('User Was Disconnected');
  });

});

//####################################################################
//####################################################################
// End: Create Web Server and Static Pages
//####################################################################
//####################################################################

//####################################################################
//####################################################################
// Begin Listen on  port process.env.PORT || 3000
//####################################################################
//####################################################################
// Change the app.listen from Express to server.listen from socket.io
server.listen(port, () => {
  console.log(`Server Realibrium started on port: ${port}`);
});
//####################################################################
//####################################################################
// End Listen on  port process.env.PORT || 3000
//####################################################################
//####################################################################
