// Page panier

/* Sur cette page, l’utilisateur va pouvoir modifier la quantité d’un produit de son panier ; à cemoment, 
le total du panier devra bien se mettre à jour.L’utilisateur aura aussi la possibilité de supprimer un produit de son panier, 
le produit devra donc disparaître de la page.Les inputs des utilisateurs doivent être analysés et validés pour vérifier
le format et le type de données avant l’envoi à l’API. Il ne serait par exemple pas recevable d’accepter unprénom contenant
des chiffres, ou une adresse e-mail ne contenant pas de symbole “@”. Encas de problème de saisie, un message d’erreur devra 
être affiché en dessous du champcorrespondant. */

/* Sur cette page, l’utilisateur va pouvoir modifier la quantité d’un produit de son panier ; à cemoment, 
le total du panier devra bien se mettre à jour.L’utilisateur aura aussi la possibilité de supprimer un produit 
de son panier, le produit devradonc disparaître de la page.Les inputs des utilisateurs doivent être analysés et
validés pour vérifier le format et le typede données avant l’envoi à l’API. Il ne serait par exemple pas recevable 
d’accepter unprénom contenant des chiffres, ou une adresse e-mail ne contenant pas de symbole “@”. Encas de problème 
de saisie, un message d’erreur devra être affiché en dessous du champ correspondant. */

// // Récupération des produits dans le local storage
let datasInStorage = JSON.parse(localStorage.getItem("cartItems"));
console.log(
  "Test #11 - variable: datasInStorage = articles présent ou non dans le panier"
);
console.log(datasInStorage);

// contenu du panier
async function displayCart() {
  const parser = new DOMParser();
  const positionEmptyCart = document.getElementById("cart__items");
  let cartArray = [];

  // Si le localstorage est vide
  if (datasInStorage === null || datasInStorage == 0) {
    console.log("Test #12 - panier vide");
    console.log("Le panier est vide");
    positionEmptyCart.textContent = "Votre panier est vide";
  } else {
    // Si le localstorage contient des canapés
    for (i = 0; i < datasInStorage.length; i++) {
      const product = await getProductById(datasInStorage[i].id);
      console.log(
        "Test #13 - variable product = description des produits dans le panier"
      );
      console.log(product);
      const totalPriceItem = (product.price *= datasInStorage[i].quantity);

      cartArray += `
       <article class="cart__item" data-id=${datasInStorage[i].id}>
       <div class="cart__item__img">
         <img src="${product.imageUrl}" alt="Photographie d'un canapé">
       </div>
       <div class="cart__item__content">
         <div class="cart__item__content__titlePrice">
           <h2>${product.name}</h2>
           <p>${datasInStorage[i].color}</p>
           <p>
           
           ${totalPriceItem} €</p>
         </div>
         <div class="cart__item__content__settings">
           <div class="cart__item__content__settings__quantity">
             <p>Qté : </p>
             <input data-id= ${datasInStorage[i].id} data-color= ${datasInStorage[i].color} type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${datasInStorage[i].quantity}>
           </div>
           <div class="cart__item__content__settings__delete">
             <p data-id= ${datasInStorage[i].id} data-color= ${datasInStorage[i].color} class="deleteItem">Supprimer</p>
           </div>
         </div>
       </div>
     </article>
     `;
    }

    // Nombre total d'articles et prix total du panier
    let totalQuantity = 0;
    let totalPrice = 0;
    for (i = 0; i < datasInStorage.length; i++) {
      const article = await getProductById(datasInStorage[i].id);
      totalQuantity += parseInt(datasInStorage[i].quantity);
      totalPrice += parseInt(article.price * datasInStorage[i].quantity);
    }
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
    document.getElementById("totalPrice").innerHTML = totalPrice;
    console.log("Test #14 - variable: totalPrice  = prix total");
    console.log(totalPrice);
    if (i == datasInStorage.length) {
      const displayBasket = parser.parseFromString(cartArray, "text/html");
      positionEmptyCart.appendChild(displayBasket.body);
      modifyQuantity();
      deleteItem();
    }
  } // end else contient canapé
} // end function displayCart
// Récupération des produits via l'API
async function getProductById(productId) {
  return fetch("http://localhost:3000/api/products/" + productId)
    .then(function (res) {
      return res.json();
    })
    .catch((err) => {
      // Une erreur est survenue
      console.log("erreur");
    })
    .then(function (response) {
      return response;
    });
} // end function getProductById
displayCart();

