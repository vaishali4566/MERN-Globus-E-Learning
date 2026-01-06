// src/pages/landing/sections/TrustedBy.jsx

const companies = ["Upwork", "Zendesk", "Lattice", "Getaround", "HelloSign"];

const TrustedBy = () => {
  return (
    <section className="py-10 bg-white dark:bg-darkPrimary border-y dark:border-gray-700">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-gray-500 mb-6">
          Trusted by learners working at
        </p>

        <div className="flex flex-wrap justify-center items-center gap-10">
          {companies.map((company, i) => (
            <span
              key={i}
              className="text-gray-400 font-semibold text-lg"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
