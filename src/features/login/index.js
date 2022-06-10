import { User } from "../user";
import { validateUsername } from "./utils";

let user = null;

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const username = formData.get("username");

  if (validateUsername(username)) {
    setUrl(username);
    hideLoginScreen();
    showMainScreen();
  }
}

function setUrl(username) {
  const urlParams = new URLSearchParams();
  urlParams.set("username", username);
  window.location.search = urlParams;
}

export { user };
