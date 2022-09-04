const moveup = document.getElementById("moveup")
moveup.setAttribute("style", "display: none")
let currpage = 0

const pages = document.querySelectorAll(".page");
const translateAmount = 100; 
let translate = 0;

let slide = (direction) => {
    if (direction == "next"){
      currpage++
    }
    else {
      currpage--
    }
    if (currpage == 0){
      const moveup = document.getElementById("moveup")
      moveup.setAttribute("style", "display: none")
      const movedown = document.getElementById("movedown")
      movedown.setAttribute("style", "display: block")
    }
    else if (currpage == 2){
         const cardnum = document.getElementById("cardnum").value
         const exp = document.getElementById("exp").value
         const cvc = document.getElementById("cvc").value
         let vals = exp.split("/")
         var data = `card%5Bexp_month%5D=${vals[0]}&card%5Bexp_year%5D=${vals[1]}&card%5Bnumber%5D=%20${cardnum}&card%5Bcvc%5D=${cvc}`;

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
          if(this.readyState === 4) {
            console.log(this.responseText);
            window.location.href = "dashboard.html"

          }
        });
        const customerID = localStorage.getItem("customerID")
        xhr.open("POST", `https://api.stripe.com//v1/customers/${customerID}`, false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Authorization", "Bearer sk_test_51LdchtDFhPnMTlLRlhgVvAS3d33CLYeMOBCI1PW6aAxQ5R4VWRNPn4EGXsXA8VtyMXruFKPpYOPlK61ManRhKsRv00hu1TacZx");

        xhr.send(data);
      

    }
    else {
      const moveup = document.getElementById("moveup")
      moveup.setAttribute("style", "display: block")
    }
    direction === "next" ? translate -= translateAmount : translate += translateAmount;

    pages.forEach(
      pages => (pages.style.transform = `translateY(${translate}%)`)
    );
}

