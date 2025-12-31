import React from "react";

const AuthLinks = ({ showRemember = true, signupText = "Sign Up" }) => {
  return (
    <div className="flex flex-col gap-2 mt-2 text-sm">
      <div className="flex justify-between">
        {showRemember && (
        <label className="flex items-center gap-2 text-gray-300">
          <input type="checkbox" className="rounded" />
          Remember Me
        </label>
      )}
      <a href="#" className="text-blue-500 hover:underline">
        Forgot Password?
      </a>
      </div>
      <p className="text-gray-400">
        Don’t have an account?{" "}
        <a href="/signup" className="text-blue-500 hover:underline">
          {signupText}
        </a>
      </p>
    </div>
  );
};

export default AuthLinks;
