const ChatUserItem = () => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-darkSecondary cursor-pointer">
      <img
        src="/assets/images/avatar/vector/avatar2.webp"
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <h6 className="text-sm font-semibold">Jordan Miles</h6>
        <p className="text-xs text-gray-500 truncate">Hey, did you get th...</p>
      </div>
      <span className="text-xs text-gray-400">02:20 PM</span>
    </div>
  );
};

export default ChatUserItem;
