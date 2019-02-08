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

  //Add the incoming messages from the server and add them to the message list
  //Build the li from and text
  var newMessageItem = jQuery('<li></li>');
  newMessageItem.text(`${newMessageData.from}: ${newMessageData.text}`);

  //Append the message to the ordered list ol id="message-list"
  jQuery('#message-list').append(newMessageItem);
});

// #####################################################################
//Use jQuery to select the form with id=message-form
// use formEvent.preventDefault(); to prevent the form from sending a query string
//Create an event listener with the .on and listen for 'submit'
// Adding function to acknowledge and Emit from the server.
// First: Emit Custom Event, 'createMessage', from the Client to the Server and include Data via an Object
// use cal back function so that the server may return data with an acknowledgement
// that it received the message. In this case it returns the data in
//the variable dataAckFromServer
jQuery('#message-form').on('submit', function (formEvent) {
  formEvent.preventDefault();

  //Create an emit with createMessage
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function (dataAckFromServer) {
    console.log('The data acknowledgement from the Server is: ', dataAckFromServer);
  });
});

// #####################################################################
// End: Script to establish messaging between client & server
// #####################################################################
