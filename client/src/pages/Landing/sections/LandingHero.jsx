// src/pages/landing/sections/LandingHero.jsx

const LandingHero = () => {
  return (
    <section className="bg-gray-50 dark:bg-darkPrimary py-20">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Learn skills that move your
            <span className="text-blue-600"> career forward</span>
          </h1>

          <p className="mt-5 text-gray-600 dark:text-gray-300 max-w-lg">
            Learn from industry experts through practical courses,
            real projects, and guided assignments — all in one platform.
          </p>

          {/* CTA */}
          <div className="flex items-center gap-4 mt-8">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Get Started
            </button>

            <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-darkSecondary transition">
              Watch Demo
            </button>
          </div>

          {/* STATS */}
          <div className="flex gap-10 mt-10 text-sm">
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                20K+
              </p>
              <p className="text-gray-500">Students</p>
            </div>

            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                120+
              </p>
              <p className="text-gray-500">Courses</p>
            </div>

            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                5K+
              </p>
              <p className="text-gray-500">Certificates</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center">
          <img
            src="/assets/images/hero-student.png"
            alt="E-learning"
            className="w-full max-w-md"
          />

          {/* FLOATING CARDS */}
          <div className="absolute top-10 -left-6 bg-white dark:bg-darkSecondary shadow rounded-xl px-4 py-2 text-sm">
            📚 120+ Courses
          </div>

          <div className="absolute bottom-10 -right-6 bg-white dark:bg-darkSecondary shadow rounded-xl px-4 py-2 text-sm">
            🎓 Certified Learning
          </div>
        </div>

      </div>
    </section>
  );
};

export default LandingHero;
