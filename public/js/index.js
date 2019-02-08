// #####################################################################
// Begin: Script to establish messaging between client & server
// #####################################################################
// Call io()
var socket = io();

// IMPORTANT: Do not use arrow functions due to incompatibility with
// other browsers than Chrome. Use nurmal functions on the client side

// Event: 'connect' on the socket io server
socket.on('connect', function () {
  console.log('Client Connected to Server');

  // #####################################################################
  // Emit Custom Event, 'createMessage', from Client to Server and include Data via an Object
  socket.emit('createMessage', {
    from: 'Ronald',
    text: 'Sure we can meet at 7pm'
  });

});

// Event: 'disconnect' on the socket io server
socket.on('disconnect', function () {
  console.log('Client Disconnected from Server');
});

// #####################################################################
// Listen for Custtom Event, 'newMessage', from Server to Client
// The data object from the server will be the first argument of the function
socket.on('newMessage', function (newMessageData) {
  console.log('Got New Message from Server', newMessageData);
});


// #####################################################################
// End: Script to establish messaging between client & server
// #####################################################################
