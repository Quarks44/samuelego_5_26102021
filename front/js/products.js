// URL de API d'un produit
let productsURL = "http://localhost:3000/api/products/" + product_id;

// Récupération ID de l'url de la page produit
var paramsString = location.search;
var searchParams = new URLSearchParams(paramsString); //https://developer.mozilla.org/fr/docs/Web/API/URLSearchParams
var product_id = searchParams.get("product_id");

// API
function FetchID() {
  // https://developer.mozilla.org/fr/docs/Web/API/URL
  fetch(productsURL)
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

// constructor classe prodiuit

class classProduct {
  constructor(id, name, imageUrl, altTxt, price, description, colors) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.altTxt = altTxt;
    this.price = price;
    this.description = description;
    this.colors = colors;
  }
} //end class

// affichage Kanap // page 4 specification

function displayKanap(sofa) {
  const productTitle = document.getElementById("title"); //https://developer.mozilla.org/fr/docs/Web/API/Document/getElementById
  productTitle.textContent = kanap.name; //https://developer.mozilla.org/fr/docs/Web/API/Node/textContent

  const productPicture = document.getElementById("item__img");
  const productPhoto = document.createElement("img"); // https://developer.mozilla.org/fr/docs/Web/API/Document/createElement
  productPhoto.setAttribute("src", sofa.imageUrl); //https://developer.mozilla.org/fr/docs/Web/API/Element/setAttribute
  productPhoto.setAttribute("alt", sofa.altTxt);
  productPicture.appendChild(productPhoto); //https://developer.mozilla.org/fr/docs/Web/API/Node/appendChild

  const productPrice = document.getElementById("price");
  productPrice.innerHTML = sofa.price;

  const productDescription = document.getElementById("description");
  productDescription.innerHTML = sofa.description;

  const productColorDescription = document.getElementById("colors");
  productColorDescription.innerHTML = sofa.colors;

  // affichage couleur //etapae 7
  for (let displayColor of productColorDescription) {
    const color = document.createElement("option");
    color.setAttribute("value", displayColor);
    color.textContent = displayColor;
    productColorDescription.appendChild(color);
  } //end for
  return;
} // end function

// fonction principale
