import { AppError } from "../utils/appError.js";

export const allowedRoles = (...roles) => {
  return (req, res, next) => {
    console.log("🚨 ROLE MIDDLEWARE HIT");
    console.log("PATH 👉", req.originalUrl);
    console.log("ALLOWED ROLES 👉", roles);
    console.log("USER ROLE 👉", req.user.role);
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You are not allowed to access this resource", 403),
      );
    }
    next();
  };
};
