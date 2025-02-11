// LOGIN.JS

// bouton connecter mis dans une constante
const toConnectBtn = document.getElementById("btn-login");

toConnectBtn.addEventListener("click", function (e) {
  // preventdefault car sinon la page de se recharge avant d'exécuter le code
  e.preventDefault();
  // récupération des inputs de l'utilisateur
  let inputMail = document.getElementById("email").value;
  let inputPassword = document.getElementById("password").value;
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: inputMail,
      password: inputPassword,
    }),
  })
    .then(async function (response) {
      if (response.ok) {
        response = await response.json();
        console.log("Les identifiants sont corrects");
        sessionStorage.setItem("adminToken", response.token);
        window.location.href = "index.html";
      } else {
        alert("Utilisateur ou mot de passe incorrect");
      }
    })
    .catch(function (error) {
      console.error(error);
    });
});
