let form = document.getElementById("form");
let taskInput = document.getElementById("taskInput");
let dateInput = document.getElementById("dateInput");
let briefInput = document.getElementById("briefInput");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (taskInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [];
let acceptData = () => {
  data.push({
    task: taskInput.value,
    date: dateInput.value,
    briefInput: briefInput.value,
  });
  console.log(data);
  localStorage.setItem("data", JSON.stringify(data));

  createTask();
};

let createTask = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `<div id= ${y}>
    <span class="fw-bold">${x.task}</span>
    <span class="small text-secondary">${x.date}</span>

    <p>${x.briefInput}</p>
    <span class="options">
      <i data-bs-toggle="modal" data-bs-target="#form" onclick= editTask(this) class="fa-solid fa-pencil"></i>
      <i onclick= removeTask(this);createTask() class="fa-solid fa-trash"></i>
    </span>
  </div>`);
  });
  resetForm();
};

let resetForm = () => {
  taskInput.value = "";
  dateInput.value = "";
  briefInput.value = "";
};

let removeTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));

  console.log(e.parentElement.parentElement.id)
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  taskInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  briefInput.value = selectedTask.children[2].innerHTML;
  removeTask(e);
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createTask();
  console.log(data)
})();
