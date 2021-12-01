// récupérer les données du localstorage (id/colors/qté)

function getLocalStorage() {
  let datasInStorage = JSON.parse(localStorage.getItem("product-ID"));
  console.log(datasInStorage);

  // Faire une boucle qui affiche les données du localstorage
  let cart = { cart };
  if (datasInStorage === null || datasInStorage == 0) {
    let emptyCart = "panier vide";
    htmlEmptyCart.innerHTML = emptyCart;
  } else {
    for (let produit in datasInStorage) {
      let article = document.createElement("article");
      document.querySelector("cart__items").appendChild(article);
      article.className = "cart__items";
      article.setAttribute("data-id", datasInStorage(produit).productId);
    } //end for
  } //end else
} //end function

// dans la boucle ajouter un fetch pour récupérer les autres données de chaque produit (prix, nom, etc.) et les afficher
// dans la boucle ajouter le calcul du total du prix de la commande

let productTotalPrice = document.getElementById("totalPrice");
productTotalPrice.innerHTML = totalPrice;
console.log(totalPrice);

// dans la boucle ajouter les boutons supprimer pour chaque article

let settingsDelete = document.createElement("div");
settingsDelete.classList.add("cart__item__content__settings__delete");
settings.appendChild(settingsDelete);

let deleteItem = document.createElement("p");
deleteItem.innerHTML = "Supprimer";
deleteItem.classList.add("deleteItem");
settingsDelete.appendChild(deleteItem);

// Hors boucle, afficher le total en bas du panier
// Créer la fonction pour supprimer un article
function deleteKanap() {
  let buttonDelete = document.querySelectorAll(".deleteItem");

  deleteKanap();
}

// faire une boucle pour parser le tableau du panier
// trouver le id de l'article a supprimer et le supprimer du tableau

// Sauvegarder ce tableau comme le nouveau localStorage
// Recharger la page

location.reload();
// Hors boucle, ajouter une fonction au bouton "passez commande"
// créer la fonction  "passez commande" (fetch post)
