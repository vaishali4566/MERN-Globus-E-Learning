const AccountSettingsForm = () => {
  return (
    <div className="bg-white dark:bg-[#1f2337] rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
        Account Settings
      </h2>

      <form className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full rounded-lg px-4 py-2 bg-gray-100 dark:bg-[#2a2f4a] 
                       text-gray-800 dark:text-white outline-none focus:ring-2 
                       focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="john@gmail.com"
            disabled
            className="w-full rounded-lg px-4 py-2 bg-gray-200 dark:bg-[#2a2f4a] 
                       text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Role
          </label>
          <input
            type="text"
            value="Student"
            disabled
            className="w-full rounded-lg px-4 py-2 bg-gray-200 dark:bg-[#2a2f4a] 
                       text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Bio
          </label>
          <textarea
            rows="3"
            placeholder="Write something about yourself..."
            className="w-full rounded-lg px-4 py-2 bg-gray-100 dark:bg-[#2a2f4a] 
                       text-gray-800 dark:text-white outline-none focus:ring-2 
                       focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 
                       text-white transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettingsForm;
