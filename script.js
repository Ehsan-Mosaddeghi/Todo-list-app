const addBtn = document.querySelector(".main-input-btn");
const input = document.querySelector(".main-input");
const listContainer = document.querySelector(".main-list");
const srotSelector = document.getElementById("sort-by");

function addTask() {
  addBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const task = input.value;

    task === "" ? alert("You must eneter something") : addTaskToList(task);
  });
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
  } else if (e.target.closest(".item-check-btn")) {
    e.target
      .closest(".item-check-btn")
      .parentElement.classList.toggle("item-checked");
    saveData();
  }
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTasks() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTasks();

srotSelector.addEventListener("change", () => {
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
});
