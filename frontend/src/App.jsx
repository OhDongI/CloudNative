// 메인 화면 로직
import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
} from './api/posts';

function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '',
  });
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState('');

  // 처음 접속 시 게시글 목록 불러오기
  useEffect(() => {
    const load = async () => {
      try {
        setInitialLoading(true);
        setError('');
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError('게시글 목록을 불러오지 못했습니다.');
      } finally {
        setInitialLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({ title: '', content: '', author: '' });
    setEditingPost(null);
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      setError('');
      const newPost = await createPost(form);
      // 새 글을 맨 앞에 추가
      setPosts((prev) => [newPost, ...prev]);
      resetForm();
    } catch (err) {
      console.error(err);
      setError('게시글 작성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingPost) return;
    try {
      setLoading(true);
      setError('');
      const updated = await updatePost(editingPost.id, form);
      setPosts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      resetForm();
    } catch (err) {
      console.error(err);
      setError('게시글 수정 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제할까요?')) return;
    try {
      setLoading(true);
      setError('');
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      setError('게시글 삭제 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (post) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      content: post.content,
      author: post.author,
    });
  };

  const isEditMode = Boolean(editingPost);

  const handleSubmit = () => {
    if (isEditMode) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  return (
    <Layout>
      {initialLoading ? (
        <p>게시글을 불러오는 중...</p>
      ) : (
        <div className="grid">
          <div className="grid-left">
            {error && (
              <div style={{ color: 'red', marginBottom: 8 }}>
                {error}
              </div>
            )}
            <PostForm
              mode={isEditMode ? 'edit' : 'create'}
              form={form}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onCancel={resetForm}
            />
            {loading && <p style={{ fontSize: 12 }}>요청 처리 중...</p>}
          </div>
          <div className="grid-right">
            <PostList
              posts={posts}
              onEdit={startEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      )}
    </Layout>
  );
}

export default App;
