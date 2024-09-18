const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route POST/api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ message: "All fields are require" });
    //throw new Error("All field are required");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    console.log("User already exits");
    res.status(400).json({ message: "User Already Exits" });
    //throw new Error("User Already Exits");
  }
  //   console.log(password);

  // hash the password using bcrypt
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });
  //   console.log(hashPassword);
  // console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }

  res.json({ message: "Register the user" });
});

//@desc Login a user
//@route POST/api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "All fields are required" });
  }
  const user = await User.findOne({ email });
  // compare the password with the hashed password

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          is: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.status(200).json({ message: "Login the user", accessToken });
  } else {
    res.status(400).json({
      message: "Email Or Password is not Valid",
    });
  }

  // res.json({  message: "Login the user"});
});

//@desc Current user info
//@route GET/api/users/current
//@access private <- access by only logged in user (it is done by the access token passes by the clint at time of the login { done by the jsonwebtoken})
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
