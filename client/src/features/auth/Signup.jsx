import React from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthForm from "../../components/auth/AuthForm";
import SocialLogin from "../../components/auth/SocialLogin";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import logo from "../../assets/images/auth/logo.jpg";

const Signup = () => {
  return (
    <AuthLayout
      heading="Join Us Today!"
      subheading="Create your account and start your learning journey with Globus E-Learning."
    >
      {/* Logo */}
      <div className="flex justify-center items-center gap-3 mb-4">
        <img src={logo} alt="Logo" className="h-6" />
        <span className="text-lg font-semibold text-[#d6d7e0]">
          Globussoft
        </span>
      </div>

      {/* Heading */}
      <div className="flex mb-4 justify-center flex-col text-center">
        <h3 className="font-bold mb-2 text-md text-white">
          Create your Globus-E-Learning account
        </h3>
        <p className="text-sm">
          Sign up to explore courses and start learning
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

        {/* STUDENT SIGNUP */}
        <TabsContent value="student">
          <AuthForm
            type="signup"
            role="Student"
            buttonColor="bg-[#316aff]"
          />
        </TabsContent>

        {/* TRAINER SIGNUP */}
        <TabsContent value="trainer">
          <AuthForm
            type="signup"
            role="Trainer"
            buttonColor="bg-[#22c55e]"
          />
        </TabsContent>
      </Tabs>

      {/* LOGIN LINK */}
      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <a className="text-blue-500 hover:underline" href="/login">
          Login here
        </a>
      </p>

      {/* SOCIAL LOGIN */}
      <SocialLogin />
    </AuthLayout>
  );
};

export default Signup;
