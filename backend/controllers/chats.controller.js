import Chats from "../models/chats.model.js";

export const createChat = async(req, res) =>{

  const chat = req.body;

  if(!chat.name || !chat.message){
    return res.status(404).json({success: false, message: 'Invalid Data'})
  }
  const newChat = new Chats(chat);
  console.log(newChat);
  try {
    await newChat.save();
    res.status(201).json({sucess: true, data: newChat});


  } catch (error) {
    console.log("Erorr", error.message)
    res.status(500).json({sucess: false, message: "server Error"});
  }


  
};

export const getChats = async(req,res)=>{

  try {
    const chat = await Chats.find({});
    res.status(201).json({sucess: true, data: chat});

    
  } catch (error) {
    console.log("Erorr", error.message)
    res.status(500).json({sucess: false, message: "server Error"});
  }


}