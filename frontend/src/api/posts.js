const API_BASE_URL = 'http://localhost:4000/api';

export async function fetchPosts() {
  const res = await fetch(`${API_BASE_URL}/posts`);
  if (!res.ok) throw new Error('게시글 목록을 불러오지 못했습니다.');
  return res.json();
}

export async function createPost(data) {
  const res = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('게시글 작성에 실패했습니다.');
  return res.json();
}

export async function updatePost(id, data) {
  const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('게시글 수정에 실패했습니다.');
  return res.json();
}

export async function deletePost(id) {
  const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('게시글 삭제에 실패했습니다.');
  return res.json();
}