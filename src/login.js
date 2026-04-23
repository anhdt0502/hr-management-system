class LoginPage {
  constructor() {
    this.auth = new AuthService();
  }

  handleLogin() {
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;

    if (this.auth.login(u, p)) {
      window.location.href = "index.html";
    } else {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  }
}
function goRegister() {
  window.location.href = "register.html";
}
const page = new LoginPage();

// 👉 gọi từ HTML
function login() {
  page.handleLogin();
}
