// MODALE.JS

//--------------------------------------------------------------------------------------------------------------------

// gestion de l'apparition/disparition des modales

// CONSTANTES

const editModalTriggers = document.querySelectorAll(".open-return-edit-modal");
const triggerAddModal = document.querySelector(".open-add-modal");
const editModalContainer = document.querySelector(".edit-modal-container");
const addModalContainer = document.querySelector(".add-modal-container");
const triggerCloseModals = document.querySelectorAll(".close-modals");

// EVENTS LISTENERS
// eventlisteners pour chaque bouton + les overlays des modales pour la fermeture

editModalTriggers.forEach((triggers) =>
  triggers.addEventListener("click", openOrBackToEditModal)
);

triggerAddModal.addEventListener("click", openAddModal);

triggerCloseModals.forEach((triggers) =>
  triggers.addEventListener("click", closeModals)
);

// event pour fermer la modale en appuyant sur Echap

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModals(e);
  }
});

// FONCTIONS

function openOrBackToEditModal() {
  addModalContainer.style.display = "none";
  editModalContainer.style.display = "block";
  createWorksModal();
}

function openAddModal() {
  editModalContainer.style.display = "none";
  addModalContainer.style.display = "block";
}

function closeModals() {
  addModalContainer.style.display = "none";
  editModalContainer.style.display = "none";
}

//------------------------------------------------------------------------------------------------------------------

// Appel de l'API et création des icones de suppression

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

// fonction pour créer tous les projets et leurs icones de suppression fonctionnels
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

      // écouteur pour supprimer les projets en fonction de leur ID en cliquant sur la poubelle
      trashCanIcon.addEventListener("click", function () {
        let x = trashCanIcon.id;
        fetch(`http://localhost:5678/api/works/${x}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionStorage["adminToken"]}`,
            "Content-Type": "application/json",
          },
        });
      });
    });
  });
}

//------------------------------------------------------------------------------------------------------------------

// aperçu de l'image selectionnée par l'utilisateur

// CONSTANTES

const addPicturesElements = document.querySelector("#add-picture-elements");
const imageInput = document.querySelector("#image-input");

// EVENTS LISTENERS

imageInput.addEventListener("change", imgPreview);

// FONCTIONS

function imgPreview() {
  //ReGex
  const fileExtension = /\.(jpg|png)$/i;
  //le $ signifie que le mot doit se trouver à la fin, le /i signifie case insensitive donc insensible aux majuscules/min.

  // test si le fichier.lenght = 0 ou si l'extension ne contient pas le fileExtension. Le .test renvoit un false si ça ne correspond pas.
  if (this.files.length === 0 || !fileExtension.test(this.files[0].name)) {
    return;
  }

  // disparition des éléments pour correspondre à la maquette
  addPicturesElements.style.display = "none";

  const file = this.files[0];
  const file_reader = new FileReader();
  file_reader.readAsArrayBuffer(file);
  file_reader.addEventListener("load", (e) => displayImage(e, file));
}

function displayImage(e, file) {
  const figure_element = document.createElement("figure");
  figure_element.id = "selected_image";

  const image = document.createElement("img");
  const image_blob = new Blob([e.target.result], { type: file.type });
  image.src = URL.createObjectURL(image_blob);

  figure_element.appendChild(image);
  document.querySelector("#image-preview").appendChild(figure_element);
}

//-----------------------------------------------------------------------------------------------------------------------

// fonction pour ajouter des projets sur la modale 2

const validation = document.querySelector("#validation-add-button");

validation.addEventListener("click", function (e) {
  e.preventDefault()
  const newWorkTitle = document.getElementById("input-work-title").value;
  const newWorkCategory = document.querySelector("select").value;
  const categoryInt = parseInt(newWorkCategory);
  const newWorkImage = document.querySelector("#image-input").files[0];
  const formData = new FormData();

  if (!newWorkImage) {
    alert("Veuillez sélectionner une image");
  } else {
    formData.append("image", newWorkImage, newWorkImage.name);
    formData.append("title", newWorkTitle);
    formData.append("category", categoryInt);

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage["adminToken"]}`,
      },
      body: formData,
    }).then(function (r) {
      if (r.ok) {
        console.log("projet envoyé avec succès !");
      } else {
        console.log(r);
      }
    });
  }
});
