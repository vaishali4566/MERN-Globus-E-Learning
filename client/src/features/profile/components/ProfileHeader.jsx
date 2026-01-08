import { FiCamera } from "react-icons/fi";
import { getUserName , getUserRole } from "@/utils/getUser";

const ProfileHeader = () => {
  const user = getUserName();
  const role = getUserRole();
  return (
    <div className="bg-white dark:bg-[#1f2337] rounded-xl p-5 shadow">
      <div className="flex flex-wrap gap-4 items-center justify-between">

        <div className="flex gap-4 items-center">
          <div className="relative">
            <img
              src="/avatar.jpg"
              className="w-24 h-24 rounded-full object-cover"
            />
            <button className="absolute top-0 right-0 bg-blue-600 text-white p-1.5 rounded-full">
              <FiCamera size={14} />
            </button>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {user || "Emma Smith"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Front-End Developer
            </p>

            <div className="flex gap-2 mt-2">
              <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400">
                {role}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-600 dark:bg-green-600/20 dark:text-green-400">
                Active
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileHeader;
