import {
  addTodo,
  deleteTodoById,
  categorizeTodosByDate,
  changeTodoDescription,
} from "./utils";

export class User {
  constructor(username) {
    this.username = username;
  }

  get todos() {
    const localStorageTodos = localStorage.getItem("todos" + this.username);

    if (localStorageTodos === null) {
      return [];
    } else {
      return JSON.parse(localStorageTodos);
    }
  }

  set todos(data) {
    localStorage.setItem("todos" + this.username, JSON.stringify(data));
  }

  get lastId() {
    return this.todos.reduce((maxId, todo) => Math.max(maxId, todo.id), -1);
  }

  get categorizedTodos() {
    return categorizeTodosByDate(this.todos);
  }

  addTodo(todoWithoutId) {
    this.todos = addTodo(this.todos, { ...todoWithoutId, id: this.lastId + 1 });
  }

  removeTodo(id) {
    this.todos = deleteTodoById(this.todos, id);
  }

  changeTodoDescription(id, description) {
    this.todos = changeTodoDescription(this.todos, id, description);
  }
}
