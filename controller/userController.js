const UserModel = require("../models/User");
const CryptoJS = require("crypto-js");



//REGISTER
const register = (async (req, res) => {
    console.log("user register called "+req.body.email)
    console.log("user register called "+req.body.password)
    console.log("user register called "+req.body.username)
    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
  
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  
  });
  
  //UPDATE
  const update =  (async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    }
  
    try {
      const updatedUser =  await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //DELETE
  const deleteUser =  (async (req, res) => {
  
    try {
      const deletedUser =  await UserModel.findByIdAndDelete(
        req.params.id,
      );
      if (deletedUser == null)
        res.status(200).json("User not found!");
      else
        res.status(200).json(deletedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //FETCH
  const fetchUser =  async (req, res) => {
  
    try {
      const userData =  UserModel.findById(
        req.params.id,
      );
      if (userData == null)
        res.status(200).json("User not found!");
      else{
          const { password, ...others } = userData._doc;
          res.status(200).json(others);
      }
      } catch (err) {
      res.status(500).json(err);
    }
  };
  
  
  //FETCH
  const fetchAll =  (async (req, res) => {
  
    try {
      const userData =  await UserModel.find().sort("updatedAt");
      if (userData == null)
        res.status(200).json("User not found!");
      else{
          res.status(200).json(userData);
      }
      } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = {register,update,deleteUser,fetchUser,fetchAll};