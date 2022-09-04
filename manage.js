import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";

import { getFirestore, doc, setDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js"; 
const firebaseConfig = {
    apiKey: "AIzaSyBo3fI3t65oQKFtd_iLDn0xbsT80wwofTA",
    authDomain: "datability-cd3d1.firebaseapp.com",
    projectId: "datability-cd3d1",
    storageBucket: "datability-cd3d1.appspot.com",
    messagingSenderId: "145330433837",
    appId: "1:145330433837:web:c52ccb2ee69cb02e4b6da4",
    measurementId: "G-TNZM598D89"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const userprofile = document.getElementById("userprofile")
console.log(localStorage.getItem("photoURL"))
userprofile.src =  (localStorage.getItem("photoURL")).slice(1,-1)
const username = document.getElementById("username")
let names = (localStorage.getItem("displayName")).slice(1,-1).split(" ")
console.log(names)
let title, description, city, startdate, enddate, payout, type, pic
const create = document.getElementById("create")
create.addEventListener("click", function(){
    const projectCon = document.getElementById("projectCon").setAttribute("style", "display: none;")
    const form = document.getElementById("form").setAttribute("style", "display: block;")

}) 
username.textContent = names[0].charAt(0) + ". " + names[1]
const querySnapshot = await getDocs(collection(db, "challenges"));
let count = 0
querySnapshot.forEach((doc) => {
    let docDat = doc.data()
    if (docDat["host"] != localStorage.getItem("displayName").slice(1,-1)){
        return
    }
    else {
        count++
        let div = document.createElement("div")
        div.classList.add("projectContainer")
        const projectCon = document.getElementById("projectCon")
        let h2 = document.createElement("h2")
        h2.innerHTML = docDat["title"] + "       <a style = 'position: absolute; right: 20%;' id = 'analyze' class = 'projAnBut'>Analyze</a>"
        div.appendChild(h2)
        
        let h3 = document.createElement("h3")
        h3.textContent = docDat["city"] + ", " + docDat["type"]
        h3.setAttribute("style", "margin-top: 20px")
        div.appendChild(h3)

        let h32 = document.createElement("h3")
        h32.textContent = "Start Date: " + new Date(docDat["startdate"] * 1000)
        h32.setAttribute("style", "margin-top: 20px")
        let h33 = document.createElement("h3")
        h33.textContent = "End Date: " + new Date(docDat["enddate"] * 1000)
        h33.setAttribute("style", "margin-top: 20px")
        div.appendChild(h32)
        div.appendChild(h33)


        projectCon.appendChild(div)
        let temp = document.getElementById("analyze")
        temp.id = "analyze" + count
        
    }
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
const analyzeButs = document.querySelectorAll(".projAnBut")
analyzeButs.forEach((el) => {
    el.addEventListener("click", function(){
        //console.log(el.id)
        localStorage.setItem("createGraph", el.id.substring(7))
        window.location.href = "analyze.html"
    })
})
/**
 * Define a function to navigate betweens form steps.
 * It accepts one parameter. That is - step number.
 */
 const navigateToFormStep = (stepNumber) => {
    /**
     * Hide all form steps.
     */
    document.querySelectorAll(".form-step").forEach((formStepElement) => {
        formStepElement.classList.add("d-none");
    });
    /**
     * Mark all form steps as unfinished.
     */
    document.querySelectorAll(".form-stepper-list").forEach((formStepHeader) => {
        formStepHeader.classList.add("form-stepper-unfinished");
        formStepHeader.classList.remove("form-stepper-active", "form-stepper-completed");
    });
    /**
     * Show the current form step (as passed to the function).
     */
    document.querySelector("#step-" + stepNumber).classList.remove("d-none");
    /**
     * Select the form step circle (progress bar).
     */
    const formStepCircle = document.querySelector('li[step="' + stepNumber + '"]');
    /**
     * Mark the current form step as active.
     */
    formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-completed");
    formStepCircle.classList.add("form-stepper-active");
    /**
     * Loop through each form step circles.
     * This loop will continue up to the current step number.
     * Example: If the current step is 3,
     * then the loop will perform operations for step 1 and 2.
     */
    for (let index = 0; index < stepNumber; index++) {
        /**
         * Select the form step circle (progress bar).
         */
        const formStepCircle = document.querySelector('li[step="' + index + '"]');
        /**
         * Check if the element exist. If yes, then proceed.
         */
        if (formStepCircle) {
            /**
             * Mark the form step as completed.
             */
            formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-active");
            formStepCircle.classList.add("form-stepper-completed");
        }
    }
};
/**
 * Select all form navigation buttons, and loop through them.
 */

document.querySelectorAll(".btn-navigate-form-step").forEach((formNavigationBtn) => {
    /**
     * Add a click event listener to the button.
     */
    formNavigationBtn.addEventListener("click", () => {
        /**
         * Get the value of the step.
         */
        const stepNumber = parseInt(formNavigationBtn.getAttribute("step_number"));
        /**
         * Call the function to navigate to the target form step.
         */
        if (stepNumber == 2 && formNavigationBtn.textContent.toLowerCase() == "next"){
            title = document.getElementById("projTitle").value
            description = document.getElementById("projDesc").value
            city = document.getElementById("projCity").value
            type = document.getElementById("projType").value
            pic = document.getElementById("projPic").value



        }
        if (stepNumber == 3 && formNavigationBtn.textContent.toLowerCase() == "next"){
            startdate = new Date(document.getElementById("projStart").value).getTime() / 1000
            enddate = new Date(document.getElementById("projEnd").value).getTime() / 1000
            console.log(startdate)
            console.log(enddate)



        }
        if (stepNumber == 4 && formNavigationBtn.textContent.toLowerCase() == "save"){
            payout = document.getElementById("projPayout").value
            console.log(payout)
            let uid = String(Date.now())
            payout = payout * 100
            let cusID = localStorage.getItem("customerID")
            // WARNING: For POST requests, body is set to null by browsers.
            var data = `amount=${payout}&currency=USD&customer=${cusID}`;

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                console.log(this.responseText);
            }
            });

            xhr.open("POST", "https://api.stripe.com//v1/charges");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("Authorization", "Bearer sk_test_51LdchtDFhPnMTlLRlhgVvAS3d33CLYeMOBCI1PW6aAxQ5R4VWRNPn4EGXsXA8VtyMXruFKPpYOPlK61ManRhKsRv00hu1TacZx");
            payout = payout / 100
            xhr.send(data);
// Add a new document in collection "cities"
            setDoc(doc(db, "challenges", uid), {
            title: title,
            description: description,
            city: city,
            photoURL : pic,
            type: type,
            startdate: startdate,
            enddate: enddate,
            payout: String(payout),
            host: localStorage.getItem("displayName").slice(1, -1),
            id: uid
            }).then(() => {
                location.reload()
            });;
            

        }
        console.log("hi")
        navigateToFormStep(stepNumber);
    });
});
console.log(title, description, city, startdate, enddate, payout)