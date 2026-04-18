function renderUsers(system) {
  const container = document.getElementById("output");

  let html = `
    <h2>Danh sách nhân viên</h2>
    <table border="1" cellpadding="10">
      <tr>
        <th>Name</th>
        <th>Tasks</th>
        <th>KPI</th>
      </tr>
  `;

  system.users.forEach(user => {
    const tasks = system.getTasksByUser(user.id);
    const kpi = system.kpis.find(k => k.userId === user.id);

    html += `
      <tr>
        <td>${user.name}</td>
        <td>${tasks.length}</td>
        <td>${kpi ? kpi.achieved + "/" + kpi.target : "N/A"}</td>
      </tr>
    `;
  });

  html += `</table>`;

  container.innerHTML = html;
}

window.renderUsers = renderUsers;
