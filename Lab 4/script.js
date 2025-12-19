// === Model ===
class Task {
  constructor(description, completed = false, createdAt = null, id = null) {
    this.id = id || Date.now();
    this.description = description;
    this.completed = completed;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
  }
}

// === Controller ===
class TaskManager {
  constructor() {
    this.tasks = [];
    this.filter = "all";
    this.sortBy = "time";
    this.load(); // load tasks from localStorage
    this.render();
  }

  load() {
    const stored = JSON.parse(localStorage.getItem("tasks") || "[]");
    // Reconstruct Task instances properly
    this.tasks = stored.map(t => new Task(t.description, t.completed, t.createdAt, t.id));
  }

  save() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    this.render();
  }

  addTask(desc) {
    if (!desc.trim()) return;
    this.tasks.push(new Task(desc));
    this.save();
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
    this.save();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save();
  }

  editTask(id, newDesc) {
    const task = this.tasks.find(t => t.id === id);
    if (task && newDesc.trim()) {
      task.description = newDesc.trim();
      this.save();
    }
  }

  setFilter(filter) {
    this.filter = filter;
    this.render();
  }

  setSort(sortBy) {
    this.sortBy = sortBy;
    this.render();
  }

  getFilteredTasks() {
    let tasks = [...this.tasks];

    if (this.filter === "completed") tasks = tasks.filter(t => t.completed);
    else if (this.filter === "incomplete") tasks = tasks.filter(t => !t.completed);

    if (this.sortBy === "alpha") tasks.sort((a, b) => a.description.localeCompare(b.description));
    else tasks.sort((a, b) => a.createdAt - b.createdAt);

    return tasks;
  }

  render() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    const tasks = this.getFilteredTasks();
    for (const task of tasks) {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";

      const time = new Date(task.createdAt).toLocaleTimeString();

      li.innerHTML = `
        <span>${task.description} <small>(${time})</small></span>
        <div class="actions">
          <button class="toggle">✅</button>
          <button class="edit">✏️</button>
          <button class="delete">❌</button>
        </div>
      `;

      li.querySelector(".toggle").onclick = () => this.toggleTask(task.id);
      li.querySelector(".delete").onclick = () => this.deleteTask(task.id);
      li.querySelector(".edit").onclick = () => {
        const newDesc = prompt("Edit task:", task.description);
        if (newDesc !== null) this.editTask(task.id, newDesc);
      };

      list.appendChild(li);
    }
  }
}

// === App Setup ===
const manager = new TaskManager();

document.getElementById("addBtn").onclick = () => {
  const input = document.getElementById("taskInput");
  manager.addTask(input.value);
  input.value = "";
};

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.onclick = () => manager.setFilter(btn.dataset.filter);
});

document.querySelectorAll(".sort-btn").forEach(btn => {
  btn.onclick = () => manager.setSort(btn.dataset.sort);
});
