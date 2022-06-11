import { sortDates } from "../main/utils";
import { User } from "../user";
import {
  addTodoToDate,
  validateNewTodoForm,
  createTodoDayAndTodo,
} from "./utils";

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");
const user = new User(username);

const newTodoForm = document.getElementById("new-todo");

newTodoForm.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const form = new FormData(this);

  if (validateNewTodoForm(form)) {
    const date = form.get("date");
    const title = form.get("title");
    const id = user.lastId;

    if (user.checkIfDateExists(date)) {
      user.addTodo({ description: title, date, isDone: false });
      addTodoToDate({ description: title, isDone: false, id, date }, date);
    } else {
      user.addTodo({ description: title, date, isDone: false });
      writeTodoDayToDom(title, id, date);
    }

    this.reset();
    document.getElementById("modal-screen").classList.add("screen--hidden");
  }
}

function writeTodoDayToDom(title, id, date) {
  const todoDayNode = createTodoDayAndTodo(
    { description: title, isDone: false, id, date },
    date
  );

  const sortedDates = sortDates(Object.keys(user.categorizedTodos));

  const dateIndex = sortedDates.findIndex(
    (currentDate) => currentDate === date
  );

  const todoDayContainer = document.getElementById("todo-day-container");

  if (dateIndex !== -1) {
    if (dateIndex === sortedDates.lenght - 1) {
      todoDayContainer.appendChild(todoDayNode);
    } else {
      todoDayContainer.insertBefore(
        todoDayNode,
        todoDayContainer.children[dateIndex]
      );
    }
  }
}

function onClickCancel() {
  document.getElementById("modal-screen").classList.add("screen--hidden");
}

document
  .getElementById("modal-cancel")
  .addEventListener("click", onClickCancel);
