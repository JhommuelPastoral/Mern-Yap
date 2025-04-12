import Rant from "../models/rant.model.js";

export const createRant = async (req,res)=>{
  const rant = req.body;
  if(!rant.name || !rant.rant || !rant.date || !rant.time){
    return res.status(404).json({sucess: false, message: "Invalid Data"});
  }   
  const newRant = new Rant(rant);
  try {
    await newRant.save();
    res.status(201).json({sucess: true, data: newRant});

  } catch (error) {
    console.log("Erorr", error.message)
    res.status(500).json({sucess: false, message: "server Error"});
  }

};

export const getRant = async (req,res)=>{

  try {
    const rant = await Rant.find({});
    res.status(201).json({sucess: true, data: rant});

  } catch (error) {
    console.log("Erorr", error.message)
    res.status(500).json({sucess: false, message: "server Error"});
  }

};

export const deleteRant = async (req,res)=>{
  const {id} = req.params;
  console.log(id);
  try {
    await Rant.findByIdAndDelete(id);
    res.status(201).json({sucess: true, message: "Delete Success"});

  } catch (error) {
    console.log("Erorr", error.message)
    res.status(500).json({sucess: false, message: "server Error"});
  }

};

export const updateRant = async(req, res)=>{
  const {id} = req.params;
  const updateRant = req.body;

  try {
    await Rant.findByIdAndUpdate(id, updateRant, {new:true});
    res.status(201).json({sucess: true, message: "Update Success"});

  } catch (error) {
    console.log("Erorr", error.message)
    res.status(500).json({sucess: false, message: "server Error"});
  }

}