import React, { useEffect, useState } from "react";
import FriendRequests from "@/features/chat/components/FriendRequests";
import { connectSocket, getSocket } from "@/features/chat/ChatSocket";
import { getUsers } from "../services/findPeopleServices";
import { getUserAvatar } from "@/utils/getUserAvatar";

const FindPeoplePage = () => {
  const [requests, setRequests] = useState([]); // ← not used yet — maybe you fetch requests elsewhere?
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Only one useEffect — runs once on mount
  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      try {
        const usersArray = await getUsers();           // ← returns array directly

        console.log("Fetched users:", usersArray);     // ← for debugging

        // Optional: add default avatar if you want (not required)
        const enhanced = usersArray.map(user => ({
          ...user,
          avatar: getUserAvatar(user.avatar),
        }));

        setAllUsers(enhanced);
        setSearchResults(enhanced);   // show all users initially
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []); // ← empty deps = run once

  // Filter when user clicks Search button
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults(allUsers); // show all again if search cleared
      return;
    }

    const filtered = allUsers.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleSendRequest = (user) => {
    const socket = getSocket();
    socket.emit("send_friend_request", { to: user._id }); // ← note: your log shows _id, not id

    // Optional: optimistic remove (like your original intent)
    setSearchResults((prev) => prev.filter((u) => u._id !== user._id));
  };

  // Accept / Reject handlers (unchanged)
  const handleAccept = (request) => {
    const socket = getSocket();
    socket.emit("update_friend_request", {
      requestId: request.id,
      status: "accepted",
    });
  };

  const handleReject = (request) => {
    const socket = getSocket();
    socket.emit("update_friend_request", {
      requestId: request.id,
      status: "rejected",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Find People
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Connect with other students and expand your network.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-[#26283e] rounded-xl shadow-sm p-4">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#222436] border border-gray-200 dark:border-[#222436] text-sm text-gray-800 dark:text-gray-100"
          />
          <button
            onClick={handleSearch}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition"
          >
            Search
          </button>
        </div>

        {/* Search Results */}
        {loading ? (
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading users...</p>
        ) : searchResults.length > 0 ? (
          <div className="mt-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Users
            </h3>
            {searchResults.map((user) => (
              <div
                key={user._id}                    // ← use _id (from your log)
                className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1f2337] transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={getUserAvatar(user.avatar)}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </div>
                    {user.email && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleSendRequest(user)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                >
                  Add Friend
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
            No users found
          </p>
        )}
      </div>

      {/* Friend Requests */}
      <FriendRequests requests={requests} onAccept={handleAccept} onReject={handleReject} />
    </div>
  );
};

export default FindPeoplePage;