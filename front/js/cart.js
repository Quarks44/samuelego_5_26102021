// 1°) Récupération des données localStorage
function getLocalStorage() {
  let datasInStorage = JSON.parse(localStorage.getItem("kanap_panier"));
  console.log(datasInStorage);
}

// 2°) fonction Panier (Boucle)      --- EN COURS ---

function cart(product) {
  let section_cart_item = document.getElementById("cart__items");
  if (datasInStorage === null || datasInStorage.length == 0) {
    section_cart_item.innerHTML = "Votre panier est vide";
  } else {
    for (let x in datasInStorage) {
      //article
      let article = document.createElement("article");
      document.getElementById("cart__items").appendChild(article);
      article.className = "cart__items";
      article.setAttribute("data-id", datasInStorage[x].id);
      article.innerHTML = datasInStorage[x].id; //temporaire

      // image
      let imageContent = document.createElement("div");
      imageContent.classList.add("cart__item__img"); //https://www.w3schools.com/jsref/prop_element_classlist.asp
      let itemImage = document.createElement("img");
      itemImage.src = product.image;
      imageItem.alt = product.altText;
      imageContent.appendChild(imageItem);
      article.appendChild(imageContent);

      // nom du produit
      let nameProduct = document.createElement("h2");
      nameProduct.innerHTML = product.name;
      TitlePrice.appendChild(nameProduct);

      let content = document.createElement("div");
      content.classList.add("cart__item__content");

      // prix
      let TitlePrice = document.createElement("div");
      TitlePrice.classList.add("cart__item__content__titlePrice");

      let priceProduct = document.createElement("p");
      priceProduct.innerHTML = product.price + "€";
      TitlePrice.appendChild(priceProduct);

      // settings

      let settings = document.createElement("div");
      settings.classList.add("cart__item__content__settings");

      // couleur
      let productColor = document.createElement("p");
      productColor.innerHTML = product.color;
      listColor.appendChild(productColor);

      // quantité
      let settingsQuantity = document.createElement("div");
      settingsQuantity.classList.add("cart__item__content__settings__quantity");
      settings.appendChild(settingsQuantity);

      // input Settings

      let productQuantity = document.createElement("input");
      productQuantity.type = "number";
      productQuantity.name = "itemQuantity";
      productQuantity.classList.add("itemQuantity");
      productQuantity.min = 1;
      productQuantity.max = 100;
      productQuantity.value = product.quantity;
      productQuantity.dataset.value = parseInt(product.quantity, 10); //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
      settingsQuantity.appendChild(productQuantity);

      //  bouton supprimmer

      let settingsDelete = document.createElement("div");
      settingsDelete.classList.add("cart__item__content__settings__delete");
      settings.appendChild(settingsDelete);

      let deleteItem = document.createElement("p");
      deleteItem.innerHTML = "Supprimer";
      deleteItem.classList.add("deleteItem");
      settingsDelete.appendChild(deleteItem);

      section_cart_item.appendChild(article);
    }
  }
} // end fonction cart

/* 3°) fonction Totaux
Récupération totale des quantités
Récupération prix total
  */
function totauxQuantityPrices() {
  // Quantité Totale
  let totalQuantity = 0;
  for (let x = 0; x < productQuantity.length; x++) {
    totalQuantity += parseInt(productQuantity[x].value);
  }
  totalQuantity.innerHTML = totalQuantity;

  // Prix Total
  let allListPrice = document.querySelectorAll(
    ".cart__item__content__titlePrice p"
  );
  let ProductPrices = 0;
  for (let x = 0; x < allListPrice.length; x++) {
    ProductPrices +=
      parseInt(allListPrice[x].innerHTML) * productQuantity[x].value;
  }
  totalPrice.innerHTML = ProductPrices;
} // end totalQuantityPrices

// 4°) Fonction modif quantité

