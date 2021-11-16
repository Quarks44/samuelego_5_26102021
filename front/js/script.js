//  API
async function fetchApi() {
  return fetch("http://localhost:3000/api/products/")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
} // end function

// Affichage plusieurs produits
//function displayKanaps(sofas) {}
//let  = document.getElementById("items");
//end function

// Principale Fonction
async function main() {
  let sofa = await fetchApi(); // = API
  for (let element of sofa) {
    displayKanap(sofa); // affichage
  }
}
main();
