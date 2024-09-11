import generateTokenAndSetCookie from "../JWT/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't Match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      res.status(400).json({ error: "user already exist" });
    }
    // hach password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // creat an image for profile
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // Generate JWT token here
      await generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};
// import User from '../models/user.model.js'; // Import the User model

// export const signup = async (req, res) => {
//     try {
//         console.log(req.body);
//         const { fullName, username, password, confirmPassword, gender } = req.body;

//         // Check if passwords match
//         if (password !== confirmPassword) {
//             return res.status(400).json({ error: "Passwords don't match" });
//         }

//         // Check if user already exists
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(400).json({ error: 'User already exists' });
//         }

//         // Create a new user
//         const newUser = new User({
//             fullName,
//             username,
//             password,
//             gender,
//             profilePic: gender === 'male' ? `https://avatar.iran.liara.run/public/boy?username=${username}` : `https://avatar.iran.liara.run/public/girl?username=${username}`,
//         });

//         // Save the new user
//         await newUser.save();

//         res.status(201).json({
//             _id: newUser._id,
//             fullName: newUser.fullName,
//             username: newUser.username,
//             profilePic: newUser.profilePic,
//         });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

export const login = (req, res) => {
  console.log("login route");
};

export const logout = (req, res) => {
  console.log("logout route");
};
