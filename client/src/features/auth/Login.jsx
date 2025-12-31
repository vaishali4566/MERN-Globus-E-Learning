import React from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthForm from "../../components/auth/AuthForm";
import SocialLogin from "../../components/auth/SocialLogin";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import logo from "../../assets/images/auth/logo.jpg";

const Login = () => {
  return (
    <AuthLayout
      heading="Welcome Back!"
      subheading="Manage your learning journey seamlessly. Access courses, track progress, and stay connected."
    >
      {/* Logo */}
      <div className="flex justify-center items-center gap-3 mb-4">
        <img src={logo} alt="Logo" className="h-6" />
        <span className="text-lg font-semibold text-[#d6d7e0]">Globussoft</span>
      </div>

      <div className="flex mb-4 justify-center flex-col text-center">
        <h3 className="font-bold mb-2 text-md text-white">
          Welcome to Globus-E-Learning
        </h3>
        <p className="text-sm">
          Sign in to access your secure admin dashboard.
        </p>
      </div>
      {/* Tabs */}
      <Tabs defaultValue="student" className="w-full">
        <TabsList className="grid grid-cols-2 mb-2 bg-[#1f2238] text-white rounded-xl">
          <TabsTrigger
            className="text-white data-[state=active]:text-[#0f172a]"
            value="student"
          >
            Student
          </TabsTrigger>
          <TabsTrigger
            className="text-white data-[state=active]:text-[#0f172a]"
            value="trainer"
          >
            Trainer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="student">
          <AuthForm type="login" role="Student" buttonColor="bg-[#316aff]" />
        </TabsContent>

        <TabsContent value="trainer">
          <AuthForm type="login" role="Trainer" buttonColor="bg-[#22c55e]" />
        </TabsContent>
      </Tabs>

      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <a className="text-blue-500 hover:underline" href="/signup">
          Sign Up here
        </a>
      </p>
      {/* Social Login */}
      <SocialLogin />
    </AuthLayout>
  );
};

export default Login;
