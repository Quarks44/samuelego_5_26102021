// Page Confirmation

// Sur cette page, l'utilisateur doit voir s’afficher son numéro de commande. Il faudra veiller à ce que ce numéro ne soit stocké nulle part.

const params = new URL(document.location).searchParams;
const orderId = params.get("orderId");
console.log("Test #19 - variable = numéro de commande");
console.log(orderId);
document.getElementById("orderId").textContent = orderId;
alert("Commande effectuée avec succès");
