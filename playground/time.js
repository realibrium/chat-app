//All times are with reference to Jan 1 1970 at 00:00 am UTC
//All times are in miliseconds

//Need to define the format required to display to the users
// Doc .... look for MDN Date in Google

//Require library moment
var moment = require('moment');

//####################################################################
//####################################################################
// Begin: Using the basic Date() function
//####################################################################
//####################################################################

//define at Date
// var todayDate = new Date();
// console.log('Date', todayDate);
//
// //Years go from
// console.log('Year', todayDate.getYear());
//
// //Months go from 0 to 11
// console.log('Month', todayDate.getMonth());
//
// //Days go from 0 to 6
// console.log('Day', todayDate.getDay());
//
// //Hours go from 0 to 6
// console.log('Hours', todayDate.getHours());

//####################################################################
//####################################################################
// End: Using the basic Date() function
//####################################################################
//####################################################################

//####################################################################
//####################################################################
// Begin: Using the moment library for date formatting
//####################################################################
//####################################################################

//define at Date
var date = moment();
console.log('Today Date', date.format());

//Use the Years pattern 'YYYY'
console.log('Year: ', date.format('YYYY'));

//Use the Months pattern 'MMM'
console.log('Month: ', date.format('MMM'));

//Use the Days pattern 'DD'
console.log('Day: ', date.format('DD'));

//Use the Hours pattern 'HH'
console.log('Hours: ', date.format('HH'));

//Combine the paterns
console.log('Today\'s Date Fomatted: ', date.format('MMM Do, YYYY'));

//Manipulating date variable with operations

//Add one Year
date.add(1, 'years');
console.log('Resulting Date\'s Year', date.format('YYYY'));

//Add one Year
date.subtract(23, 'months');
console.log('Resulting Date\'s Year', date.format('YYYY'));

//Time with format 10:35 am
todayDate = moment();
console.log('Today\'s Date', todayDate.format());

console.log('Current Time: ', todayDate.format('h:mm a'));

//Printing time from an event store in a variable 'createdAt'
//use moment().valueOf(); to get the time in miliseconds equivalent to Date().getTime()
var createdAt = moment().valueOf();

var eventDate = moment(createdAt);
console.log('Event\'s Time: ', eventDate.format('h:mm a'));
//####################################################################
//####################################################################
// End: Using the moment library for date formatting
//####################################################################
//####################################################################
