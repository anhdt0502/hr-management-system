
document.addEventListener("DOMContentLoaded", () => {
  const auth = new AuthService();

  if (!auth.isLogin()) {
    window.location.href = "login.html";
  }
  init();
});
function init() {
  system = new System();
  system.load();
  render(system.getAll());

}
let system;
let editingId = null;
let currentPage = 1;
const perPage = 7;

function render(users) {
  const start = (currentPage - 1) * perPage;
  const pageData = users.slice(start, start + perPage);
  const kpiService = new KPIService(users);
  const top = kpiService.getTop();
  const total = users.reduce((sum, u) => sum + u.kpi, 0);
  const avg = users.length ? total / users.length : 0;
  const top3 = kpiService.getTopN(Math.min(3, users.length));
  const icons = ["🥇", "🥈", "🥉"];

  document.getElementById("topUser").innerHTML = `

  🏆 Top 1: ${top.name} - ${top.kpi.toLocaleString()}
  <img src="./img/${top.avatar}" width="360 " style="border-radius:50%">`;

  document.getElementById("kpiSummary").innerHTML = `
    🟢 Đạt KPI: ${kpiService.countAchieved()} |
    🔴 Chưa đạt: ${kpiService.countNotAchieved()}  `;

  document.getElementById("dashboard").innerHTML = `
  👥 Nhân sự: ${users.length} <br><br>
  💰 Tổng KPI: ${total.toLocaleString()} <br><br>
  📊 Trung bình: ${Math.round(avg).toLocaleString()} `;

  let topHtml = "<h3>🏆 Top 3 Nhân sự</h3>";
  top3.forEach((u, index) => {

    topHtml += `
    <p>
      ${icons[index]} ${u.name} - ${u.kpi.toLocaleString()} VND
    </p>
  `;
  });
  document.getElementById("top3").innerHTML = topHtml;

  let html = `
    <table >
      <tr>
        <th>ID</th>
        <th>Avatar</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Bank</th>
        <th>Join Work</th>
        <th>KPI</th>
        <th>Action</th>

      </tr>`;

  pageData.forEach(u => {
    const isLow = u.kpi < 400000000;
    html += `
      <tr>
        <td>${u.id}</td>
        <td> <img src="./img/${u.avatar}"  width="40"></td>
        <td>${u.name}</td>
        <td>${u.phone}</td>
        <td>${u.address}</td>
        <td>${u.bank}</td>
        <td>${u.joinDate}</td>
        <td style="color:${u.kpi < 400000000 ? 'red' : 'green'}">
            ${u.kpi.toLocaleString()}</td>
        <td>
          <button onclick="editUser(${u.id})">Edit</button>
          <button onclick="deleteUser(${u.id})">Delete</button>
        </td>
      </tr>
    `;
    console.log(u);
  });

  html += `</table>`;

  const totalPages = Math.ceil(users.length / perPage);

  html += `<div style="margin-top:10px;">`;

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button onclick="goPage(${i})"
        style="${i === currentPage ? 'background:#333;color:#fff' : ''}">
        ${i}
      </button>
    `;
  }

  html += "</div>";


  document.getElementById("table").innerHTML = html;

}

function goPage(page) {
  currentPage = page;
  const keyword = document.getElementById("search").value;

  if (keyword) {
    render(system.search(keyword));
  } else {
    render(system.getAll());
  }
}

function resetSystem() {
  localStorage.clear();
  location.reload();
}

function reloadSystem() {

  location.reload();
  render(system.getAll());
}

function addUser() {
  const idInput = Number(document.getElementById("id").value);
  const rawKpi = document.getElementById("kpi").value;
  const kpi = Number(rawKpi.replace(/\./g, ""));

  const data = {
    id: idInput,
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    bank: document.getElementById("bank").value,
    joinDate: document.getElementById("joinDate").value,
    avatar: document.getElementById("avatar").value || "1.jpg",
    kpi: document.getElementById("kpi").value
  };
  // if ( !name || !phone || !address || !bank || !joinDate ) {
  //   showToast("⚠️ Vui lòng điền đầy đủ thông tin");
  //   return;
  // }
  //  CHECK TRÙNG ID
  if (!editingId && system.users.some(u => u.id === data.id)) {
    showToast("ID đã tồn tại!", "error");
    return;
  }

  // CREATE
  else {
    const user = new User(
      data.id,
      data.name,
      data.phone,
      data.address,
      data.bank,
      data.joinDate,
      data.avatar,
      kpi.kpi,
    );

    system.add(user);
    showToast("Đã thêm!");

  }
  render(system.getAll());
  clearForm();

}

function clearForm() {
  document.getElementById("id").value = "";
  document.getElementById("kpi").value = "";
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("avatar").value = "";
  document.getElementById("address").value = "";
  document.getElementById("bank").value = "";
  document.getElementById("joinDate").value = "";
}

function updateUser() {
  const id = Number(document.getElementById("id").value);
  const rawKpi = document.getElementById("kpi").value;
  const kpi = Number(rawKpi.replace(/\./g, ""));

  const data = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    bank: document.getElementById("bank").value,
    joinDate: document.getElementById("joinDate").value,
    avatar: document.getElementById("avatar").value || "1.jpg",
    kpi: kpi
  };

  system.updateUser(id, data);

  render(system.getAll());
  clearForm();
}

function editUser(id) {
  const u = system.getById(id);

  document.getElementById("id").value = u.id;
  document.getElementById("name").value = u.name;
  document.getElementById("phone").value = u.phone;
  document.getElementById("address").value = u.address;
  document.getElementById("bank").value = u.bank;
  document.getElementById("joinDate").value = u.joinDate;
  document.getElementById("avatar").value = u.avatar;
}

function deleteUser(id) {
  const confirmDelete = confirm("Bạn có chắc muốn xóa?");

  if (!confirmDelete) return;

  system.delete(id);
  render(system.getAll());
}

function handleSearch() {
  const keyword = document.getElementById("search").value;
  currentPage = 1;
  render(system.search(keyword));
}


function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const div = document.createElement("div");
  div.className = `toast-msg toast-${type}`;
  div.innerText = message;
  toast.appendChild(div);
  setTimeout(() => div.classList.add("show"), 100);

  setTimeout(() => {
    div.classList.remove("show");
    setTimeout(() => div.remove(), 400);
  }, 2000);
}

const kpiInput = document.getElementById("kpi");

kpiInput.addEventListener("input", function () {
  // bỏ dấu chấm cũ
  let value = this.value.replace(/\./g, "");

  // chỉ giữ số
  value = value.replace(/\D/g, "");

  // format lại
  this.value = Number(value).toLocaleString("vi-VN");
});
clearForm();

function showKpiModal() {
  const kpiService = new KPIService(system.getAll());
  const list = kpiService.getAchieved();

  if (list.length === 0) {
    showToast("❌ Không có ai đạt KPI");
    return;
  }

  let html = "";

  list.forEach(u => {
    html += `<p>🟢 ${u.name} - ${u.kpi.toLocaleString()}</p>`;
  });

  document.getElementById("kpiList").innerHTML = html;
  document.getElementById("kpiModal").style.display = "flex";
}


function closeKpiModal() {
  document.getElementById("kpiModal").style.display = "none";
}

let isPlaying = localStorage.getItem("music") === "on";

function toggleMusic() {
  const music = document.getElementById("bgMusic");
  const btn = document.getElementById("musicBtn");

  if (isPlaying) {
    music.pause();
    btn.innerText = "🔇";
    localStorage.setItem("music", "off");
  } else {
    music.play();
    btn.innerText = "🔊";
    localStorage.setItem("music", "on");
  }

  isPlaying = !isPlaying;
}
function logout() {
  const auth = new AuthService();
  auth.logout();
  window.location.href = "login.html";
}
init();
window.onload = () => {
  document.body.addEventListener("click", () => {
    const music = document.getElementById("bgMusic");
    music.play();
  }, {once: true});
};

