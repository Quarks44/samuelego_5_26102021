// Page d'accueil

/* Une page d’accueil montrant (de manière dynamique) tous les articles disponibles à la vente.
Cette page présente l’ensemble des produits retournés par l’API. Pour chaque produit, il faudra afficher l’image de celui-ci,
ainsi que son nom et le début de sa description. En cliquant sur le produit,
l’utilisateur sera redirigé sur la page du produit pour consulter celui-ci plus en détail. */

// Appel à l'API products
displayProducts();
async function getProducts() {
  return await fetch("http://localhost:3000/api/products")
    .then(function (res) {
      return res.json();
    })
    .then(function (value) {
      console.log(
        "Test #01 - variable: products = tous les articles + descriptions"
      );
      console.log(value);
      return value;
    })
    .catch(function (err) {
      // Une erreur est survenue
      console.log(err);
    });
}

// Récupération des données et intégration dans le DOM
async function displayProducts() {
  const parser = new DOMParser();
  const products = await getProducts();
  let productsSection = document.getElementById("items");
  for (i = 0; i < products.length; i++) {
    let productsItems = `
      <a href="./product.html?id=${products[i]._id}">
      <article>
      <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
      <h3 class="productName">${products[i].name}</h3>
      <p class="productDescription">${products[i].description}</p>
      </article> 
      </a>`;
    const displayShop = parser.parseFromString(productsItems, "text/html");
    productsSection.appendChild(displayShop.body.firstChild);
  }
  console.log("displayProducts", products);
}
