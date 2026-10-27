const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const list = document.querySelector("#task-list");

let nextId = 1;

// Create the text element of a task
function createTaskText(text) {
  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = text;
  return span;
}

// Create a task <li> with an Edit button and append it to the list
function addTask(text) {
  const li = document.createElement("li");
  li.dataset.id = nextId++;

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";
  editBtn.dataset.action = "edit";

  li.append(createTaskText(text), editBtn);
  list.append(li);
}

// Add new task
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  addTask(text);
  taskInput.value = "";
});

// Edit button clicked: replace text with an input
function startEdit(e) {
  const btn = e.target.closest("[data-action='edit']");
  if (!btn) return;

  const li = btn.closest("li");
  const textEl = li.querySelector(".task-text");
  if (!textEl) return; // already in edit mode

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "edit-input";
  editInput.value = textEl.textContent;
  editInput.dataset.id = li.dataset.id;

  textEl.remove();
  li.prepend(editInput);
  editInput.focus();
}

// Enter pressed in the input: save and switch back to text
function saveEdit(e) {
  if (e.key !== "Enter") return;
  if (!e.target.classList.contains("edit-input")) return;

  const newText = e.target.value.trim();
  if (!newText) return; // do not save empty text

  const li = e.target.closest("li");
  e.target.remove();
  li.prepend(createTaskText(newText));
}

// One delegated handler on the parent list
function handleListEvent(e) {
  if (e.type === "click") startEdit(e);
  if (e.type === "keydown") saveEdit(e);
}

list.addEventListener("click", handleListEvent);
list.addEventListener("keydown", handleListEvent);