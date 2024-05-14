const addBtn = document.querySelector(".main-input-btn");
const input = document.querySelector(".main-input");
const inputIcon = document.querySelector(".main-input-icon");
const form = document.querySelector(".main-form");
const listContainer = document.querySelector(".main-list");
const srotSelector = document.getElementById("sort-by");
const progressText = document.querySelector(".progress-bar-text");
const progressBar = document.querySelector(".progress-bar-fill");
const deleteAllBtn = document.querySelector(".delete-all-btn");

function addTask() {
  addBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const task = input.value.trim();

    task === "" ? invalidInput() : addTaskToList(task);
    addProgressText();
    checkDeleteBtn();
  });
}
input.addEventListener("input", () => {
  if (input.classList.contains("invalid-input")) {
    form.firstChild.nextSibling.remove();
    input.classList.remove("invalid-input");
    inputIcon.classList.remove("invalid-icon");
  }
});

function invalidInput() {
  if (!input.classList.contains("invalid-input")) {
    form.insertAdjacentHTML(
      "afterbegin",
      `
      <label class="invalid-label">Please enter a task</label>
      `
    );

    input.classList.add("invalid-input");
    inputIcon.classList.add("invalid-icon");
  }
}

function addTaskToList(task) {
  const date = new Date();

  listContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="item-box new-item-ani" data-date="${date}">
      <button class="item-del-btn">
        <i class="fa-regular fa-trash-can"></i>
      </button>
      <li class="item-title">${task}</li>
      <button class="item-check-btn">
        <i class="fa-regular fa-circle-check"></i>
      </button>
    </div>
    `
  );
  input.value = "";
  saveData();
}
addTask();

listContainer.addEventListener("click", function (e) {
  if (e.target.closest(".item-del-btn")) {
    e.target.closest(".item-del-btn").parentElement.remove();
    saveData();
    checkDeleteBtn();
  } else if (e.target.closest(".item-check-btn")) {
    e.target
      .closest(".item-check-btn")
      .parentElement.classList.toggle("item-checked");
    saveData();
  }
  addProgressText();
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTasks() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTasks();

function sortTasks() {
  const tasks = Array.from(listContainer.children);

  tasks
    .sort((a, b) => {
      const aText = a.textContent.trim();
      const bText = b.textContent.trim();

      const aDate = new Date(a.getAttribute("data-date"));
      const bDate = new Date(b.getAttribute("data-date"));

      const aStatus = a.classList.contains("item-checked");

      if (srotSelector.value === "name") return aText.localeCompare(bText);
      if (srotSelector.value === "date") return aDate - bDate;
      if (srotSelector.value === "status") return aStatus ? -1 : 1;
    })
    .map((task) => {
      listContainer.appendChild(task);
    });
  saveData();
}
srotSelector.addEventListener("change", sortTasks);

function addProgressText() {
  const completedTasksNumber = Array.from(listContainer.children).filter(
    (task) => task.classList.contains("item-checked")
  ).length;

  const tasksNumber = listContainer.children.length;

  const completedTasksPercentage = Number(
    (completedTasksNumber / tasksNumber) * 100
  ).toFixed();

  tasksNumber > 0
    ? (progressText.textContent = `${completedTasksNumber} out of ${tasksNumber} (${completedTasksPercentage}%)`)
    : (progressText.textContent = "Add your first task!");

  progressBar.style.width =
    tasksNumber > 0 ? `${completedTasksPercentage}%` : 0;
}
addProgressText();

function reset() {
  localStorage.clear();
  showTasks();
  checkDeleteBtn();
  addProgressText();
}

deleteAllBtn.addEventListener("click", () => {
  reset();
});

function checkDeleteBtn() {
  listContainer.children.length > 0
    ? deleteAllBtn.classList.remove("hidden")
    : deleteAllBtn.classList.add("hidden");
}
checkDeleteBtn();
