const params = new URL(document.location).searchParams;
const orderId = params.get("orderId");
console.log(orderId);
document.getElementById("orderId").textContent = orderId;
alert("Commande effectuée avec succès");
