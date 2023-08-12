import express from "express";
const router = express.Router();
import usersModel from "../db/db.js";
const checkUser = (async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await usersModel.findById(id);
   if(user){
    req.user = user
   next();
   }
   else{
    res.status(404).json({ message: "User not found" })
   }
  } catch (error) {
    res.status(500).json(error.message);
  }

 
}) // checks for user if it exists in db 

router.get("/", async (req, res) => {
  try {
    const users = await usersModel.find();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id",checkUser, async (req, res) => {
  
  try {
   
    res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const users = await usersModel.create({
      name: req.body.name,
      last_name: req.body.last_name,
      email: req.body.email
    })
    const saveUser = await users.save();
    res.status(201).json(users);
  } catch (error) {
    console.log(error);
  }
});
router.put("/:id",checkUser, async (req, res) => {
  try {
    const user = await usersModel.findByIdAndUpdate( req.user._id,{
      name: req.body.name,
      last_name: req.body.last_name,
      email: req.body.email
    },{new: true}); // change it to update a certain user
   res.status(200).send(user);
    
  } catch (error) {
    res.status(500).json(error.message);
  }
});
router.delete('/:id',checkUser, async (req, res) => {
  try {
    const user = await usersModel.findByIdAndDelete(req.user._id ,{update: true});
   res.status(200).json(user);
  }
   catch (error) {
    res.status(500).json(error.message);
  }
})

export default router;
