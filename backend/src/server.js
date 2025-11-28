// 서버 진입점
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const postsRouter = require('./posts.routes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: 'http://localhost:3000', // 리액트 프론트에서 요청
  })
);
app.use(express.json());
app.use(morgan('dev'));

// 헬스 체크
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// /api/posts 이하에 라우터 연결
app.use('/api/posts', postsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
