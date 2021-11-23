//etape 7

// Récupération donnée localstorage

let productLocalStorage = JSON.parse(localStorage.getItem("product-ID")); // https://tutowebdesign.com/localstorage-javascript.php

// Ajout prodduit (localStorage) dans le panier
function ProductToCart() {
  for (let item of productLocalStorage) {
    createCart(item);
  }
}

// Récupération quantité

let quantity = document.getElementsByClassName("itemQuantity"); // https://developer.mozilla.org/fr/docs/Web/API/Document/getElementsByClassName

let totalQuantity = document.getElementsByClassName("totalQuantity");
