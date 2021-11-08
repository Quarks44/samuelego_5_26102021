// URL API du produit
let productsURL = "http://localhost:3000/api/products/";

//  ETAPE 6 : Insérer un produit et ses détails dans la page

 // Création élément (produit)
function create_Product(elements) {
 
  const kanap = document.create_Element("a"); // https://developer.mozilla.org/fr/docs/Web/API/Document/Document
  kanap.href = "http://localhost:3000/api/products/" + productId;

  // Création constructor article,name,image et description
  const product_article = document.createElement("article"); // const article

  const product_name = document.createElement("h3"); // const name
  product_name.innerHTML = elements.name;
  product_name.classList.add("productName"); // ajout class productName

  const product_picture = document.createElement("img"); // const imageUrl
  product_picture.src = elements.ImageUrl;
  product_picture.alt = elements.Alt;

  const product_descrption = document.createElement("p"); // const description
  product_descrption.innerHTML = elements.description; // insertion lien HTML
  product_descrption.classList.add("productDescription"); // ajout class productDescription

  // Insertion dans la page produit (DOM)
  product_article.appendChild(product_name);
  product_article.appendChild(product_picture);
  product_article.appendChild(product_descrption);
}

// extraction ID
let productId = "107fb5b75607497b96722bda5b504926";
let create_item_page_url = "http://localhost:3000/api/products/" + productId;
console.log(create_item_page_url);

function Data (URL) { // https://developer.mozilla.org/fr/docs/Web/API/URL
fetch (URL) // https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch
.then(function(response) {
  if(response.ok) {
    return response//???
    else {
      console.error('erreur') //https://developer.mozilla.org/fr/docs/Web/API/Console/error
    }
  }
}
}