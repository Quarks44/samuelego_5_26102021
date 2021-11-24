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
  displayKanap(product); // affichage produit
}

main();

// Fonction ajout au panier

function addToCart(basket) {
  buttonAddToCart.addEventListener('click', // https://www.w3schools.com/jsref/met_element_addeventlistener.asp
  function (dataCart) {
      // informations du produit à ajouter au panier au format Json
      let productJson = {
          id : productId,
          name : title.innerHTML,
          price : price.innerHTML,
          image : document.getElementById('imageItem').src,
          altText : document.getElementById('imageItem').alt,
          quantity : parseInt(document.getElementById('quantity').value, 10), // https://www.w3schools.com/jsreF/jsref_parseint.asp
          color : document.getElementById('colors').value,
      }

      // Récupération de la liste des produits ajoutés au localStorage
      let datasInStorage = JSON.parse(localStorage.getItem('product-ID'));

    } // end function