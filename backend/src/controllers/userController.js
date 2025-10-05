const User = require("../models/User");

const me = async (req, res) => {
  try{
    const { id } = req.user;
    const user = await User.findById(id).select('-password');
    if(!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  }
  catch(err){
    return res.status(500).json({message: err.message});
  }
};
module.exports = {
  me
};