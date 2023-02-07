// modale

let modal = null;
const focusableSelector = "button, a, input";
let focusables = [];

const openModal = function (e) {
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute("href"));
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal
    .querySelector("#close-modal-icon")
    .addEventListener("click", closeModal);
  modal
    .querySelector(".js-stop-modal")
    .addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector("#close-modal-icon")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-stop-modal")
    .removeEventListener("click", stopPropagation);
  modal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

const focusInModal = function (e) {
  e.preventDefault();
  let index = focusables.findIndex((f) => f === modal.querySelector(":focus"));
  index++;
  if (index >= focusables.length) {
    index = 0;
  }
  focusables[index].focus();
};

document.querySelector(".js-modal").addEventListener("click", openModal);

window.addEventListener("keydown", function (e) {
  // event pour fermer la modale en appuyant sur Echap
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
  if (e.key === "Tab" && modal !== null) {
    focusInModal(e);
  }
});

//---------------------------------------------------------------

const galleryEditor = document.querySelector(".gallery-editor");

// fonction pour appeller l'API des projets
async function getDataWorksModal() {
  const r = await fetch("http://localhost:5678/api/works");
  try {
    if (r.ok === true) {
      return r.json();
    }
  } catch (error) {
    console.log("erreur");
  }
}

// fonction pour créer tous les projets
function createWorksModal() {
  getDataWorksModal().then((dataWorks) => {
    document.querySelector(".gallery-editor").innerHTML = "";
    dataWorks.forEach((work) => {
      const figureWork = document.createElement("figure");
      const imageWork = document.createElement("img");
      const edit = document.createElement("figcaption");
      const trashCanIcon = document.createElement("i");

      // attribution des parents

      galleryEditor.appendChild(figureWork);
      figureWork.appendChild(imageWork);
      figureWork.appendChild(edit);
      figureWork.appendChild(trashCanIcon);

      //attribution des titres, images, alt, taille etc

      imageWork.src = work.imageUrl;
      imageWork.crossOrigin = "anonymous";
      imageWork.style.width = "78px";
      imageWork.style.height = "100px";
      imageWork.alt = work.title;
      edit.innerText = "éditer";

      // création des icones poubelles pour chaque projet
      trashCanIcon.className = "fa-sharp fa-solid fa-trash-can";
      // attribution des id des poubelles en fonction de l'id du projet
      trashCanIcon.id = work.id;

      // écouteur pour supprimer les projets en fonction de leur ID
      trashCanIcon.addEventListener("click", function () {
        let x = trashCanIcon.id
          fetch(`http://localhost:5678/api/works/${x}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${sessionStorage["adminToken"]}`,
              "Content-Type": "application/json",
            }
          })
      });
    });
  });
}

// création des projets au chargement de la modale
createWorksModal();

// --------------------------------------------------------------
