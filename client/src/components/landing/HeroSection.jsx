import React from "react";

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Learn. Grow. Succeed.
      </h1>

      <p className="max-w-2xl text-base md:text-lg mb-8">
        Globus E-Learning platform helps students and trainers collaborate,
        track progress, and master skills efficiently.
      </p>

      <div className="flex gap-4">
        <a
          href="/login"
          className="px-6 py-2.5 rounded-md bg-[#316aff] text-white text-sm hover:opacity-90 transition"
        >
          Get Started
        </a>

        <a
          href="/signup"
          className="px-6 py-2.5 rounded-md border border-white/20 text-white text-sm hover:bg-white/5 transition"
        >
          Create Account
        </a>
      </div>

      {/* Feature cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-[#1f2238] border border-white/10 rounded-xl p-6 hover:border-[#316aff]/40 transition"
          >
            <h3 className="text-white font-semibold mb-2">
              {item.title}
            </h3>
            <p className="text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const features = [
  {
    title: "Track Progress",
    desc: "Monitor course completion and performance in real time.",
  },
  {
    title: "Expert Trainers",
    desc: "Learn from industry professionals with practical experience.",
  },
  {
    title: "Secure Platform",
    desc: "JWT-based authentication keeps your data safe.",
  },
];

export default HeroSection;
