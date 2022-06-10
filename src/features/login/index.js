import { validateUsername } from "./utils";

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const username = formData.get("username");

  if (validateUsername(username)) {
    setUrl(username);
  }
}

function setUrl(username) {
  const urlParams = new URLSearchParams();
  urlParams.set("username", username);
  window.location.search = urlParams;
}
