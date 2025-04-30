const SERVER_URL = location.origin;
const loginButton = document.querySelector("#login-button");

if (loginButton) {
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

      if (!response.ok || !data.token) {
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
