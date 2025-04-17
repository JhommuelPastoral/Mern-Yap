import user from "../models/users.model.js";
import jwt from 'jsonwebtoken';

const createJson = (_id)=>{

  return jwt.sign({_id}, process.env.Secret,{expiresIn: '3d'});


}


export const login = async (req,res)=>{
  const {email, password } = req.body;
  try {
    const User = await user.logIn(email, password);
    const token = createJson(User._id);
    res.status(201).json({email, token});

  } catch (error) {
      res.status(400).json({error:error.message});
  }
}

export const signUp = async (req,res)=>{

  const {email, password} = req.body;
  try {
    const User = await user.signUp(email, password);
    const token = createJson(User._id);
    res.status(201).json({email, token});

  } catch (error) {
      res.status(400).json({error:error.message});
  }
}
