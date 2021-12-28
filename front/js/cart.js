// localstorage
let datasInStorage = JSON.parse(localStorage.getItem("cartItems"));

// contenu du panier
async function displayCart() {
  const parser = new DOMParser();
  const positionEmptyCart = document.getElementById("cart__items");
  let cartArray = [];

  // Si le localstorage est vide
  if (datasInStorage === null || datasInStorage == 0) {
    positionEmptyCart.textContent = "Votre panier est vide";
  } else {
    // Si le localstorage contient des canapés
    for (i = 0; i < datasInStorage.length; i++) {
      const product = await getProductById(datasInStorage[i].id);
      const totalPriceItem = (product.price *= datasInStorage[i].quantity);
      console.log(totalPriceItem);
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
      console.log(totalQuantity);
      totalPrice += parseInt(article.price * datasInStorage[i].quantity);
      console.log(totalPrice);
    }
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
    document.getElementById("totalPrice").innerHTML = totalPrice;
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
  console.log(quantityInputs);
  quantityInputs.forEach((quantityInput) => {
    quantityInput.addEventListener("change", (event) => {
      event.preventDefault();
      console.log(event);
      const inputValue = event.target.value;
      const dataId = event.target.getAttribute("data-id");
      console.log(event.target.getAttribute("data-id"));
      const dataColor = event.target.getAttribute("data-color");
      console.log(event.target.getAttribute("data-color"));
      let cartItems = localStorage.getItem("cartItems");
      let items = JSON.parse(cartItems);
      const resultat = items.find((product) => {
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
  console.log(deleteButtons);
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      const deleteId = event.target.getAttribute("data-id");
      const deleteColor = event.target.getAttribute("data-color");
      console.log(deleteId, deleteColor);
      datasInStorage = datasInStorage.filter(
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
      console.log(products);
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
