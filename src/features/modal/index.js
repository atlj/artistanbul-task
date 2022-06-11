function onClickCancel() {
  document.getElementById("modal-screen").classList.add("screen--hidden");
}

document
  .getElementById("modal-cancel")
  .addEventListener("click", onClickCancel);
