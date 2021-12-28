// récupération id
const str = window.location;
const url = new URL(str);
const productId = url.searchParams.get("id");
const objectURL = "http://localhost:3000/api/products/" + productId;

// Ajout d'un produit au panier
function addToCart(productItem) {
  let cartItems = localStorage.getItem("cartItems");
  // Si panier vide
  if (cartItems === null) {
    let items = [productItem];
    let itemsStr = JSON.stringify(items); // https://www.w3schools.com/js/js_json_stringify.asp
    localStorage.setItem("cartItems", itemsStr);
    alert("Produit ajouté au panier !");
  } else {
    // Si le panier contient des produits de même id et même couleur
    let items = JSON.parse(cartItems);
    const resultat = items.find((product) => {
      // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/find
      if (product.id === productItem.id && product.color === productItem.color)
        return true;
      return false;
    });
    if (resultat != undefined) {
      items = items.map((item, index) => {
        if (item.id === productItem.id && item.color === productItem.color) {
          item.quantity += productItem.quantity;
        }
        return item;
      });
    } else {
      // Si le panier contient des produits différents
      items.push(productItem);
    }
    let itemsStr = JSON.stringify(items);
    localStorage.setItem("cartItems", itemsStr);
    alert("Produit ajouté au panier !");
  } // end else panier produit id + couleur
} //  end function addToCart

// Récupération des produits de l'API
function displayProduct() {
  fetch("http://localhost:3000/api/products/" + productId)
    .then(function (res) {
      return res.json();
    })
    .catch((err) => {
      // Une erreur est survenue
      console.log("erreur");
    })

    // Insertion des données de l'API dans le DOM (titre, img, nom, prix, description et option couleurs)
    .then(function (getProduct) {
      const product = getProduct;

      let productTitle = document.querySelector("title");
      productTitle.textContent = `${product.name}`;

      let productImg = document.createElement("img");
      document.querySelector(".item__img").appendChild(productImg);
      productImg.setAttribute("src", `${product.imageUrl}`);
      productImg.setAttribute("alt", `${product.altTxt}`);

      let productName = document.getElementById("title");
      productName.textContent = `${product.name}`;

      let productPrice = document.getElementById("price");
      productPrice.textContent = `${product.price}`;

      let productDescription = document.getElementById("description");
      productDescription.textContent = `${product.name}`;

      document.querySelector("#colors").insertAdjacentHTML(
        "beforeend",
        product.colors.map(
          (color) =>
            `<option id= "valueColor" value="${color}">${color}</option>`
        )
      );
    }); // end then(function (getProduct)

  // Ecoute événèment sur le bouton ajouter au panier
  const cartButton = document.getElementById("addToCart");
  cartButton.addEventListener("click", (event) => {
    event.preventDefault(); // https://www.w3schools.com/jsref/event_preventdefault.asp
    let productColor = document.getElementById("colors").value;
    let productQuantity = parseInt(document.getElementById("quantity").value);
    // Si aucune couleur sélectionnée
    if (productColor == "") {
      alert("Veuillez sélectionner une couleur");
      return;
    }
    // Si quantité = 0
    else if (productQuantity == 0) {
      alert("Veuillez renseigner une quantité");
      return;
    }
    // Création d'un tableau contenant l'id, la couleur et la quantité du produit ajouté
    const productOptions = {
      id: productId,
      color: productColor,
      quantity: productQuantity,
    };
    addToCart(productOptions);
  }); // end const cartButton
} // end function displayProduct
displayProduct();
