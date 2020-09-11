import mongoose from 'mongoose';
import moment from 'moment';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true, // 검색을 할 때 성능 향상을 위해
  },
  contents: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: -2, // 작성 시에도 조회가 되므로 -2로 설정
  },
  fileUrl: {
    type: String,
    default: 'https://source.unsplash.com/random/301x201', // 빈 섬네일을 막으려고
  },
  date: {
    type: String,
    default: moment().format('YYYY-MM-DD hh:mm:ss'),
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment',
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Post = mongoose.model('post', PostSchema); // 스키마를 user로 접근

export default Post;
