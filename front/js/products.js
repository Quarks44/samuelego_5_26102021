// Page Produit

/* Une page “produit” qui affiche (de manière dynamique) les détails du produit sur lequel l'utilisateur a cliqué depuis la page d’accueil.
/Depuis cette page, l’utilisateur peut sélectionner une quantité, une couleur, et ajouter le produit à son panier.
Cette page présente un seul produit ; elle aura un menu déroulant permettant à l'utilisateur de choisir une option de personnalisation, 
ainsi qu’un input pour saisir la quantité. Ces éléments doivent être pris en compte dans le panier. */

// récupération id
const str = window.location;
const url = new URL(str);
const productId = url.searchParams.get("id");
console.log("Test #02 - variable: productId = id du produit");
console.log(productId);
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
  }
}

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
      console.log(
        "Test #03 - variable: product = description totale du produit"
      );
      console.log(product);

      let productTitle = document.querySelector("title");
      productTitle.textContent = `${product.name}`;
      console.log("Test #04 - variable: productTitle = Nom du produit");
      console.log(productTitle);

      let productImg = document.createElement("img");
      document.querySelector(".item__img").appendChild(productImg);
      productImg.setAttribute("src", `${product.imageUrl}`);
      productImg.setAttribute("alt", `${product.altTxt}`);
      console.log(
        "Test #05 - variable: productImg = image du produit et description"
      );
      console.log(productImg);

      let productName = document.getElementById("title");
      productName.textContent = `${product.name}`;

      console.log("Test #06 - variable: productName = nom du produit");
      console.log(productName);

      let productPrice = document.getElementById("price");
      productPrice.textContent = `${product.price}`;

      console.log("Test #07 - variable: productPrice = prix du produit");
      console.log(productPrice);

      let productDescription = document.getElementById("description");
      productDescription.textContent = `${product.description}`;
      console.log(
        "Test #08 - variable: productDescription = description du produit en latin !"
      );
      console.log(productDescription);

      document.querySelector("#colors").insertAdjacentHTML(
        "beforeend",
        product.colors.map(
          (color) =>
            `<option id= "valueColor" value="${color}">${color}</option>`
        )
      );
      console.log(
        "Test #09 - variable: valueColor = option couleur du produit"
      );
      console.log(valueColor);
    });

  // Ecoute événèment sur le bouton ajouter au panier
  const cartButton = document.getElementById("addToCart");
  // Écoute du bouton et envoie au panier
  cartButton.addEventListener("click", (event) => {
    event.preventDefault();
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
    console.log(
      "Test #10 - variable: productOptions = ajout produit au panier avec couleur, ID et quantité"
    );
    console.log(productOptions);
  });
}
displayProduct();
