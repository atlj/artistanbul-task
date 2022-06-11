export function addTodo(todos, todo) {
  return [...todos, todo];
}

export function deleteTodoById(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}

export function categorizeTodosByDate(todos) {
  const categorizedTodos = {};
  todos.forEach((todo) => {
    const date = todo.date;
    if (!categorizedTodos[date]) {
      categorizedTodos[date] = [];
    }
    categorizedTodos[date].push(todo);
  });
  return categorizedTodos;
}

export function changeTodoDescription(todos, id, description) {
  return todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, description };
    }
    return todo;
  });
}
