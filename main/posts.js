const SERVER_URL = location.origin;
const token = localStorage.getItem("token");

if (!token) {
  alert("로그인이 필요합니다.");
  window.location.href = "/login";
}

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

// 📥 글 작성
document.getElementById("post-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("post-title").value.trim();
  const content = document.getElementById("post-content").value.trim();

  if (!title || !content) {
    alert("제목과 내용을 입력해주세요.");
    return;
  }

  const res = await fetch(`${SERVER_URL}/posts`, {
    method: "POST",
    headers,
    body: JSON.stringify({ title, content }),
  });

  if (res.ok) {
    alert("글이 등록되었습니다.");
    loadPosts();
  } else {
    alert("글 등록 실패");
  }
});

// 📄 게시글 목록 불러오기
async function loadPosts() {
  const res = await fetch(`${SERVER_URL}/posts`, { headers });
  const posts = await res.json();

  const list = document.getElementById("posts-list");
  list.innerHTML = "";

  posts.forEach((post) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <button onclick="deletePost('${post.id}')">삭제</button>
    `;
    list.appendChild(li);
  });
}

// 🗑 글 삭제
async function deletePost(id) {
  const res = await fetch(`${SERVER_URL}/posts/${id}`, {
    method: "DELETE",
    headers,
  });

  if (res.ok) {
    alert("삭제되었습니다.");
    loadPosts();
  } else {
    alert("삭제 실패");
  }
}

// 🔁 초기 로딩
loadPosts();

// 🔓 로그아웃
document.getElementById("logout-button").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
});
