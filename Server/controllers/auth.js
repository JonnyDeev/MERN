import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      password,
      email,
      picturePath,
      location,
      occupation,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      password: encryptedPassword,
      email,
      picturePath,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();
    console.log("🚀 ~ file: Auth.js:32 ~ register ~ savedUser:", savedUser)
    
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    // Get user inputs from frontend
    const { email, password } = req.body;
    // Search for existing user inside the database
    const user = await User.findOne({ email: email });
    // if user is not found
    if (!user)
      return res.status(400).json({ message: "Email or Password Incorrect" });
    //Verify that the password sent is the same as the user encrypted password
    const verifyPassword = await bcrypt.compare(password, user.password);
    // if password is incorrect
    if (!verifyPassword)
      return res.status(400).json({ message: "Email or Password Incorrect" });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token,user})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
