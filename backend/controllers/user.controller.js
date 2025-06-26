import { User } from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Invalid email format", success: false });
    }

    if(password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters", success: false });
    }

    const existingUser = await User.findOne({ email: email});
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    

   const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(201).json({ message: "User registered successfully", success: true });
    console.log(user)

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
