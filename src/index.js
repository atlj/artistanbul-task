import "./styles/index.scss";
import "./features/login";
import "./features/newTodo";
import "./features/main";
import "./features/modal";
import { writeTodosToDom } from "./features/main";

function hideLoginScreen() {
  const loginScreen = document.getElementById("login-screen");
  loginScreen.classList.add("screen--hidden");
}

function showMainScreen() {
  const mainScreen = document.getElementById("main-screen");

  mainScreen.classList.remove("screen--hidden");
  writeTodosToDom();
}

function handleUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");

  if (username) {
    const loginForm = document.getElementById("login-form");
    const usernameInput = loginForm.querySelector("input[name=username]");
    usernameInput.value = username;
    hideLoginScreen();
    showMainScreen();
  }
}

handleUrl();