function modifQuantity() {
  for (let input of productQuantity) {
    input.addEventListener("change", function () {
      totauxQuantityPrices();
      input.dataset.value = input.value;

      for (let x = 0; x < datasInStorage.length; x++) {
        datasInStorage[x].quantity = productQuantity[x].dataset.value;
      }
      localStorage.setItem("product-ID", JSON.stringify(datasInStorage));
    });
  }
} // End function modifQuantity

// 5°) Fonction Suppression d’un article

function deleteItem() {
  let deleteProduct = document.querySelectorAll(".deleteItem");

  for (let deleteButton of deleteProduct) {
    deleteButton.addEventListener("click", function () {
      let deleteCart = deleteButton.closest("article");
      deleteCart.remove();

      for (let x = 0; x < datasInStorage.length; x++) {
        if (deleteCart.dataset.id == datasInStorage[x].id) {
          datasInStorage.splice(x, 1);
          localStorage.setItem("product-ID", JSON.stringify(datasInStorage));
        }
      }
      totauxQuantityPrices();
    });
  }
} // function deleteItem

// 6°) Formulaire Contact (client)

function createContact() {
  contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };
  return contact;
}

// 7°) Fonction Regexp

function regex(valid) {
  let control = true;

  if (!valid.firstName.value.match(validName)) {
    document.getElementById("firstNameErrorMsg").innerText =
      "merci d'entrer un prénom valide ";
    control = false;
  } else {
    document.getElementById("firstNameErrorMsg").innerText = "ok";
  }
  if (!valid.lastName.value.match(validName)) {
    document.getElementById("lastNameErrorMsg").innerText =
      "merci d'entrer un nom valide";
    control = false;
  } else {
    document.getElementById("lastNameErrorMsg").innerText = "ok";
  }
  if (!valid.address.value.match(validAddress)) {
    document.getElementById("addressErrorMsg").innerText =
      "merci d'entrer une adresse valide";
    control = false;
  } else {
    document.getElementById("addressErrorMsg").innerText = "ok";
  }
  if (!valid.city.value.match(validCity)) {
    document.getElementById("cityErrorMsg").innerText =
      "merci d'entrer une ville valide";
    control = false;
  } else {
    document.getElementById("cityErrorMsg").innerText = "ok";
  }
  if (!valid.email.value.match(validEmail)) {
    document.getElementById("emailErrorMsg").innerText =
      "merci d'entrer un email valide";
    control = false;
  } else {
    document.getElementById("emailErrorMsg").innerText = "ok";
  }
  if (valid) {
    return true;
  } else {
    return false;
  }
}

// 8°) Fonction Envoi du client au localstorage

/*

1°) Récupération des données localStorage 
2°) fonction Panier 
(Boucle)
  If (Panier vide)
  Else
  Insertion 	article	« cart__item »
  " "		Element Div « cart__item__img »
  " "		Image « img »
  " "		Element Div « cart__item__content »
  " "		Element Div « cart__item__content__titlePrice »
  " "		Titre « H2 »
  " "		Couleur « p »
  " "		Prix « p »
  " "		Element Div « cart__item__content__settings »
  " "		Element Div « cart__item__content__settings__quantity »
  " "		Quantité « p »
  " "		Input Quantité « input »
  " "		Element Div « cart__item__content__settings__delete »
  " "		Supprimer « p »
(Fin boucle)
3°) fonction Totaux
Récupération totale des quantités
Récupération prix total
4°) Fonction modif quantité
5°) Fonction Suppression d’un article
6°) Formulaire Contact (client)
7°) Fonction Regexp
8°) Fonction Envoi du client au localstorage 
9°) Validation de la commande

*/

// input Question
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

// Validation regex

const validName = /[a-zéèêàçï-\s]+$/i;
const validAddress = /[0-9]+\s[a-z]+\s[a-zéèêçàï\s\-]+/i;
const validCity = /[0-9]+\s[a-z]+\s[a-zéèêçàï\s\-]+/i;
const validEmail = /[a-z0-9\.\-\_]+@[a-z]+\.[a-z]{2,3}/i;
