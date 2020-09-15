import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';

// Model
import User from '../../models/User';

const router = express.Router();
const { JWT_SECRET } = config;

// @routes  GET api/user
// @desc    Get all user
// @access  public

router.get('/', async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      throw Error('No users');
    }
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

// @routes  POST api/user
// @desc    Register user
// @access  public

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    // simple validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: '모든 필드를 채워주세요.' });
    }

    // Check for exisiting user
    User.findOne({
      email,
    }).then((user) => {
      if (user) {
        return res.status(400).json({ msg: '이미 가입된 유저가 존재합니다' });
      }
      const newUser = new User({
        name,
        email,
        password,
      });

      // 비밀번호에 소금을 쳐서 노출되도 원본을 모르게 한다
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            //토큰을 생성
            jwt.sign(
              {
                id: user.id,
              },
              JWT_SECRET,
              {
                expiresIn: 3600,
              },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                  },
                });
              }
            );
          });
        });
      });
    });

    // res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

export default router;
