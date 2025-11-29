// backend/src/server.js  (ESM)

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import postsRouter from './posts.routes.js';   // 파일 위치가 src/posts.routes.js 라고 가정

const app = express();
const PORT = process.env.PORT || 4000;

// CORS
app.use(cors());

// JSON 파싱
app.use(express.json());

// 로그
app.use(morgan('dev'));

// 헬스 체크
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// 프론트에서 API_BASE_URL = ".../api"
// 프론트는 `${API_BASE_URL}/posts`로 요청 보내니까
// 여기서 '/api' 아래에 posts 라우터를 연결
app.use('/api', postsRouter);

app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
