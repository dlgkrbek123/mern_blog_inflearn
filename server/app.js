import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import hpp from 'hpp';
import helmet from 'helmet';

const { MONGO_URI } = config;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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

// Use routes
app.get('/', (req, res) => {
  res.send('엄준식');
});

export default app;
