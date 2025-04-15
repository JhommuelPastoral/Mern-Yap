import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({

  name:{
    type: String,
    required: true
  },

  message:{
    type: String,
    required: true
  },
  
  date:{
    type: String,
    required: true
  },

  time:{
    type: String,
    required: true
  }


} , {timestamps: true});
const Chats = mongoose.model('Chats', chatSchema);

export default Chats;

