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
let count = 0
let dict = {}
querySnapshot.forEach(async (doc) => {
    let docDat = doc.data()
    if (docDat["host"] == localStorage.getItem("displayName").slice(1,-1)){
        counterProj+= 1
        let tr = document.createElement("tr")
        let td = document.createElement("td")
        let a = document.createElement("a")
        a.classList.add("text-primary")
        a.textContent = docDat["title"]
        td.appendChild(a)
        let td2 = document.createElement("td")
        td2.textContent = `$ ${docDat["payout"]}`
        let td3 = document.createElement("td")
        let span = document.createElement("span")
        span.classList.add("badge", "bg-success")
        span.textContent = "Approved"
        td3.appendChild(span)
        tr.appendChild(td)
        tr.appendChild(td2)
        tr.appendChild(td3)
        document.getElementById("tbodpurchase").appendChild(tr)
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
        console.log(docDat)
        console.log(curr)
        const query = await getDocs(collection(db, `challenges/${docDat["id"]}/entries`));
            
        query.forEach((innerdoc) => {
            count++
            dict[innerdoc.data()["id"]] = "hi"
            // image info stuff
            console.log(innerdoc.id, " => ", innerdoc.data());
        });
    }
    document.getElementById("picsTake").textContent = count
    document.getElementById("usersHelp").textContent = Object.keys(dict).length + 1

});
const projAllTime = document.getElementById("projAllTime")
projAllTime.textContent = counterProj
const userprofile = document.getElementById("userprofile")
console.log(localStorage.getItem("photoURL"))
userprofile.src =  (localStorage.getItem("photoURL")).slice(1,-1)
const username = document.getElementById("username")
let names = (localStorage.getItem("displayName")).slice(1,-1)
username.textContent = names

