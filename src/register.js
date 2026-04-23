function register() {
  const username = document.getElementById("regUser").value.trim();
  const password = document.getElementById("regPass").value.trim();

  if (!username || !password) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  // 👉 lấy danh sách account
  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  // 👉 check trùng username
  const exist = accounts.find(acc => acc.username === username);

  if (exist) {
    alert("❌ Username đã tồn tại");
    return;
  }

  // 👉 thêm user mới
  accounts.push({ username, password });

  localStorage.setItem("accounts", JSON.stringify(accounts));

  alert("✅ Đăng ký thành công");

  // quay lại login
  window.location.href = "login.html";
}
