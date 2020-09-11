import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('엄준식');
});

export default app;
