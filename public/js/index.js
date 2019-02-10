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

  //Define variable that contains the date created at formated with moment
  var formattedTime = moment(newMessageData.createdAt).format('h:mm a');

  //Add the incoming messages from the server and add them to the message list
  //Build the li from and text
  var newListItem = jQuery('<li></li>');
  newListItem.text(`${newMessageData.from} ${formattedTime}: ${newMessageData.text}`);

  //Append the message to the ordered list ol id="message-list"
  jQuery('#message-list').append(newListItem);
});

// #####################################################################
// Listen for Custom Event: 'newLocationMessage'
socket.on('newLocationMessage', function (newLocationMessageData) {
  //Generate the DOM elements
  var newListItem = jQuery('<li></li>');
  var anchorTag = jQuery('<a target="_blank">My Current Location</a>');

  //Define variable that contains the date created at formated with moment
  var formattedTime = moment(newLocationMessageData.createdAt).format('h:mm a');

  newListItem.text(`${newLocationMessageData.from}  ${formattedTime}: `);
  anchorTag.attr('href', newLocationMessageData.url);
  newListItem.append(anchorTag);

  //Append the message to the ordered list ol id="message-list"
  jQuery('#message-list').append(newListItem);

});


// #####################################################################
//Event Listener: Use jQuery to select the form with id=message-form
// use formEvent.preventDefault(); to prevent the form from sending a query string
//Create an event listener with the .on and listen for 'submit'
// Adding function to acknowledge and Emit from the server.
// First: Emit Custom Event, 'createMessage', from the Client to the Server and include Data via an Object
// use cal back function so that the server may return data with an acknowledgement
// that it received the message. In this case it returns the data in
//the variable dataAckFromServer
var messageForm = jQuery('#message-form');

messageForm.on('submit', function (formEvent) {
  formEvent.preventDefault();

  //Create an emit with createMessage
  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val() //Select the input element with the name="message"
  }, function (dataAckFromServer) {
    console.log('', dataAckFromServer);

    //Clear the input text
    text: messageTextbox.val('');
  });
});

//Send Geolocation info to the server
var locationButton = jQuery('#send-location');

//Declare a event listener 'click'
locationButton.on('click', function () {
  //If geolocation is not supported supported then alert
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser!');
  }

  //Disable locationButton while sending the location info
  locationButton.attr('disabled', 'disabled');

  //Inform the user by changing the text in the locationButton
  locationButton.text('Sending location ...');

  //If geolocation is supported then:
  //Use the getCurrentPosition function.
  //It takes two functions:
  // 1) The success function that will handle the position data and actions
  // 2) The error function that will handle the error data and actions
  navigator.geolocation.getCurrentPosition(function (position) {
    //Enable locationButton when the getCurrentPosition returns
    locationButton.removeAttr('disabled');
    //Restore original text in the locationButton
    locationButton.text('Send Location');

    //Emit message with current position coordinates
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function (error) {
      //Enable locationButton when the getCurrentPosition returns
      locationButton.removeAttr('disabled');
      //Restore original text in the locationButton
      locationButton.text('Send Location');

      alert('Unable to fetch location. Error: ', error);
    });
});

// #####################################################################
// End: Script to establish messaging between client & server
// #####################################################################
