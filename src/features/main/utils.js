import { User } from "../user";

export function createNode(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

export function convertTodoDayToHtml(date, todos) {
  const markup = `<div class="todo-day" id="${generateTodoDayId(date)}">
    <div class="todo-day__date-row text text--h2">
      <img
        src="/icons/Calendar.svg"
        alt="Calendar icon"
        class="todo-day__date-row--icon"
      />
      ${new Date(date).toDateString()}
    </div>
  </div>`;

  const todoDay = createNode(markup);

  todos.forEach((todo) => {
    todoDay.appendChild(convertTodoToHtml(todo));
  });

  return todoDay;
}

export function generateTodoDayId(date) {
  return `todo-day-${date}`;
}

export function generateTodoContainerId(id) {
  return `todo-${id}`;
}

export function convertTodoToHtml(todo) {
  const markup = `<div class="todo" id="${generateTodoContainerId(todo.id)}">
    <div class="todo__box todo__box--clickable  " id="check-button" >
      <img src="/icons/CheckDisabled.svg" alt="Check icon" id="check-icon" class="todo__check-icon ${
        todo.isDone ? "" : "todo__check-icon--hidden"
      }" />
    </div>
    <input
      value="${todo.description}"
      disabled
      id="todo-input"
      class="todo__box todo__box--text text text--t1 ${
        todo.isDone ? "todo--disabled" : ""
      }"
    />
    <div class="todo__box todo__box--clickable" id="edit-button">
      <img src="/icons/Edit.svg" alt="Edit icon" class="todo__edit-icon" />
    </div>
    <div class="todo__box todo__box--clickable" id="delete-button">
      <img src="/icons/Trash.svg" alt="Delete icon" class="todo__delete-icon" />
    </div>
  </div>`;

  const todoNode = createNode(markup);

  addCallbacksToTodo(todoNode, todo.id);

  return todoNode;
}

export function addCallbacksToTodo(todoNode, id) {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");
  const user = new User(username);

  const checkButton = todoNode.querySelector("#check-button");
  const checkIcon = todoNode.querySelector("#check-icon");
  const input = todoNode.querySelector("#todo-input");
  const editButton = todoNode.querySelector("#edit-button");
  const deleteButton = todoNode.querySelector("#delete-button");

  checkButton.addEventListener("click", () => {
    if (!input.disabled) return;

    if (checkIcon.classList.contains("todo__check-icon--hidden")) {
      checkIcon.classList.remove("todo__check-icon--hidden");
      input.classList.add("todo--disabled");
    } else {
      checkIcon.classList.add("todo__check-icon--hidden");
      input.classList.remove("todo--disabled");
    }

    user.toggleTodo(id);
  });

  editButton.addEventListener("click", () => {
    if (input.classList.contains("todo--disabled")) return;

    if (input.disabled) {
      input.classList.add("todo__box--text-active");
      input.disabled = false;
      input.focus();
      changeEditIconToCheckIcon(editButton);
    } else {
      input.classList.remove("todo__box--text-active");
      input.disabled = true;
      changeCheckIconToEditIcon(editButton);
      user.changeTodoDescription(id, input.value);
    }
  });

  deleteButton.addEventListener("click", () => {
    todoNode.remove();
    const date = user.todos.find((todo) => todo.id === id).date;
    user.removeTodo(id);

    const todoDates = Object.keys(user.categorizedTodos);
    if (!todoDates.includes(date)) {
      const todoDay = document.getElementById(generateTodoDayId(date));
      todoDay.remove();
    }
  });
}

function changeEditIconToCheckIcon(buttonNode) {
  const markup = `<img src="/icons/Check.svg" alt="Check icon" class="todo__check-icon" />`;

  const checkIcon = createNode(markup);

  buttonNode.children[0].remove();
  buttonNode.appendChild(checkIcon);
}

function changeCheckIconToEditIcon(buttonNode) {
  const markup = `<img src="/icons/Edit.svg" alt="Edit icon" class="todo__edit-icon" />`;

  const editIcon = createNode(markup);

  buttonNode.children[0].remove();
  buttonNode.appendChild(editIcon);
}

export function sortDates(dates) {
  return dates.sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);

    return dateB - dateA;
  });
}
