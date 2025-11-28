// 게시글 목록 카드
import React from 'react';

function PostList({ posts, onEdit, onDelete }) {
  return (
    <section className="card">
      <div className="card-header">
        <h2 className="card-title">게시글 목록</h2>
        <span className="card-count">{posts.length}개</span>
      </div>

      {posts.length === 0 ? (
        <p className="empty-text">아직 작성된 게시글이 없습니다.</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <div className="post-main">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-content">
                  {post.content.length > 120
                    ? post.content.slice(0, 120) + '...'
                    : post.content}
                </p>
              </div>
              <div className="post-meta">
                <span className="post-author">작성자: {post.author}</span>
                {post.created_at && (
                  <span className="post-date">
                    {new Date(post.created_at).toLocaleString()}
                  </span>
                )}
              </div>
              <div className="post-actions">
                <button
                  className="btn small"
                  onClick={() => onEdit(post)}
                >
                  수정
                </button>
                <button
                  className="btn small danger"
                  onClick={() => onDelete(post.id)}
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default PostList;
