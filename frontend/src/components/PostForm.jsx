// src/components/PostForm.jsx
import React from 'react';

function PostForm({
  mode = 'create', // 'create' or 'edit'
  form,
  onChange,
  onSubmit,
  onCancel,
}) {
  const title = mode === 'create' ? '새 글 작성' : '글 수정';

  return (
    <section className="card">
      <h2 className="card-title">{title}</h2>
      <form
        className="post-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <label className="form-field">
          <span>제목</span>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="제목을 입력하세요"
            required
          />
        </label>

        <label className="form-field">
          <span>내용</span>
          <textarea
            name="content"
            value={form.content}
            onChange={onChange}
            placeholder="내용을 입력하세요"
            rows={5}
            required
          />
        </label>

        <label className="form-field">
          <span>작성자</span>
          <input
            name="author"
            value={form.author}
            onChange={onChange}
            placeholder="작성자 이름"
            required
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="btn primary">
            {mode === 'create' ? '작성' : '수정 완료'}
          </button>
          {mode === 'edit' && (
            <button
              type="button"
              className="btn"
              onClick={onCancel}
            >
              취소
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default PostForm;
