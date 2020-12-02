const User = require('../models/User');
const Template = require('../models/Template');

exports.getHome = async (req, res) => {
  try {
    const temp = await Template.find();
    let verify;
    const user = await User.findById(req.session.user._id);
    if (user.isVerified === false) {
      verify = true;
    } else {
      verify = undefined;
    }
    return res.render('Pages/home', {
      userId: req.session.user._id,
      username: req.session.user.fullName,
      temp,
      verify,
    });
  } catch (err) {
    console.log(err);
  }
};
