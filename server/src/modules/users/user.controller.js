import User from "../auth/auth.model.js";
export const getProfile = async(req,res)=>{
    res.send('get profile');
}

// Edit Profile
export const editProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT/protect middleware
    const { name, bio, linkedin, github, twitter } = req.body;

    // Check if at least one field is provided
    if (!name && !bio && !linkedin && !github && !twitter) {
      return res
        .status(400)
        .json({ message: "Provide at least one field to update" });
    }

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update only provided fields
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (linkedin) user.linkedin = linkedin;
    if (github) user.github = github;
    if (twitter) user.twitter = twitter;

    // Save changes
    await user.save();

    // Return updated user (excluding password)
    const { password, ...updatedUser } = user._doc;

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
