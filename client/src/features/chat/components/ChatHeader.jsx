const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between px-5 py-3 border-b dark:border-gray-700">
      <div className="flex items-center gap-3">
        <img className="w-10 h-10 rounded-full" src="/assets/images/avatar/vector/avatar2.webp" />
        <div>
          <p className="font-semibold">Jordan Miles</p>
          <span className="text-xs text-green-500">Online</span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
