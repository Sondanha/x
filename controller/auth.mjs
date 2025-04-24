import * as authRepository from "../data/auth.mjs";

// 회원을 생성하는 함수
export async function signup(req, res, next) {
  const { userid, password, name, email } = req.body;
  const users = await authRepository.createUsers(userid, password, name, email);
  if (users) {
    res.status(201).json(users);
  }
}

// 로그인하는 함수
export async function login(req, res, next) {
  const { userid, password } = req.body;
  const user = await authRepository.login(userid, password);
  if (user) {
    req.session.user = { userid };
    res.status(201).json(`${userid}님 로그인 완료!`);
  } else {
    res
      .status(404)
      .json({ message: `${userid}님 아이디 또는 비밀번호를 확인하세요` });
  }
}

// 로그인 여부 확인 (GET /auth/me)
export async function me(req, res) {
  if (!req.session?.user) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }
  const user = await authRepository.findByUserId(req.session.user.userid);
  res.status(200).json(user);
}

// 로그아웃
export async function logout(req, res) {
  req.session.destroy(() => {
    res.status(200).json({ message: "로그아웃 되었습니다." });
  });
}
