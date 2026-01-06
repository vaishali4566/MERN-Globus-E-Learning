import ChatUserItem from "./ChatUserItem";

const ChatSidebar = () => {
  return (
    <div className="w-72 border-r dark:border-gray-700 flex flex-col">

      {/* Search */}
      <div className="p-4">
        <input
          className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-darkSecondary focus:outline-none"
          placeholder="Search"
        />
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto space-y-1 px-2">
        {[1,2,3,4].map(user => (
          <ChatUserItem key={user} />
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
