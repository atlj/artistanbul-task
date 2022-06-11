import {
  convertTodoDayToHtml,
  convertTodoToHtml,
  generateTodoDayId,
} from "../main/utils";

export function validateNewTodoForm(form) {
  return form.get("title").trim() !== "" && form.get("date") !== "";
}

export function addTodoToDate(todo, date) {
  const todoNode = convertTodoToHtml(todo);
  const todoDayNode = document.getElementById(generateTodoDayId(date));
  todoDayNode.appendChild(todoNode);
}

export function createTodoDayAndTodo(todo, date) {
  const todoNode = convertTodoToHtml(todo);
  const todoDayNode = convertTodoDayToHtml(date, [todoNode]);

  return todoDayNode;
}
