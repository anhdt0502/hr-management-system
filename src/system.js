class System {
  constructor() {
    this.users = [];
    this.tasks = [];
    this.kpis = [];
  }

  // ===== USER =====
  addUser(user) {
    this.users.push(user);
  }

  getUserById(id) {
    return this.users.find(u => u.id === id);
  }

  deleteUser(id) {
    this.users = this.users.filter(u => u.id !== id);
  }

  // ===== TASK =====
  assignTask(task) {
    this.tasks.push(task);
  }

  getTasksByUser(userId) {
    return this.tasks.filter(t => t.assignedTo === userId);
  }

  updateTaskStatus(taskId, status) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) task.updateStatus(status);
  }

  // ===== KPI =====
  addKPI(kpi) {
    this.kpis.push(kpi);
  }

  updateKPI(userId, value) {
    const kpi = this.kpis.find(k => k.userId === userId);
    if (kpi) kpi.updateAchieved(value);
  }

  // ===== REPORT =====
  getReport() {
    return this.users.map(user => {
      const tasks = this.getTasksByUser(user.id);
      const kpi = this.kpis.find(k => k.userId === user.id);

      return {
        name: user.name,
        totalTasks: tasks.length,
        kpi: kpi ? `${kpi.achieved}/${kpi.target}` : 'N/A'
      };
    });
  }
}

window.System = System;
