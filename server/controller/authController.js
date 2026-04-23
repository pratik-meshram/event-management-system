import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const signup = async (req, res) => {

  try {
    const { name, email, password, role, phone, category } = req.body;

    console.log("Incoming:", { role, phone, category });

    // ✅ Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    // ✅ Role-based validation
    if ((role === "vendor" || role === "user") && !phone) {
      return res.status(400).json({ msg: "Phone is required" });
    }

    if (role === "vendor" && !category) {
      return res.status(400).json({ msg: "Category is required" });
    }

    // ✅ Check duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // ✅ Hash password
    const hash = await bcrypt.hash(password, 10);

    // ✅ CREATE CLEAN OBJECT FIRST
    const userData = {
      name,
      email,
      password: hash,
      role: role || "user",
    };

    // ✅ Add phone only if exists
    if (phone) {
      userData.phone = phone;
    }

    // ✅ Add category only for vendor
    if (role === "vendor" && category) {
      userData.category = category;
    }

    // ✅ NOW CREATE USER
    const user = await User.create(userData);

    // ✅ remove password
    const { password: _, ...safeUser } = user._doc;

    res.status(201).json({
      msg: "Signup successful",
      user: safeUser,
    });

  } catch (err) {
    console.error("❌ ERROR:", err.message);
    res.status(500).json({ msg: err.message });
  }

};


export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ SET COOKIE FIRST
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ✅ SEND RESPONSE ONCE
    res.status(200).json({
      msg: "Login successful",
      token, // optional (for frontend use)
    });

    console.log("User logged in:", token);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};


export const me = (req, res) => {
  try {
    res.status(200).json({
      user: req.user, // middleware se aata hai
    });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching user" });
  }
};