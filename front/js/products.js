//  API + productId
async function fetchId(productId) {
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

// constructor classe produit

class productClass {
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
  let product = await fetchId(productId); // attendre reponse API
  displayKanap(product); // affichage produit
}

main();
