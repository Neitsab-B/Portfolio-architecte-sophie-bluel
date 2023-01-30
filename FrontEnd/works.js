// test de retour de catégorie par get categories

// coucou github

async function getCategoriesWorks() {
  const r = await fetch("http://localhost:5678/api/categories")
  if (r.ok === true) {
    return r.json()
  }
}

getCategoriesWorks()

// old work

const divGallery = document.querySelector(".gallery");

async function getDataWorks() {
  const r = await fetch("http://localhost:5678/api/works");
  if (r.ok === true) {
    return r.json();
  }
  throw new Error("Impossible de contacter le serveur");
}

function createWorks() {
  getDataWorks().then((dataWorks) => {
    dataWorks.forEach((work) => {
      const figureWork = document.createElement("figure");
      const imageWork = document.createElement("img");
      const titleWork = document.createElement("figcaption");

      // attribution des parents

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

createWorks();

// BOUTONS DE FILTRES

const btnAll = document.querySelector(".filterAll");

btnAll.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  createWorks();
});

// filtre objets

const btnFilterObjects = document.querySelector(".filterObjects");

btnFilterObjects.addEventListener("click", function () {
  getDataWorks().then((dataWorks) => {
    const filteredObjects = dataWorks.filter(
      (objects) => objects.categoryId === 1
    );
    document.querySelector(".gallery").innerHTML = "";
    filteredObjects.forEach((objects) => {
      const figureWork = document.createElement("figure");
      const imageWork = document.createElement("img");
      const titleWork = document.createElement("figcaption");

      // attribution des parents

      divGallery.appendChild(figureWork);
      figureWork.appendChild(imageWork);
      figureWork.appendChild(titleWork);

      imageWork.src = objects.imageUrl;
      imageWork.crossOrigin = "anonymous";
      imageWork.style.width = "310px";
      imageWork.style.height = "413px";
      imageWork.alt = objects.title;
      titleWork.innerText = objects.title;
    });
  });
});

// filtre appartements

const btnFilterLogements = document.querySelector(".filterLogements");

btnFilterLogements.addEventListener("click", function () {
  getDataWorks().then((dataWorks) => {
    const filteredLogements = dataWorks.filter(
      (logements) => logements.categoryId === 2
    );
    document.querySelector(".gallery").innerHTML = "";
    filteredLogements.forEach((logements) => {
      const figureWork = document.createElement("figure");
      const imageWork = document.createElement("img");
      const titleWork = document.createElement("figcaption");

      // attribution des parents

      divGallery.appendChild(figureWork);
      figureWork.appendChild(imageWork);
      figureWork.appendChild(titleWork);

      imageWork.src = logements.imageUrl;
      imageWork.crossOrigin = "anonymous";
      imageWork.style.width = "310px";
      imageWork.style.height = "413px";
      imageWork.alt = logements.title;
      titleWork.innerText = logements.title;
    });
  });
});

// filtre hôtels et restaurants

const btnFilterHotelsAndRestaurants = document.querySelector(
  ".filterHotelsAndRestaurants"
);

btnFilterHotelsAndRestaurants.addEventListener("click", function () {
  getDataWorks().then((dataWorks) => {
    const filteredHotelsAndRestaurants = dataWorks.filter(
      (hotelsAndRestaurants) => hotelsAndRestaurants.categoryId === 3
    );
    document.querySelector(".gallery").innerHTML = "";
    filteredHotelsAndRestaurants.forEach((hotelsAndRestaurants) => {
      const figureWork = document.createElement("figure");
      const imageWork = document.createElement("img");
      const titleWork = document.createElement("figcaption");

      // attribution des parents

      divGallery.appendChild(figureWork);
      figureWork.appendChild(imageWork);
      figureWork.appendChild(titleWork);

      imageWork.src = hotelsAndRestaurants.imageUrl;
      imageWork.crossOrigin = "anonymous";
      imageWork.style.width = "310px";
      imageWork.style.height = "413px";
      imageWork.alt = hotelsAndRestaurants.title;
      titleWork.innerText = hotelsAndRestaurants.title;
    });
  });
});
