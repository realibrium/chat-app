//Generate newMessage
var generateMessage = (from, text) => {
  return {
    from: from,
    text: text,
    createdAt: new Date().getTime()
  };
};

// Use function generateLocationMessage to create data with the url format:
// https://www.google.com/maps?q=30.202915299999997,-97.8614147
var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from: from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: new Date().getTime()
  };
};

module.exports = {
  generateMessage: generateMessage,
  generateLocationMessage: generateLocationMessage
};
