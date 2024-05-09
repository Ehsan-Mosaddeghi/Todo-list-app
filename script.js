const addBtn = document.querySelector(".main-input-btn");
const input = document.querySelector(".main-input");
const listContainer = document.querySelector(".main-list");

function addTask() {
  addBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const task = input.value;

    task === "" ? alert("You must eneter something") : addTaskToList(task);
  });
}

function addTaskToList(task) {
  listContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="item-box new-item-ani">
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
}
addTask();

listContainer.addEventListener("click", function (e) {
  if (e.target.closest(".item-del-btn")) {
    e.target.closest(".item-del-btn").parentElement.remove();
  } else if (e.target.closest(".item-check-btn")) {
    e.target
      .closest(".item-check-btn")
      .parentElement.classList.toggle("item-checked");
  }
});
