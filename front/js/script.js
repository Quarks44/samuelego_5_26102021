//  API
async function fetchApi() {
  return fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
} // end function

// Affichage plusieurs produits

function displayAllKanaps(listofAllKanaps) {
  let = document.getElementById("items");
  //  lien  fiche produit
  const sofaId = document.createElement("a");
  sofaId.href = "product.html?id=" + listofAllKanaps._id;

  // Création Article
  const article = document.createElement("article");

  // Création Images
  const newProductPhoto = document.createElement("img");
  newProductPhoto.src = listofAllKanaps.imageUrl;
  newProductPhoto.alt = listofAllKanaps.altTxt;

  // Création Name
  const newProductTitle = document.createElement("h3");
  newProductTitle.innerHTML = listofAllKanaps.name;
  newProductTitle.classList.add("productName");

  // Création Description
  const newProductDescription = document.createElement("p");
  newProductDescription.innerHTML = listofAllKanaps.description;
  newProductDescription.classList.add("productDescription");

  // Ajout des éléments
  article.appendChild(newProductPhoto);
  article.appendChild(newProductTitle);
  article.appendChild(newProductDescription);
  sofaId.appendChild(article);
  document.getElementById("items").appendChild(sofaId);
} // end function

// Principale Fonction
async function main() {
  let listofAllKanaps = await fetchApi();
  for (let kanap of listofAllKanaps) {
    displayAllKanaps(kanap); // affichage
  }
}
main();
