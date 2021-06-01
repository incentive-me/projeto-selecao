const { users } = require('../models');

const checkRegister = async (req, res, next) => {
  const { name, password } = req.body;
  
  const useVerify = await users.findAll({
    where: {
      name,
      password
    },
  });
  if (useVerify.length > 0) return res.status(409).json({ message: 'user already exists'  });
  next();
};

const checkLogin = async (req, res, next) => {
  const { name, password } = req.body;
    const userVerify  = await users.findAll({
      where: {
        name,
        password
      },
    });
    
  if (userVerify.length < 1) return res.status(409).json({ message: 'user doesnt exists'  });
  next();
};

module.exports = {
  checkLogin,
  checkRegister
};

