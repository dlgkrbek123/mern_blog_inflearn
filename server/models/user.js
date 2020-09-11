import mongoose, { mongo } from 'mongoose';
import moment from 'moment';

// 한사람만 글쓰기 가능
// 나머지 유저는 댓글만 가능

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // 유저를 구분하는 식별자
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['MainJuin', 'SubJuin', 'User'],
    default: 'User',
  },
  register_date: {
    type: Date,
    default: moment().format('YYYY-MM-DD hh:mm:ss'), // 몽고 db는 utc기준이다.
  },
  // 관계 정의
  // 글을 지우면 댓글도 지워지는게 좋겠지
  // 그걸 위해서 comments를 post와 comment를 한곳에 둔다.
  comments: [
    {
      post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post', // 무엇이라고 부르겠다
      },
      comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments',
      },
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'posts',
    },
  ],
});

const User = mongoose.model('user', UserSchema); // 스키마를 user로 접근

export default User;
