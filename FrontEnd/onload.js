// admin mode si le token de l'admin est confirmé dans le storage

const editTop = document.getElementById("edit-top");
const loginLi = document.getElementById("login-li");
const editPicture = document.getElementById("edit-picture");
const editText = document.getElementById("edit-text");
const editWorks = document.getElementById("edit-works");
const filters = document.getElementById("filters");

if (sessionStorage["adminToken"]) {
  editTop.style.display = "flex";
  loginLi.innerText = "logout"
  editPicture.style.display = "flex";
  editText.style.display = "flex";
  editWorks.style.display = "flex";
  filters.style.display ="none"
}
