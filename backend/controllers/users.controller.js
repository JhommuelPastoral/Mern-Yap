import user from "../models/users.model.js";
import jwt from 'jsonwebtoken';
import validator from 'validator';
import bcrpyt from 'bcrypt';
import bcrypt from 'bcrypt';

const createJson = (_id)=>{
  return jwt.sign({_id}, process.env.Secret,{expiresIn: '3d'});
}

const hashPassword = (password)=>{

  return new Promise((resolve, reject)=>{
     bcrpyt.genSalt(12, (error, salt)=>{
      if(error) reject(error);
      bcrpyt.hash(password,salt, (error, hash)=>{
        if(error) reject(error);
        resolve(hash);
      })
     })

  })

}



export const signUp = async (req,res)=>{
  
  try {
    const {email, password } = req.body;
    
    if(!email || !password){
      return res.json({error: "Invalid Credentials"});
    }
    
    const exist = await user.findOne({email}); 
    
    if(exist){
      return res.json({error: "Email already Exists"});
    }
    
    
    if(!validator.isEmail(email)){
      return res.json({error: "Invalid Email"});
    }
    
    if(!validator.isStrongPassword(password)){
      return res.json({ error: 'Password too weak. Try mixing letters, numbers, and symbols.' }); 
    }
    
    const hash = await hashPassword(password);
    const User = await user.create({email, password:hash});
    return res.status(201).json({ message: 'Succesfully' });
    
  } catch (error) {
    return res.status(201).json({ error: error.message });

  }

}
// res.cookie('token', token, {
//   httpOnly: true,
//   secure: true, // required if using HTTPS (which Render does)
//   sameSite: 'None', // allows cross-site cookies
// }).json(user);


export const login = async (req,res)=>{

  try {
    const {email, password} = req.body;
    const User = await user.findOne({email});
    if(!User){
      return res.json({error: "No user Found"});
    }
    const match = await bcrypt.compare(password, User.password);

    if(match){
      jwt.sign({email: User.email, id: User._id}, process.env.JWT_SECRET, {expiresIn: '1d'}, (error, token)=>{
        if(error){
          throw error;
        }
        res.cookie('token', token).json(User);
      })
    }
    if(!match){
      return res.json({ error: "Password does not match" }); 

    }

  } catch (error) {
      res.status(400).json({error:error.message});
  }

}

export const getProfile = async(req, res)=>{
  const {token} = req.cookies;

  if(!token) return res.json(null);

  jwt.verify(token, process.env.JWT_SECRET, {}, (error, user)=>{
    if(error){
      return res.status(401).json(null); // or { error: "Unauthorized" }
    }
    res.json(user);
  }); 
}

export const logOut = async (req,res)=>{
  res.cookie('token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    expires: new Date(0),
  }).json({ message: 'Logged out successfully' });

}