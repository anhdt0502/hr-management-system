class Task {
  constructor(id, title, assignedTo, deadline = null) {
    this.id = id;
    this.title = title;
    this.assignedTo = assignedTo;
    this.status = 'todo';
    this.deadline = deadline;
  }

  updateStatus(newStatus) {
    this.status = newStatus;
  }
}

window.Task = Task;