// Modification de la quantité
function modifyQuantity() {
  const quantityInputs = document.querySelectorAll(".itemQuantity");
  quantityInputs.forEach((quantityInput) => {
    quantityInput.addEventListener("change", (event) => {
      event.preventDefault();
      const inputValue = event.target.value;
      const dataId = event.target.getAttribute("data-id");
      const dataColor = event.target.getAttribute("data-color");
      let cartItems = localStorage.getItem("cartItems");
      let items = JSON.parse(cartItems);
      const resultat = items.find((product) => {
        console.log("Test #15 - variable: items = résultat apres modication");
        console.log(items);
        // console.timeLog(items);
        if (product.id === dataId && product.color === dataColor) return true;
        return false;
      });
      if (resultat != undefined) {
        items = items.map((item, index) => {
          if (item.id === dataId && item.color === dataColor) {
            item.quantity = inputValue;
          }
          return item;
        });
      }
      let itemsStr = JSON.stringify(items);
      localStorage.setItem("cartItems", itemsStr);
      location.reload();
    });
  }); // end quantityInputs.forEach
} // end function modifyQuantity

// Suppression d'un canapé
function deleteItem() {
  const deleteButtons = document.querySelectorAll(".deleteItem");
  console.log(
    "Test #16 - variable:deleteButtons = produit pouvant etre supprimé"
  );
  console.log(deleteButtons);
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      const deleteId = event.target.getAttribute("data-id");
      const deleteColor = event.target.getAttribute("data-color");
      console.log(
        "Test #17 - variable: deleteId = Faut-il supprimé le produit ?? "
      );
      console.log(deleteId, deleteColor);
      datasInStorage = datasInStorage.filter(
        //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

        (element) => !(element.id == deleteId && element.color == deleteColor)
      );
      deleteConfirm = window.confirm("Voulez-vous supprimé cet article ?");
      if (deleteConfirm == true) {
        localStorage.setItem("cartItems", JSON.stringify(datasInStorage));
        location.reload();
        alert("Article supprimé");
      }
    });
  }); // end deleteButtons.forEach
} // end function deleteItem

//  Regex
let validName = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/;
let validAddress = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/;
let validEmail = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/;

// Récupéraration id des champs de formulaire
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

firstName.addEventListener("input", (event) => {
  event.preventDefault();
  if (validName.test(firstName.value) == false || firstName.value == "") {
    document.getElementById("firstNameErrorMsg").innerHTML =
      "Prénom non valide";
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
  }
}); // end firstname

lastName.addEventListener("input", (event) => {
  event.preventDefault();
  if (validName.test(lastName.value) == false || lastName.value == "") {
    document.getElementById("lastNameErrorMsg").innerHTML = "Nom non valide";
    return false;
  } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
    return true;
  }
}); //end lastname

address.addEventListener("input", (event) => {
  event.preventDefault();
  if (validAddress.test(address.value) == false || address.value == "") {
    document.getElementById("addressErrorMsg").innerHTML = "Adresse non valide";
    return false;
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "";
    return true;
  }
}); //end adress

city.addEventListener("input", (event) => {
  event.preventDefault();
  if (validName.test(city.value) == false || city.value == "") {
    document.getElementById("cityErrorMsg").innerHTML = "Ville non valide";
    return false;
  } else {
    document.getElementById("cityErrorMsg").innerHTML = "";
    return true;
  }
}); //end city

email.addEventListener("input", (event) => {
  event.preventDefault();
  if (validEmail.test(email.value) == false || email.value == "") {
    document.getElementById("emailErrorMsg").innerHTML = "Email non valide";
    return false;
  } else {
    document.getElementById("emailErrorMsg").innerHTML = "";
    return true;
  }
}); //end email

let order = document.getElementById("order");
order.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Test #18 - variable:order = erreur données non conforme");
  console.log(order);
  // Tableau données de l'utilisateur
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };

  if (
    firstName.value === "" ||
    lastName.value === "" ||
    address.value === "" ||
    city.value === "" ||
    email.value === ""
  ) {
    window.confirm("Coordonnées imcomplètes");
  } else if (
    validName.test(firstName.value) == false ||
    validName.test(lastName.value) == false ||
    validAddress.test(address.value) == false ||
    validName.test(city.value) == false ||
    validEmail.test(email.value) == false
  ) {
    window.confirm("Coordonnées non conforme");
  } else {
    let products = [];
    datasInStorage.forEach((order) => {
      products.push(order.id);
    });

    let pageOrder = { contact, products };

    // Appel à l'api order pour envoyer les tableaux
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(pageOrder),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((confirm) => {
        window.location.href = "./confirmation.html?orderId=" + confirm.orderId;
        localStorage.clear();
      })
      .catch((error) => {
        console.log("une erreur est survenue");
      });
  }
}); // end let order
