import User from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    /** find all users sauf the one ho is connected (loggedInUserId) */
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in get user for side bar controller", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};
