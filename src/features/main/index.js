import { User } from "../user";
import { convertTodoDayToHtml } from "./utils";

function onClickAddNewTask(event) {
  event.preventDefault();

  document.getElementById("modal-screen").classList.remove("screen--hidden");
  document.getElementById("modal-input-title").focus();
}

document
  .getElementById("add-todo")
  .addEventListener("click", onClickAddNewTask);

export function writeTodosToDom() {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");
  const user = new User(username);

  const todoDayContainer = document.getElementById("todo-day-container");

  Object.keys(user.categorizedTodos).forEach((date) => {
    const todoDayNode = convertTodoDayToHtml(date, user.categorizedTodos[date]);
    todoDayContainer.appendChild(todoDayNode);
  });
}
