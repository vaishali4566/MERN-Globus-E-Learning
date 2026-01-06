const ChatMessages = () => {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">

      {/* Right */}
      <div className="flex justify-end">
        <div className="bg-blue-600 text-white px-4 py-2 rounded-xl max-w-xs">
          Guysss, next year we go to Japan!
        </div>
      </div>

      {/* Left */}
      <div className="flex justify-start">
        <div className="bg-gray-200 dark:bg-darkSecondary px-4 py-2 rounded-xl max-w-xs">
          Are you serious???
        </div>
      </div>

    </div>
  );
};

export default ChatMessages;
