//API

function FetchProduct () {
    fetch('http://localhost:3000/api/products')
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          console.log("mauvaise réponse du réseau"); 
        }
      })
      .catch(function (error) {
        console.log("problème avec fetch");
      });
  }//end function


