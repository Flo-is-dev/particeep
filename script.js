const form = document.getElementById("form");

// Sélectionne tous les éléments HTML avec la classe "drop-zone__input" et boucle à travers chacun d'eux en utilisant forEach. Pour chaque élément, on sélectionne l'élément parent avec la classe "drop-zone" et le stocke dans la constante "dropZoneElement".
document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  //  Qd un fichier est sélectionné, on appelle la fonction "updateThumbnail" avec l'élément "dropZoneElement" et le fichier sélectionné en tant que paramètres.
  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  // Qd on déplace un fichier sur la Drop-zone on ajoute une class et On previent le comportement d'affichage par défaut
  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  // La class ajoutée se retire quand on enlève la souris
  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  // On ajoute un événement "drop" à l'élément "dropZoneElement" qui se déclenche lorsque l'utilisateur dépose un fichier dans la zone de dépôt.  on affiche en console le fichier Droppé
  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();
    // console.log(e.dataTransfer.files);

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      // console.log(inputElement.files);
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone--over");
  });
});

// Cette fonction met à jour l'aperçu de l'image de la zone de dépôt en ajoutant une miniature de l'image sélectionnée ou déposée.
const updateThumbnail = (dropZoneElement, file) => {
  // console.log(dropZoneElement);
  // console.log(file);
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // On retire le prompt la premier fois
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // On crée l'element thumbnail qui n'existe pas initalement
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // Montre les fichiers images
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
};

// événement "submit" à l'élément "form" qui se déclenche lorsque l'utilisateur soumet le formulaire. prévient comportement par défaut et réinitialise le formulaire au click
form.addEventListener("submit", (e) => {
  e.preventDefault();
  form.reset();
});
