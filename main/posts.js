const SERVER_URL = location.origin;
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user") || "{}");

if (!token || !user.userid || !user.name) {
  alert("로그인이 필요합니다.");
  window.location.href = "/login";
}

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

document.getElementById("post-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = document.getElementById("post-content").value.trim();
  if (!text || text.length < 5) {
    alert("내용은 5자 이상이어야 합니다.");
    return;
  }

  try {
    const res = await fetch(`${SERVER_URL}/posts`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        userid: user.userid,
        name: user.name,
        text,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.message || "글 등록 실패");
      return;
    }

    document.getElementById("post-content").value = "";
    alert("글이 등록되었습니다.");
    loadPosts(); // 글 목록 다시 불러오기
  } catch (err) {
    console.error("글 작성 오류:", err);
    alert("글 작성 중 문제가 발생했습니다.");
  }
});

async function loadPosts() {
  try {
    const res = await fetch(`${SERVER_URL}/posts`, { headers });
    const posts = await res.json();

    const list = document.getElementById("posts-list");
    list.innerHTML = "";

    posts.forEach((post) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <h3>${post.name} (${post.userid})</h3>
        <p>${post.text}</p>
        <small>${new Date(Number(post.createdAt)).toLocaleString()}</small>
      `;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("글 목록 불러오기 실패:", err);
    alert("글 목록을 불러오지 못했습니다.");
  }
}

document.getElementById("logout-button").addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
});

loadPosts();
