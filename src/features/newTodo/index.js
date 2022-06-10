const newTodoForm = document.getElementById("new-todo");

newTodoForm.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const form = new FormData(this);

  console.log(form.get("date"));
}
