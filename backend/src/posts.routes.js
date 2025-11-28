// 게시글 CRUD 라우터
const express = require('express');
const router = express.Router();
const pool = require('./db');

// 모든 게시글 조회
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM posts ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('GET /posts error:', err);
    res.status(500).json({ message: '서버 에러' });
  }
});

// 단일 게시글 조회
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM posts WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('GET /posts/:id error:', err);
    res.status(500).json({ message: '서버 에러' });
  }
});

// 게시글 생성
router.post('/', async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res
      .status(400)
      .json({ message: 'title, content, author는 필수입니다.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO posts (title, content, author)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, content, author]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST /posts error:', err);
    res.status(500).json({ message: '서버 에러' });
  }
});

// 게시글 수정
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  try {
    const result = await pool.query(
      `UPDATE posts
       SET title = $1,
           content = $2,
           author = $3,
           updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [title, content, author, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('PUT /posts/:id error:', err);
    res.status(500).json({ message: '서버 에러' });
  }
});

// 게시글 삭제
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM posts WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    res.json({ message: '삭제 완료' });
  } catch (err) {
    console.error('DELETE /posts/:id error:', err);
    res.status(500).json({ message: '서버 에러' });
  }
});

module.exports = router;
