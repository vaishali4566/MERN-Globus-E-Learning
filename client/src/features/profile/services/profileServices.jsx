import api from "@/services/api";

/* =====================
   PROFILE (ME)
===================== */

// Get logged-in user profile
export const getMyProfileService = async () => {
  const { data } = await api.get("/users/me");
  return data.data;
};

// Update name & bio
export const updateProfileService = async (payload) => {
  const { data } = await api.put("/users/me", payload);
  return data;
};

/* =====================
   USERS (ADMIN / TRAINER)
===================== */

// Get all users or by role
export const getUsersService = async (role) => {
  const query = role ? `?role=${role}` : "";
  const { data } = await api.get(`/users${query}`);
  return data;
};

/* =====================
   BASIC INFO
   (phone + dob)
===================== */

export const updateBasicInfoService = async (payload) => {
  const { data } = await api.patch("/users/me/basic-info", payload);
  return data;
};

/* =====================
   SOCIAL LINKS
===================== */

export const updateSocialLinksService = async (payload) => {
  const { data } = await api.patch("/users/me/social-links", payload);
  return data;
};

/* =====================
   PASSWORD
===================== */

export const updatePasswordService = async (payload) => {
  const { data } = await api.patch("/users/me/password", payload);
  return data;
};
