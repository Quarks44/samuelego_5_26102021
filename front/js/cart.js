// 1°) Récupération des données localStorage
function cartKanap() {
  let datasInStorage = JSON.parse(localStorage.getItem("kanap_panier"));
  console.log(datasInStorage);
}
// 2°) fonction Panier

/* Faire une boucle qui affiche les  données du local storage
ajouter les autres données de chaque produit (prix, nom, etc.) et les afficher
ajouter le calcul du total du prix de la commande
 */

async function Cart() {
  const idEmptyCart = document.getElementById("cart__items");
  let cartArray = [];

  if (datasInStorage === null || datasInStorage == 0) {
    const emptyCart = `<p>Votre panier est vide</p>`;
    idEmptyCart.innerHTML = emptyCart;
  } else {
    for (x = 0; x < datasInStorage.length; x++) {
      const product = await getProductById(datasInStorage[x].id);
      const totalPriceKanap = (product.price *= datasInStorage[x].quantity);
      console.log(totalPriceKanap);
      cartArray += `     
         <article class="cart__item" data-id=${datasInStorage[x].id}>
         <div class="cart__item__img">
           <img src="${product.imageUrl}" alt="Photographie d'un canapé">
         </div>
         <div class="cart__item__content">
           <div class="cart__item__content__titlePrice">
             <h2>${product.name}</h2>
             <p>${datasInStorage[x].color}</p>
             <p>
             
             ${totalPriceKanap} €</p>
           </div>
           <div class="cart__item__content__settings">
             <div class="cart__item__content__settings__quantity">
               <p>Qté : </p>
               <input data-id= ${datasInStorage[x].id} data-color= ${datasInStorage[x].color} type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${datasInStorage[x].quantity}>
             </div>
             <div class="cart__item__content__settings__delete">
               <p data-id= ${datasInStorage[x].id} data-color= ${datasInStorage[x].color} class="deleteItem">Supprimer</p>
             </div>
           </div>
         </div>
       </article> 
       `; // https://www.delftstack.com/fr/howto/javascript/javascript-string-interpolation/
    }
    // 3°) fonction Totaux
    // Affichage du nombre total d'articles et du prix total du panier
    let totalQuantity = 0;
    let totalPrice = 0;
    for (x = 0; x < datasInStorage.length; x++) {
      const article = await getProductById(datasInStorage[x].id);
      totalQuantity += parseInt(datasInStorage[x].quantity);
      console.log(totalQuantity);
      totalPrice += parseInt(article.price * datasInStorage[x].quantity);
      console.log(totalPrice);
    }
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
    document.getElementById("totalPrice").innerHTML = totalPrice;
    if (x == datasInStorage.length) {
      idEmptyCart.innerHTML = cartArray;
      modifQuantity();
      deleteItem();
    }
  }
} // end fucntion Cart

// 4°) Fonction modif quantité
function modifQuantity() {
  const quantityInputs = document.querySelectorAll(".itemQuantity");
  console.log(quantityInputs);
  quantityInputs.forEach((quantityInput) => {
    quantityInput.addEventListener("change", (event) => {
      event.preventDefault();
      console.log(event);
      console.log(event.target.getAttribute("data-id"));
      console.log(event.target.getAttribute("data-color"));
      const inputValue = event.target.value;
      const dataId = event.target.getAttribute("data-id");
      const dataColor = event.target.getAttribute("data-color");
      let cartItems = localStorage.getItem("kanap_panier");
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
      localStorage.setItem("kanap_panier", itemsStr);
      location.reload();
    });
  });
} //end function modifQuantity

// 5°) Fonction Suppression d’un article

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
      deleteConfirm = window.confirm("Voulez vous supprimé cet article ?");
      if (deleteConfirm == true) {
        localStorage.setItem("kanap_panier", JSON.stringify(datasInStorage));
        location.reload();
      }
      alert("Article supprimé");
    });
  });
} // end function deleteItem

// 6°) Formulaire Contact (client)

// Constante regex
const validName = /[a-zéèêàçï-\s]+$/i;
const validAddress = /[0-9]+\s[a-z]+\s[a-zéèêçàï\s\-]+/i;
const validCity = /[0-9]+\s[a-z]+\s[a-zéèêçàï\s\-]+/i;
const validEmail = /[a-z0-9\.\-\_]+@[a-z]+\.[a-z]{2,3}/i;

// Constante input Question
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
});
lastName.addEventListener("input", (event) => {
  event.preventDefault();
  if (validName.test(lastName.value) == false || lastName.value == "") {
    document.getElementById("lastNameErrorMsg").innerHTML = "Nom non valide";
  } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
  }
});
address.addEventListener("input", (event) => {
  event.preventDefault();
  if (validAddress.test(address.value) == false || address.value == "") {
    document.getElementById("addressErrorMsg").innerHTML = "Adresse non valide";
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "";
  }
});
city.addEventListener("input", (event) => {
  event.preventDefault();
  if (validCity.test(city.value) == false || city.value == "") {
    document.getElementById("cityErrorMsg").innerHTML = "Ville non valide";
  } else {
    document.getElementById("cityErrorMsg").innerHTML = "";
  }
});
email.addEventListener("input", (event) => {
  event.preventDefault();
  if (validEmail.test(email.value) == false || email.value == "") {
    document.getElementById("emailErrorMsg").innerHTML = "Email non valide";
  } else {
    document.getElementById("emailErrorMsg").innerHTML = "";
  }
});

// 7°) creation bouton commander
// Fonction Envoi du client au localstorage

let order = document.getElementById("order"); // ligne 143
order.addEventListener("click", (o) => {
  e.preventDefault();
  // creation array recup contact
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
  } else {
    let products = [];
    datasInStorage.forEach((order) => {
      products.push(order.id);
      console.log(products);
    });

    // 10°) "passez commande" (fetch post) */
    // appel de api order pour envoi array
    let pageConfirm = { contact, products };

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(pageConfirm),
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
});

// Fonction Principale

async function fetchProductById(productId) {
  return fetch("http://localhost:3000/api/products/" + productId)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
} // end function fetchProductById
cartKanap();
