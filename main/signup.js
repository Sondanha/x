const SERVER_URL = location.origin;

const signupButton = document.querySelector("#signup-button");
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
