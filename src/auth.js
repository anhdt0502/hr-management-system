class AuthService {
  constructor() {
    this.key = "auth_user";
  }

  login(username, password) {
    // 👉 demo (sau này thay API)
    if (username === "admin" && password === "123") {
      localStorage.setItem(this.key, username);
      return true;
    }
    return false;
    // const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    //
    // const user = accounts.find(
    //   acc => acc.username === username && acc.password === password
    // );
    //
    // if (user) {
    //   localStorage.setItem(this.key, username);
    //   return true;
    // }
    //
    // return false;
  }

  logout() {
    localStorage.removeItem(this.key);
  }

  isLogin() {
    return !!localStorage.getItem(this.key);
  }
}

window.AuthService = AuthService;
