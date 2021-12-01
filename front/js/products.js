//  API + productId
async function fetchProductById(productId) {
  return fetch("http://localhost:3000/api/products/" + productId)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
} // end function

// affichage 1 produit
function displayKanap(product) {
  // selecteur +  attributs
  const productPicture = document.querySelector("div.item__img");
  const productPhoto = document.createElement("img");
  productPhoto.setAttribute("src", product.imageUrl);
  productPhoto.setAttribute("alt", product.altTxt);
  productPicture.appendChild(productPhoto);

  const productTitle = document.getElementById("title");
  productTitle.innerText = product.name;

  const productPrice = document.getElementById("price");
  productPrice.innerText = product.price;

  const productDescription = document.getElementById("description");
  productDescription.innerText = product.description;

  let productColor = document.getElementById("colors");
  let listColor = product.colors;

  // liste couleurs
  for (let color of listColor) {
    let displayColor = document.createElement("option");
    displayColor.setAttribute("value", color);
    displayColor.innerText = color;
    productColor.appendChild(displayColor);
  }
} // end function

// Principale Fonction

async function main() {
  let url = new URL(location.href); //  url
  let productId = url.searchParams.get("id");
  let product = await fetchProductById(productId); // attendre reponse API
  displayKanap(product); // affichage produit et passe le product ID
  addToCart(productId); // Ajoute la fonctionalite au bouton "addToCart"
} // end function

main();

// Fonction ajout au panier

function addToCart(productId) {
  // #1 - Recupere les donnees du panier en cours
  let panier_en_cours = JSON.parse(localStorage.getItem("kanap_panier"));
  if (!panier_en_cours) panier_en_cours = [];

  // #2 - Recupere le bouton
  let buttonAddToCart = document.getElementById("addToCart");

  // #3  - ajoute la fonction au bouton
  buttonAddToCart.addEventListener(
    "click", // https://www.w3schools.com/jsref/met_element_addeventlistener.asp
    // #4 - defini la fonction
    function () {
      // informations du produit à ajouter au panier au format Json

      if (checkColor() && checkQuantity()) {
        // #5 - defini le produit a ajouter
        let produit_choisi = {
          id: productId,
          quantity: parseInt(document.getElementById("quantity").value, 10), // https://www.w3schools.com/jsreF/jsref_parseint.asp
          color: document.getElementById("colors").value,
        }; // end let

        // #6 - ajoute le produit au panier

        panier_en_cours.push(produit_choisi);
        localStorage.setItem("kanap_panier", JSON.stringify(panier_en_cours));
      } else {
        alert("Veuillez choisir une couleur et une quantité");
      }
    } // end function
  ); // buttonAddToCart.addEventListener
} // end function

// Récupération de la liste des produits ajoutés au localStorage
// let datasInStorage = JSON.parse(localStorage.getItem('product-ID'));

//    verifier couleur et quantité autorisée

function checkColor() {
  let kanapColor = document.getElementById("colors").value;
  if (kanapColor != "") {
    return true;
  }
} //end function

function checkQuantity() {
  let kanapQuantity = document.getElementById("quantity").value;
  if (kanapQuantity <= 100 && kanapQuantity > 0) {
    return true;
  }
} // end function
