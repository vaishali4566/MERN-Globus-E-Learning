import { signupUser, loginUser } from "./auth.service.js";
import jwt from "jsonwebtoken";

// Helper to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Signup controller
export const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body; 
    // Optional: validate role
    const allowedRoles = ["student", "trainer"];
    const userRole = allowedRoles.includes(role) ? role : "student";

    const user = await signupUser({ name, email, password, role: userRole });

    const token = generateToken(user._id);
    res.status(201).json({
      success: true,
      data: {
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Login controller
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser({ email, password });

    const token = generateToken(user._id);
    res.status(200).json({
      success: true,
      data: {
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};
