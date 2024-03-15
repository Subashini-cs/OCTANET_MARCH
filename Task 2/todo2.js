let numTasks = document.querySelector(".all-tasks"),
  numCompletedTasks = document.querySelector(".completed-tasks"),
  btnAddTask = document.querySelector(".addBtn"),
  addTask = document.querySelector(".addTask"),
  addDate = document.querySelector(".addDate"),
  prioritySelect = document.querySelector(".priority"),
  tasksContainer = document.querySelector(".list-tasks"),
  tasks = [];

window.onload = () => {
  addTask.focus();
};

const calcNumTasks = () => {
  numTasks.textContent = tasks.filter(task => !task.completed).length;
};

const calcFinishedTasks = () => {
  numCompletedTasks.textContent = tasks.filter(task => task.completed).length;
};

const checkTasks = () => {
  if (tasks.length === 0) {
    let message = document.createElement("span");
    message.classList.add("empty-tasks");
    message.textContent = "No tasks yet.";
    tasksContainer.appendChild(message);
  } else {
    let emptyMessage = document.querySelector(".empty-tasks");
    if (emptyMessage) emptyMessage.remove();
  }
};

const renderTasks = () => {
  tasksContainer.innerHTML = "";
  tasks.forEach(task => {
    let taskElement = document.createElement("div");
    taskElement.classList.add("task");

    let detailElement = document.createElement("p");
    detailElement.classList.add("detail");
    detailElement.textContent = task.name + " - " + task.date + " - " + task.priority;
    
    let actionsElement = document.createElement("div");
    actionsElement.classList.add("actions");

    let deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fas", "fa-trash-alt", "deleteBtn");
    
    let finishBtn = document.createElement("i");
    finishBtn.classList.add("fas", "fa-check", "finishBtn");

    if (task.completed) {
      taskElement.classList.add("finished");
      finishBtn.classList.replace("fa-check", "fa-history");
      finishBtn.classList.replace("finishBtn", "not-finishBtn");
    }

    actionsElement.appendChild(finishBtn);
    actionsElement.appendChild(deleteBtn);

    taskElement.appendChild(detailElement);
    taskElement.appendChild(actionsElement);

    tasksContainer.appendChild(taskElement);
  });
};

checkTasks();
calcNumTasks();
calcFinishedTasks();

btnAddTask.addEventListener("click", () => {
  if (addTask.value.trim() === "" || addDate.value.trim() === "") return;

  let newTask = {
    name: addTask.value,
    date: addDate.value,
    priority: prioritySelect.value,
    completed: false
  };

  tasks.push(newTask);
  tasks.sort((a, b) => {
    // Sort by priority (High > Medium > Low)
    if (a.priority !== b.priority) {
      return a.priority === "High" ? -1 : b.priority === "High" ? 1 : 0;
    }
    // Sort by date (earlier date first)
    return new Date(a.date) - new Date(b.date);
  });

  renderTasks();
  checkTasks();
  calcNumTasks();

  addTask.value = "";
  addDate.value = "";
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("deleteBtn")) {
    let parentTask = event.target.closest(".task");
    let index = tasks.findIndex(task => task.name === parentTask.querySelector(".detail").textContent.split(" - ")[0]);
    tasks.splice(index, 1);
    
    parentTask.remove();
    checkTasks();
    calcNumTasks();
    calcFinishedTasks();
  } else if (event.target.classList.contains("finishBtn") || event.target.classList.contains("not-finishBtn")) {
    let parentTask = event.target.closest(".task");
    let index = tasks.findIndex(task => task.name === parentTask.querySelector(".detail").textContent.split(" - ")[0]);
    tasks[index].completed = !tasks[index].completed;
    parentTask.classList.toggle("finished");

    event.target.classList.toggle("fa-check");
    event.target.classList.toggle("fa-history");
    event.target.classList.toggle("finishBtn");
    event.target.classList.toggle("not-finishBtn");

    calcNumTasks();
    calcFinishedTasks();
  }
});
