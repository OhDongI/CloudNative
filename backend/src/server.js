require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const postsRouter = require('./posts.routes');

const app = express();
const PORT = process.env.PORT || 4000;

// CORS 전체 허용 
app.use(cors());

// JSON body 파싱
app.use(express.json());

// 요청 로그
app.use(morgan('dev'));

// 헬스 체크
app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.use('/api', postsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
