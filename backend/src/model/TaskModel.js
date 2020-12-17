const mongosse = require('../config/database.js');
const Schema = mongosse.Schema

const TaskSchema = new Schema({
  macaddress: {type: String, required: true},
  type:{type: Number, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  when: {type: Date, required: true}, //quando/ para  data e hora
  done: {type: Boolean, default: false},
  created: {type: Date, default: Date.now()}
  
});

module.exports = mongosse.model('Task', TaskSchema);

