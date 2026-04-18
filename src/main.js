// main.js
import { User } from './user.js';
function runSystem() {
  const system = new System();

  system.addUser(new User(1, "Leader Ads", "admin"));
  system.addUser(new User(2, "Content Staff", "staff"));

  system.assignTask(new Task(1, "Chạy quảng cáo", 2));
  system.assignTask(new Task(2, "Viết content", 2));

  system.addKPI(new KPI(2, 100));
  system.updateKPI(2, 60);

  // 👉 Gọi render
  renderUsers(system);
}
