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
const querySnapshot = await getDocs(collection(db, "challenges"));
let counterProj = 0
querySnapshot.forEach((doc) => {
    let docDat = doc.data()
    if (docDat["host"] == localStorage.getItem("displayName").slice(1,-1)){
        counterProj+= 1
        let end = new Date(docDat["enddate"] * 1000)
        let curr = new Date()
        let Difference_In_Time = end.getTime() - curr.getTime();
  
        let Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
        if (Difference_In_Days > 0){
            let div = document.createElement("div")
            div.classList.add("activity-item", "d-flex")
            let innerdiv = document.createElement("div")
            innerdiv.classList.add("activite-label")
            innerdiv.textContent = Difference_In_Days + " day(s)"
            let i = document.createElement("i")
            i.classList.add("bi", "bi-circle-fill", "activity-badge", "text-success", "align-self-start")
            let anotherdiv = document.createElement("div")
            anotherdiv.classList.add("activity-content")
            anotherdiv.textContent = docDat["title"] + " Challenge Ends"
            div.appendChild(innerdiv)
            div.appendChild(i)
            div.appendChild(anotherdiv)
            document.getElementById("deadlines").appendChild(div)

        }
        console.log(curr)
    }
    
});
const projAllTime = document.getElementById("projAllTime")
projAllTime.textContent = counterProj
const userprofile = document.getElementById("userprofile")
console.log(localStorage.getItem("photoURL"))
userprofile.src =  (localStorage.getItem("photoURL")).slice(1,-1)
const username = document.getElementById("username")
let names = (localStorage.getItem("displayName")).slice(1,-1).split(" ")
console.log(names)
username.textContent = names[0].charAt(0) + ". " + names[1]

