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
    createUser(username);
    hideLoginScreen();
    showMainScreen();
  }
}

function createUser(username) {
  user = new User(username);
}

function hideLoginScreen() {
  const loginScreen = document.getElementById("login-screen");
  loginScreen.classList.add("screen--hidden");
}

function showMainScreen() {
  const mainScreen = document.getElementById("main-screen");

  mainScreen.classList.remove("screen--hidden");
}

export { user };
