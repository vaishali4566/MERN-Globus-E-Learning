import { FiCamera } from "react-icons/fi";
import { useUser } from "@/context/UserContext";
import { getUserAvatar } from "@/utils/getUserAvatar";

const ProfileHeader = () => {
  const { user: profile, loading } = useUser();

  // Prevent UI break before data load
  if (loading || !profile) return null;

  const avatarSrc = profile.avatar || getUserAvatar(profile.name);

  return (
    <div className="bg-white dark:bg-[#1f2337] rounded-xl p-5 shadow">
      <div className="flex flex-wrap gap-4 items-center justify-between">

        <div className="flex gap-4 items-center">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={avatarSrc}
              className="w-24 h-24 rounded-full object-cover"
              alt="Profile"
            />

            {/* Camera Button */}
            <button
              className="absolute top-0 right-0 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700"
            >
              <FiCamera size={14} />
            </button>
          </div>

          {/* User Info */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {profile.name}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {profile.bio || "No bio added"}
            </p>

            <div className="flex gap-2 mt-2">
              <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400">
                {profile.role}
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
