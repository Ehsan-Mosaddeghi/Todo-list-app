// SELECTORS
// main slectors
const listContainer = document.querySelector(".main-list");
const form = document.querySelector(".main-form");
//  buttons
const addBtn = document.querySelector(".main-input-btn");
const deleteAllBtn = document.querySelector(".delete-all-btn");
//  input
const input = document.querySelector(".main-input");
const inputIcon = document.querySelector(".main-input-icon");
const label = document.querySelector(".invalid-label");
const sortSelector = document.getElementById("sort-by");
// progress
const progressText = document.querySelector(".progress-bar-text");
const progressBar = document.querySelector(".progress-bar-fill");

// EVENT HANDLERS
// Adding tasks
function addTask(event) {
  event.preventDefault();

  const task = input.value.trim();
  task === "" ? invalidInput() : createTask(task);
  saveTasks();
}

function createTask(task) {
  const date = new Date();

  listContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="item-box new-item-ani" data-date="${date}">
      <button class="item-del-btn">
        <i class="fa-regular fa-trash-can"></i>
      </button>
      <li class="item-title">${task}</li>
      <button class="item-complete-btn">
        <i class="fa-regular fa-circle-check"></i>
      </button>
    </div>
    `
  );
  input.value = "";
}

// Input Validation
function invalidInput() {
  if (input.classList.contains("invalid-input")) return;

  label.classList.remove("hidden");
  input.classList.add("invalid-input");
  inputIcon.classList.add("invalid-icon");
}

function validInput() {
  if (!input.classList.contains("invalid-input")) return;

  label.classList.add("hidden");
  input.classList.remove("invalid-input");
  inputIcon.classList.remove("invalid-icon");
}

// Delete button

function deleteTask(e) {
  const deleteBtn = e.target.closest(".item-del-btn");
  deleteBtn?.parentElement.remove();
  saveTasks();
}

// Complete button

function completeTask(e) {
  const completeBtn = e.target.closest(".item-complete-btn");
  completeBtn?.parentElement.classList.toggle("item-completed");
  saveTasks();
}

// Saving Tasks in local storage

function saveTasks() {
  localStorage.setItem("data", listContainer.innerHTML);
  updateProgress();
  updateDeleteAllBtn();
}

// showing Tasks from local storage

function showTasks() {
  listContainer.innerHTML = localStorage.getItem("data");
  updateProgress();
  updateDeleteAllBtn();
}

// Sorting Tasks

function sortTasks() {
  const tasks = Array.from(listContainer.children);

  tasks
    .sort((a, b) => {
      const aText = a.textContent.trim();
      const bText = b.textContent.trim();

      const aDate = new Date(a.getAttribute("data-date"));
      const bDate = new Date(b.getAttribute("data-date"));

      const aStatus = a.classList.contains("item-completed");

      if (sortSelector.value === "name") return aText.localeCompare(bText);
      if (sortSelector.value === "date") return aDate - bDate;
      if (sortSelector.value === "status") return aStatus ? -1 : 1;
    })
    .map((task) => {
      listContainer.appendChild(task);
    });
}

// Updating progress bar and text

function updateProgress() {
  const completedTaskNumbers = Array.from(listContainer.children).filter(
    (task) => task.classList.contains("item-completed")
  ).length;

  const taskNumbers = listContainer.children.length;

  const completedTasksPercentage = Number(
    (completedTaskNumbers / taskNumbers) * 100
  ).toFixed();

  taskNumbers > 0
    ? (progressText.textContent = `${completedTaskNumbers} out of ${taskNumbers} (${completedTasksPercentage}%)`)
    : (progressText.textContent = "Add your first task!");

  progressBar.style.width =
    taskNumbers > 0 ? `${completedTasksPercentage}%` : 0;
}

// Delete all button

function reset() {
  localStorage.clear();
  showTasks();
}

function updateDeleteAllBtn() {
  listContainer.children.length > 0
    ? deleteAllBtn.classList.remove("hidden")
    : deleteAllBtn.classList.add("hidden");
}

// EVENT LISTENERS
// Click event listeners
addBtn.addEventListener("click", addTask);
listContainer.addEventListener("click", deleteTask);
listContainer.addEventListener("click", completeTask);
deleteAllBtn.addEventListener("click", reset);

// Other event Listeners
input.addEventListener("input", validInput);
sortSelector.addEventListener("change", sortTasks);

// On Load
window.addEventListener("load", showTasks);
