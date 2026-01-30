import { useState, useRef, useEffect } from "react";
import { FiCamera } from "react-icons/fi";
import { getUserName, getUserRole } from "@/utils/getUser";
import { getUserAvatar } from "@/utils/getUserAvatar";
import api from "@/services/api";

const ProfileHeader = () => {
  const user = getUserName();
  const role = getUserRole();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/profile');
        if (response.data.profilePhoto) {
          setProfilePhoto(response.data.profilePhoto);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('profilePhoto', file);

    try {
      const response = await api.post('/upload/profile-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setProfilePhoto(response.data.url);
        alert('Profile photo updated successfully!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload profile photo. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white dark:bg-[#1f2337] rounded-xl p-5 shadow">
      <div className="flex flex-wrap gap-4 items-center justify-between">

        <div className="flex gap-4 items-center">
          <div className="relative">
            <img
              src={getUserAvatar(profilePhoto)}
              className="w-24 h-24 rounded-full object-cover"
              alt="Profile"
            />
            <button 
              onClick={handleCameraClick}
              disabled={isUploading}
              className="absolute top-0 right-0 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiCamera size={14} />
            </button>
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />

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
