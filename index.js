// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { doc, setDoc, getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const auth = getAuth();
const googleSign = document.getElementById("googleSign")
let user
googleSign.addEventListener("click", function(){
    signInWithPopup(auth, provider)
    .then(async function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const { isNewUser } = getAdditionalUserInfo(result)    
      console.log(isNewUser)
      user = result.user;
      
      console.log(user.uid)
      let displayName = user["displayName"]
      localStorage.setItem("displayName", JSON.stringify(displayName))
      localStorage.setItem("email", JSON.stringify(user["email"]))
      localStorage.setItem("emailVerified", JSON.stringify(user["emailVerified"]))
      localStorage.setItem("phoneNumber", JSON.stringify(user["phoneNumber"]))
      localStorage.setItem("photoURL", JSON.stringify(user["photoURL"]))
      localStorage.setItem("id", JSON.stringify(user.uid))

      if (isNewUser == false){
        console.log("in")
        const querySnapshot = await getDocs(collection(db, "companies"));
        querySnapshot.forEach((doc) => {
          let docDat = doc.data()
          console.log(docDat["email"])
          if (user["email"] == docDat["email"]){
            
            localStorage.setItem("customerID", docDat["customerID"])
          }
              
          
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
      });
      window.location.href = "dashboard.html"

      }
      else {
        let em = user["email"]
        result = em.replace("@", "%40");
        var data = `email=${result}`;

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
          if(this.readyState === 4) {
            console.log(JSON.parse(this.responseText));
            setDoc(doc(db, "companies", displayName.replace(/\s/g, '')), {
              email: user["email"],
              customerID: JSON.parse(this.responseText)["id"],
              id: JSON.stringify(localStorage.getItem("id"))
            }).then(() => {
              localStorage.setItem("customerID", JSON.parse(this.responseText)["id"])
              window.location.href = "onboarding.html"
            });;
            
          }
        });

        xhr.open("POST", "https://api.stripe.com//v1/customers", false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Authorization", "Bearer sk_test_51LdchtDFhPnMTlLRlhgVvAS3d33CLYeMOBCI1PW6aAxQ5R4VWRNPn4EGXsXA8VtyMXruFKPpYOPlK61ManRhKsRv00hu1TacZx");

        let res = xhr.send(data);
        //

      }
      //console.log(credential)
      // The signed-in user info.
      
      //console.log(user)
      //...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)

      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
})
