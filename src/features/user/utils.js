export function addTodo(todos, todo) {
  return [...todos, todo];
}

export function deleteTodoById(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}
