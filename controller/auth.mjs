import * as authController from "../data/auth.mjs";

// 회원을 생성하는 함수
export async function signup(req, res, next) {
  const { userid, password, name, email } = req.body;
  const users = await authController.createUsers(userid, password, name, email);
  if (users) {
    res.status(201).json(users);
  }
}

// 로그인하는 함수
export async function login(req, res, next) {
  const { userid, password } = req.body;
  const user = await authController.login(userid, password);
  if (user) {
    res.status(201).json(`${userid}님 로그인 완료!`);
  } else {
    res
      .status(404)
      .json({ message: `${userid}님 아이디 또는 비밀번호를 확인하세요` });
  }
}
