// récupérer les données du localstorage (id/colors/qté)

function getLocalStorage() {
  let datasInStorage = JSON.parse(localStorage.getItem("kanap_panier"));
  console.log(datasInStorage);

  let section_cart_item = document.getElementsById("cart__items");

  // Faire une boucle qui affiche les données du localstorage

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
      imageContent.classList.add("cart__item__img");
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

      // input ???

      // supprimmer

      let settingsDelete = document.createElement("div");
      settingsDelete.classList.add("cart__item__content__settings__delete");
      settings.appendChild(settingsDelete);

      let deleteItem = document.createElement("p");
      deleteItem.innerHTML = "Supprimer";
      deleteItem.classList.add("deleteItem");
      settingsDelete.appendChild(deleteItem);

      section_cart_item.appendChild(article);
    } //end for
  } //end else
} //end function

getLocalStorage();

// dans la boucle ajouter un fetch pour récupérer les autres données de chaque produit (prix, nom, etc.) et les afficher

// dans la boucle ajouter le calcul du total du prix de la commande

let productTotalPrice = document.getElementById("totalPrice");
productTotalPrice.innerHTML = totalPrice;
console.log(totalPrice);

// dans la boucle ajouter les boutons supprimer pour chaque article

let buttonDelete = document.getElementById("deleteItem");
buttonAddToCart.addEventListener("click", function () {
  let produit_supprimmer = {
    id: productId,
    quantity: parseInt(document.getElementById("quantity").value, 10), // https://www.w3schools.com/jsreF/jsref_parseint.asp
    color: document.getElementById("colors").value,
  };
});

// Hors boucle, afficher le total en bas du panier

// Créer la fonction pour supprimer un article
function deleteKanap() {
  let deleteProduct = document.querySelectorAll(".deleteItem");
  for (let delButton of deleteProduct) {
    delButton.addEventListener("click", function () {
      let deleteProductInCart = delButton.closest("article");
      deleteProductInCart.remove();

      for (let i = 0; i < datasInStorage.length; i++) {
        if (deleteProductInCart.dataset.id == datasInStorage[i].id) {
          datasInStorage.splice(i, 1); //https://www.w3schools.com/jsref/jsref_splice.asp
          localStorage.setItem("product-ID", JSON.stringify(datasInStorage));
        }
      }
    });
  }
} // end function deletekanap

// faire une boucle pour parser le tableau du panier

// trouver le id de l"article a supprimer et le supprimer du tableau

// Sauvegarder ce tableau comme le nouveau localStorage

// Recharger la page

location.reload();
// Hors boucle, ajouter une fonction au bouton "passez commande"

// créer la fonction  "passez commande" (fetch post)
