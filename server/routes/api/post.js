import express from 'express';
import Post from '../../models/post';

const router = express.Router();

router.get('/', async (req, res) => {
  const postFindResult = await Post.find();
  console.log(postFindResult, 'All Post Get');
  res.json(postFindResult);
});

router.post('/', async (req, res, next) => {
  try {
    console.log(req, 'req');
    // const
  } catch (e) {
    console.log(e);
  }
});
