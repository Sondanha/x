import fs from "fs/promises";

let users = [];

const filePath = "./data/users.json";

async function saveUsers() {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}
export async function loadUsers() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    users = JSON.parse(data);
    console.log(`✅ 사용자 ${users.length}명 불러옴`);
  } catch (error) {
    console.error("❌ users.json 읽기 실패:", error.message);
    users = []; // 파일이 없으면 초기화
  }
}

export async function createUser(userid, password, name, email) {
  const user = {
    id: Date.now().toString(),
    userid,
    password,
    name,
    email,
    url: "https://randomuser.me/api/portraits/men/32.jpg",
  };
  users = [user, ...users];
  await saveUsers();
  return users;
}

export async function login(userid, password) {
  const user = users.find((user) => {
    user.userid === userid && user.password === password;
  });
  return user;
}

export async function findByUserid(userid) {
  return users.find((user) => user.userid === userid);
}

export async function findByid(id) {
  return users.find((user) => user.id === id);
}
