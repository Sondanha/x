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

// 사용자 정보 (임시 저장 방식)
const userInfo = JSON.parse(localStorage.getItem("user")); // { userid, name } 형태라고 가정

if (!userInfo || !userInfo.userid || !userInfo.name) {
  alert("사용자 정보가 없습니다. 다시 로그인해주세요.");
  window.location.href = "/login";
}

// 📥 글 작성
document.getElementById("post-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = document.getElementById("post-content").value.trim();
  if (!text || text.length < 5) {
    alert("내용은 5자 이상이어야 합니다.");
    return;
  }

  const res = await fetch(`${SERVER_URL}/posts`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      userid: userInfo.userid,
      name: userInfo.name,
      text,
    }),
  });

  if (res.ok) {
    alert("글이 등록되었습니다.");
    document.getElementById("post-content").value = "";
    loadPosts();
  } else {
    const err = await res.json();
    alert(err.message || "글 등록 실패");
  }
});

// 📄 게시글 목록 불러오기
async function loadPosts() {
  const res = await fetch(`${SERVER_URL}/posts`, { headers });

  if (!res.ok) {
    const err = await res.json();
    alert(err.message || "글 불러오기 실패");
    return;
  }

  const posts = await res.json();
  const list = document.getElementById("posts-list");
  list.innerHTML = "";

  posts.forEach((post) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h3>${post.name} (${post.userid})</h3>
      <p>${post.text}</p>
      <small>${new Date(Number(post.createdAt)).toLocaleString()}</small>
      <br />
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
  localStorage.removeItem("user");
  window.location.href = "/login";
});
