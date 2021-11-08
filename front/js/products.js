//  ETAPE 5 : Récupérer l’id du produit à afﬁcher

// URL API du produit
let productsURL = "http://localhost:3000/api/products/";

// Récuperation via API des informations produits
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colorDescription = document.getElementById("colors");

// Récuperaton ID dans l'URl

var urlSearchParams = URLSearchParams
var productId = urlSearchParams.getElementById('id');
