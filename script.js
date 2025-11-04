const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");
const filterBtns = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
  list.innerHTML = "";
  const filtered = tasks.filter(task => {
    if (filter === "active") return !task.done;
    if (filter === "completed") return task.done;
    return true;
  });
  
  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.toggle("completed", task.done);

    const span = document.createElement("span");
    span.textContent = task.text;
    li.appendChild(span);

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.classList.add("delete");
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks(filter);
    };
    li.appendChild(delBtn);

    li.onclick = (e) => {
      if (e.target.tagName !== "BUTTON") {
        task.done = !task.done;
        saveTasks();
        renderTasks(filter);
      }
    };

    list.appendChild(li);
  });
}

addBtn.onclick = () => {
  const text = input.value.trim();
  if (text) {
    tasks.push({ text, done: false });
    input.value = "";
    saveTasks();
    renderTasks();
  }
};

clearAllBtn.onclick = () => {
  tasks = [];
  saveTasks();
  renderTasks();
};

filterBtns.forEach(btn => {
  btn.onclick = () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderTasks(btn.dataset.filter);
  };
});

renderTasks();
