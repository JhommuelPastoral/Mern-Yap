import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
  }

}, {timestamp: true})



const user = mongoose.model('users', userSchema);
export default user;