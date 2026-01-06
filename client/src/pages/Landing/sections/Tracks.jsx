// src/pages/landing/sections/Tracks.jsx

const tracks = [
  {
    title: "Frontend Development",
    desc: "HTML, CSS, JavaScript, React",
    students: "4.5k Students",
  },
  {
    title: "Backend Development",
    desc: "Node.js, Express, MongoDB",
    students: "3.2k Students",
  },
  {
    title: "Full Stack MERN",
    desc: "Build real-world applications",
    students: "6k Students",
  },
];

const Tracks = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-darkPrimary">
      <div className="container mx-auto px-6">

        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Our learning tracks
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
          Structured paths designed to help you grow faster.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {tracks.map((track, i) => (
            <div
              key={i}
              className="bg-white dark:bg-darkSecondary rounded-2xl shadow hover:shadow-lg transition p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {track.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {track.desc}
              </p>

              <p className="text-sm text-blue-600 mt-4 font-medium">
                {track.students}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Tracks;
