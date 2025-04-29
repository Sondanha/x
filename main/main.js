// 현재 페이지의 주소 기반으로 서버 주소 자동 설정 (Cloudtype 배포용)
const SERVER_URL = location.origin;

// 회원가입 버튼 처리
const signupButton = document.querySelector(
  "button[type=submit]:not(#login-button)"
);
if (signupButton && window.location.pathname.includes("signup")) {
  signupButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const userid = document.getElementById("signup-userid")?.value.trim();
    const password = document.getElementById("signup-password")?.value.trim();
    const name = document.getElementById("signup-name")?.value.trim();
    const email = document.getElementById("signup-email")?.value.trim();

    if (!userid || !password || !name || !email) {
      alert("모든 항목을 입력하세요.");
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid, password, name, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "회원가입 실패");
        return;
      }

      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      window.location.href = "/login";
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 중 문제가 발생했습니다.");
    }
  });
}

// 로그인 버튼 처리
const loginButton = document.querySelector("button[type=submit]");
if (loginButton && window.location.pathname.includes("login")) {
  loginButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const userid = document.getElementById("login-userid")?.value.trim();
    const password = document.getElementById("login-password")?.value.trim();

    if (!userid || !password) {
      alert("아이디와 비밀번호를 모두 입력하세요.");
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "로그인 실패");
        return;
      }

      alert("로그인 성공!");
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ userid: data.userid, name: data.name })
      );
      window.location.href = "/posts.html";
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 중 문제가 발생했습니다.");
    }
  });
}
