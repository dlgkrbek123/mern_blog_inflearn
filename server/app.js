import config from './config';
import express from 'express';
import mongoose from 'mongoose';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

// Routes
import postsRoutes from './routes/api/post';
import userRoutes from './routes/api/user';
import authRoutes from './routes/api/auth';

const { MONGO_URI } = config;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB connecting Success'))
  .catch((e) => {
    console.log(e);
  });

const app = express();

app.use(hpp());
app.use(helmet());

app.use(
  cors({
    origin: true, // 모두 허용
    credentials: true, // 브라우져헤더에 두가지를 추가하게 해줌
  })
);
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/post', postsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

export default app;
