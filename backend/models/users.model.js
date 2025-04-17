import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';

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

userSchema.statics.logIn = async function (email, password) {
  if(!email || !password){
    throw Error('Invalid Credentials');

  }

  const user = await this.findOne({email});

  if(!user){
    throw Error("Incorrect Email");
    
  }

  const match = await bcrypt.compare(password, user.password);

  if(!match){
    throw Error("Incorrect Password");
  }

  return user;



}


userSchema.statics.signUp = async function (email, password) {

  if(!email || !password){
    throw Error('Invalid Credentials');

  }

  if(!validator.isEmail(email)){
    throw Error('Invalid Email');
  }

  if(!validator.isStrongPassword(password)){
    throw Error('Password is to weak');

  }

  const exist = await this.findOne({email});

  if(exist){
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({email, password:hash});

  return user;
  
}


const user = mongoose.model('users', userSchema);
export default user;