import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const SocialLinksCard = () => {
  return (
    <div className="bg-white dark:bg-[#1f2337] rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
        Social Profiles
      </h2>

      <div className="space-y-4">
        {/* LinkedIn */}
        <div className="flex items-center gap-3">
          <FaLinkedin className="text-blue-600 text-xl" />
          <input
            type="text"
            placeholder="LinkedIn profile URL"
            className="flex-1 rounded-lg px-4 py-2 bg-gray-100 dark:bg-[#2a2f4a] 
                       text-gray-800 dark:text-white outline-none"
          />
        </div>

        {/* GitHub */}
        <div className="flex items-center gap-3">
          <FaGithub className="text-gray-800 dark:text-white text-xl" />
          <input
            type="text"
            placeholder="GitHub profile URL"
            className="flex-1 rounded-lg px-4 py-2 bg-gray-100 dark:bg-[#2a2f4a] 
                       text-gray-800 dark:text-white outline-none"
          />
        </div>

        {/* Twitter */}
        <div className="flex items-center gap-3">
          <FaTwitter className="text-sky-500 text-xl" />
          <input
            type="text"
            placeholder="Twitter profile URL"
            className="flex-1 rounded-lg px-4 py-2 bg-gray-100 dark:bg-[#2a2f4a] 
                       text-gray-800 dark:text-white outline-none"
          />
        </div>

        <button
          className="w-full mt-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 
                     text-white transition"
        >
          Update Social Links
        </button>
      </div>
    </div>
  );
};

export default SocialLinksCard;
