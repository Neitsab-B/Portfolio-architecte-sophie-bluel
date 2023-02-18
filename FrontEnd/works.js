// WORKS.JS

//-------------------------------------------------------------------------------------------------------------------

// CREATION DES PROJETS SUR L'INDEX

const filtersContainer = document.querySelector("#filters");
const divGallery = document.querySelector(".gallery");

// fonction pour appeller l'API des projets
async function getDataWorks() {
  const r = await fetch("http://localhost:5678/api/works");
  try {
    if (r.ok === true) {
      return r.json();
    }
  } catch (error) {
    console.log("erreur");
  }
}

// fonction pour créer tous les projets sur l'index
function createWorks() {
  getDataWorks().then((dataWorks) => {
    document.querySelector(".gallery").innerHTML = "";
    dataWorks.forEach((work) => {
      const figureWork = document.createElement("figure");
      const imageWork = document.createElement("img");
      const titleWork = document.createElement("figcaption");

      // attribution des parents

      divGallery.appendChild(figureWork);
      figureWork.appendChild(imageWork);
      figureWork.appendChild(titleWork);

      //attribution des titres, images, alt, taille etc

      imageWork.src = work.imageUrl;
      imageWork.crossOrigin = "anonymous";
      imageWork.style.width = "310px";
      imageWork.style.height = "413px";
      imageWork.alt = work.title;
      titleWork.innerText = work.title;
    });
  });
}

// création des projets au loading de la page index
createWorks();

//----------------------------------------------------------------------------------------------------------------------

// CREATION DES FILTRES SUR L'INDEX

const btnAll = document.querySelector("#btn-all");
const selectCategory = document.querySelector("select");

// fonction pour appeller l'API des catégories
async function getCategories() {
  const r = await fetch("http://localhost:5678/api/categories");
  try {
    if (r.ok === true) {
      return r.json();
    }
  } catch (error) {
    console.log("erreur");
  }
}

// appel de l'API catégories pour créer les bouttons et les options
getCategories().then((dataCategories) => {
  dataCategories.forEach((categories) => {
    // création des boutons
    const categoriesButtons = document.createElement("button");
    categoriesButtons.textContent = categories.name;
    categoriesButtons.name = categories.name;

    // création des options du select de la modale 2
    const categoriesOptions = document.createElement("option");
    categoriesOptions.innerText = categories.name;
    categoriesOptions.setAttribute("id", `${categories.id}`);
    categoriesOptions.value = categoriesOptions.id;
    // attribution aux parents
    selectCategory.appendChild(categoriesOptions);
    filtersContainer.appendChild(categoriesButtons);

    // filtres clickables selon l'id de la catégorie
    categoriesButtons.addEventListener("click", function () {
      if (categories.id === 1) {
        getDataWorks().then((dataWorks) => {
          const filteredWork = dataWorks.filter(
            (work) => work.categoryId === 1
          );

          //effacement de la page avant le filtre

          document.querySelector(".gallery").innerHTML = "";

          filteredWork.forEach((work) => {
            const figureWork = document.createElement("figure");
            const imageWork = document.createElement("img");
            const titleWork = document.createElement("figcaption");

            // attribution des parents

            divGallery.appendChild(figureWork);
            figureWork.appendChild(imageWork);
            figureWork.appendChild(titleWork);

            //attribution des titres, images, alt, taille etc

            imageWork.crossOrigin = "anonymous";
            imageWork.src = work.imageUrl;
            imageWork.style.width = "310px";
            imageWork.style.height = "413px";
            imageWork.alt = work.title;
            titleWork.innerText = work.title;
          });
        });
      }
      if (categories.id === 2) {
        getDataWorks().then((dataWorks) => {
          const filteredWork = dataWorks.filter(
            (work) => work.categoryId === 2
          );
          document.querySelector(".gallery").innerHTML = "";
          filteredWork.forEach((work) => {
            const figureWork = document.createElement("figure");
            const imageWork = document.createElement("img");
            const titleWork = document.createElement("figcaption");

            divGallery.appendChild(figureWork);
            figureWork.appendChild(imageWork);
            figureWork.appendChild(titleWork);

            imageWork.src = work.imageUrl;
            imageWork.crossOrigin = "anonymous";
            imageWork.style.width = "310px";
            imageWork.style.height = "413px";
            imageWork.alt = work.title;
            titleWork.innerText = work.title;
          });
        });
      }
      if (categories.id === 3) {
        getDataWorks().then((dataWorks) => {
          const filteredWork = dataWorks.filter(
            (work) => work.categoryId === 3
          );
          document.querySelector(".gallery").innerHTML = "";
          filteredWork.forEach((work) => {
            const figureWork = document.createElement("figure");
            const imageWork = document.createElement("img");
            const titleWork = document.createElement("figcaption");

            divGallery.appendChild(figureWork);
            figureWork.appendChild(imageWork);
            figureWork.appendChild(titleWork);

            imageWork.src = work.imageUrl;
            imageWork.crossOrigin = "anonymous";
            imageWork.style.width = "310px";
            imageWork.style.height = "413px";
            imageWork.alt = work.title;
            titleWork.innerText = work.title;
          });
        });
      }
    });
  });
});

// création du filtre "tous"

btnAll.addEventListener("click", function () {
  createWorks();
});
