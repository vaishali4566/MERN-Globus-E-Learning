import ChatHeader from "./ChatHeader";
import ChatSidebar from "./ChatSidebar";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
const ChatLayout = () => {
  return (
  
        <div className="flex h-[calc(90vh-80px)]  bg-white dark:bg-darkPrimary rounded-xl overflow-hidden shadow">
      <ChatSidebar />
      <div className="flex flex-col flex-1">
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatLayout;
