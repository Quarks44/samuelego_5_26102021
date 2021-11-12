// ETAPE 6

// URL de API d'un produit
let productsURL = "http://localhost:3000/api/products/" + product_id;

// extraction ID
let productId = "107fb5b75607497b96722bda5b504926";
let create_item_page_url = "http://localhost:3000/api/products/" + productId;
console.log(create_item_page_url);

// API
function FetchItem(create_item_page_url) {
  // https://developer.mozilla.org/fr/docs/Web/API/URL
  fetch(create_item_page_url)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        console.log("mauvaise réponse du réseau"); //https://developer.mozilla.org/fr/docs/Web/API/Console/error
      }
    })
    .catch(function (error) {
      console.log("problème avec fetch");
    });
}

// Création élément (produit)
function create_Product(elements) {
  const kanap = document.create_Element("a"); // https://developer.mozilla.org/fr/docs/Web/API/Document/Document
  kanap.href = "http://localhost:3000/api/products/" + productId;

  // Création article, name, image et description
  const product_article = document.createElement("article"); // const article

  const product_name = document.createElement("h3"); // const name
  product_name.innerHTML = elements.name; // insertion lien HTML
  product_name.classList.add("productName"); // ajout class productName

  const product_picture = document.createElement("img"); // const imageUrl
  product_picture.src = elements.ImageUrl;
  product_picture.alt = elements.Alt;

  const product_descrption = document.createElement("p"); // const description
  product_descrption.innerHTML = elements.description;
  product_descrption.classList.add("productDescription"); // ajout class productDescription

  // Page produit (DOM)
  product_article.appendChild(product_name);
  product_article.appendChild(product_picture);
  product_article.appendChild(product_descrption);
}

// Récuperation via API des informations produits
var title = document.getElementById("title");
var price = document.getElementById("price");
var description = document.getElementById("description");
var colorDescription = document.getElementById("colors");

// Insertion detail dans page produit
// ajout
//function detail_Product(elements){
// end function

// ETAPE 5

// Récupération ID de l'url de la page produit
var paramsString = location.search;
var searchParams = new URLSearchParams(paramsString);
var product_id = searchParams.get("product_id");
