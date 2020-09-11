import mongoose, { mongo } from 'mongoose';
import moment from 'moment';

const CommentSchema = new mongoose.Schema({
  contents: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: moment().format('YYYY-MM-DD hh:mm:ss'),
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post',
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId, // ObjectId로 연결됨
    ref: 'user',
  },
});

const Comment = mongoose.model('comment', CommentSchema);

export default Comment;
