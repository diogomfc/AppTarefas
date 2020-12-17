const mongosse = require('mongoose');

const url = 'mongodb://localhost:27017/smart';

mongosse.connect(url,{useNewUrlParser:true});

module.exports = mongosse;