import fs from "fs/promises";

let posts = [];

const filePath = "./data/posts.json";

export async function loadPosts() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    posts = JSON.parse(data);
    console.log(`✅ 포스트 ${posts.length}개 불러옴`);
  } catch (err) {
    console.error("❌ 포스트 로딩 실패:", err.message);
    posts = [];
  }
}

async function savePosts() {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2)); // ✅ 저장함수
}

export async function getAll() {
  return posts;
}
export async function getAllByUserId(userid) {
  return posts.filter((post) => post.userid === userid);
}
export async function getAllById(id) {
  return posts.find((post) => post.id === id);
}
export async function create(userid, name, text) {
  const post = {
    id: Date.now().toString(),
    userid,
    name,
    text,
    createdAt: Date.now().toString(),
  };
  posts = [post, ...posts];
  return posts;
}

export async function update(id, text) {
  const post = posts.find((post) => post.id === id);
  if (post) {
    post.text = text;
  }
  return post;
}

export async function remove(id) {
  posts = posts.filter((post) => post.id !== id);
}
