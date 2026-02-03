import { getUsersService } from "./user.service.js";

// All users or filtered by role
export const getUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const currentUserId = req.user.id;

    const users = await getUsersService(role, currentUserId);

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


export const getProfile = async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}