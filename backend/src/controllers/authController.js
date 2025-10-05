const userModel = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { comparePassword } = require('../utils/password');
const login = async (req, res) => {
  try{
    const { username, password } = req.body;
    const user = await userModel.findOne({ email: username });
    console.log(user);
    if(!user) return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = await comparePassword(password, user.password);
    console.log(isMatch);
    if(!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const payload = {
      sub: user._id,
    }
    const token = generateToken(payload);
    return res.status(200).json({
      message: 'Login successful',
      accessToken: token,
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
  login,
};