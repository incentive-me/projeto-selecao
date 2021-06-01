const { Router } = require('express');

const router = Router();

const createToken = require('../auth/createToken');
const { users } = require('../models');
const { repositories } = require('../models');
const {checkLogin, checkRegister } =  require('../service/userService');

router.post('/register', checkRegister, async(req, res) => {
  const {dataValues} = await users.create(req.body);
  res.status(201).json(dataValues);
})

router.post('/login', checkLogin, async (req, res) => {
  const { name, password } = req.body;
  const token = await createToken({ name, password });
  res.status(200).json({ token: token, usuario: name });
});

router.post('/tag', async(req,res) => {
  const { tag, repoId, name, description, url, userName } = req.body;
  const user = await users.findOne({
    where: {
      name: userName,
    },
  });
  const userId = user.id;
  await repositories.create({repoId, tag, name, description, url, userId,  })
  res.status(201).end();
})
router.get('/tag/:tag', async (req, res) => {
  const { tag } = req.params;
  console.log(req.params);
  const user  = await repositories.findOne({
    where: {
      tag,
    },
  });
  res.status(200).json({ user });
});
module.exports = router;