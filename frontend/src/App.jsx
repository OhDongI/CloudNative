// src/App.jsx
import React, { useState } from 'react';
import Layout from './components/Layout';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
// import { fetchPosts, createPost, updatePost, deletePost } from './api/posts';

function App() {
  // 임시 더미 데이터 (백엔드 붙기 전까지 사용)
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: '클라우드 네이티브 게시판 프로젝트',
      content: '이 프로젝트는 Docker, Kubernetes, CI/CD, 모니터링 연습이 목표입니다.',
      author: '미르',
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: '프론트엔드부터 차근차근',
      content: '먼저 로컬에서 React로 UI를 만들고, 나중에 백엔드와 K8s를 붙입니다.',
      author: '미르',
      created_at: new Date().toISOString(),
    },
  ]);

  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '',
  });

  const [editingPost, setEditingPost] = useState(null);

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

  const handleCreate = () => {
    // 나중에 createPost API로 교체 예정
    const newPost = {
      id: posts.length === 0 ? 1 : Math.max(...posts.map((p) => p.id)) + 1,
      title: form.title,
      content: form.content,
      author: form.author,
      created_at: new Date().toISOString(),
    };
    setPosts((prev) => [newPost, ...prev]);
    resetForm();
  };

  const handleUpdate = () => {
    if (!editingPost) return;

    setPosts((prev) =>
      prev.map((p) =>
        p.id === editingPost.id
          ? {
              ...p,
              title: form.title,
              content: form.content,
              author: form.author,
            }
          : p
      )
    );
    resetForm();
  };

  const handleDelete = (id) => {
    if (!window.confirm('정말 삭제할까요?')) return;
    setPosts((prev) => prev.filter((p) => p.id !== id));
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
      <div className="grid">
        <div className="grid-left">
          <PostForm
            mode={isEditMode ? 'edit' : 'create'}
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
        </div>
        <div className="grid-right">
          <PostList
            posts={posts}
            onEdit={startEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </Layout>
  );
}

export default App;
