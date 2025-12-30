import React from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";
import SocialLogin from "../../components/auth/SocialLogin";
import logo from "../../assets/images/auth/logo.jpg";
import AuthLinks from "@/components/auth/AuthLinks";

const Signup = () => {
  return (
    <AuthLayout
      heading="Join Globus E-Learning"
      subheading="Create your account and start learning seamlessly."
    >
      <div className="flex justify-center items-center gap-3 mb-8">
        <img src={logo} alt="Logo" className="h-9" />
        <span className="text-lg font-semibold text-[#d6d7e0]">Globussoft</span>
      </div>

      <LoginForm role="Signup" buttonColor="bg-[#316aff]" />
      <AuthLinks/>
      <SocialLogin />
    </AuthLayout>
  );
};

export default Signup;
