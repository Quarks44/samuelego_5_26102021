function getLocalStorage() {
  let datasInStorage = JSON.parse(localStorage.getItem("kanap_panier"));
  console.log(datasInStorage);

  let section_cart_item = document.getElementsById("cart__items");
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

      let productQuantity = document.createElement("input");
      productQuantity.type = "number";
      productQuantity.name = "itemQuantity";
      productQuantity.classList.add("itemQuantity");
      productQuantity.min = 1;
      productQuantity.max = 100;
      productQuantity.value = product.quantity;
      productQuantity.dataset.value = parseInt(product.quantity, 10);
      settingsQuantity.appendChild(productQuantity);

      // supprimmer

      let settingsDelete = document.createElement("div");
      settingsDelete.classList.add("cart__item__content__settings__delete");
      settings.appendChild(settingsDelete);

      let deleteItem = document.createElement("p");
      deleteItem.innerHTML = "Supprimer";
      deleteItem.classList.add("deleteItem");
      settingsDelete.appendChild(deleteItem);

      section_cart_item.appendChild(article);

      /* async function main() {
        let url = new URL(location.href); //  url
        let productId = url.searchParams.get("id");
        let product = await fetchProductById(productId); // attendre reponse API
        displayKanap(product); // affichage produit et passe le product ID
        addToCart(productId); // Ajoute la fonctionalite au bouton "addToCart"
      } // end function main
      main();
*/

      let productTotalPrice = document.getElementById("totalPrice");
      productTotalPrice.innerHTML = totalPrice;
      console.log(totalPrice);
    } //end for
  } //end else
} //end function

getLocalStorage();

// suppression Kanap

function deleteItem() {
  let deleteProduct = document.querySelectorAll(".deleteItem");

  for (let deleteButton of deleteProduct) {
    deleteButton.addEventListener("click", function () {
      let deleteProductInCart = deleteButton.closest("article");
      deleteProductInCart.remove();

      for (let x = 0; i < datasInStorage.length; x++) {
        if (deleteProductInCart.dataset.id == datasInStorage[x].id) {
          datasInStorage.splice(x, 1);
          localStorage.setItem("product-ID", JSON.stringify(datasInStorage));
        }
      }
      totalQuantityPrices();
    });
  }
}

location.reload();
