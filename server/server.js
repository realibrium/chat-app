//####################################################################
//####################################################################
// Begin: Load NMP Modules
//####################################################################
//####################################################################

// Load the built-in NodeJS Path library
// Node Docs page: https://nodejs.org/dist/latest-v10.x/docs/api/path.html
const path = require('path');

// Load lodash
// var _ = require('lodash');

// Load express
var express = require('express');

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
// Declare the path where the index.html is located
var publicPath = path.join(__dirname, '../public');
console.log(`publicPath: ${publicPath}`);

//Declare the port for use in both localHost and Heroku
const port = process.env.PORT || 3000;

//Declare the app t9 create routes with Express
var app = express();

// serve the static page index.html, located in the public folder
app.use(express.static(publicPath));


//####################################################################
//####################################################################


//####################################################################
//####################################################################
// Listen on  port process.env.PORT || 3000
//####################################################################
//####################################################################
app.listen(port, () => {
  console.log(`Server Realibrium started on port: ${port}`);
});
//####################################################################
//####################################################################
