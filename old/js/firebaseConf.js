// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBdXPNbVWy8D6Mo-hIMCyoWiaYfNBRiR8Q",
    authDomain: "urctughlakabad-in.firebaseapp.com",
    databaseURL: "https://urctughlakabad-in.firebaseio.com",
    projectId: "urctughlakabad-in",
    storageBucket: "urctughlakabad-in.appspot.com",
    messagingSenderId: "879180501104",
    appId: "1:879180501104:web:d63659453f061cb86164b5",
    measurementId: "G-XZXZK21143"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();




var log = document.getElementById("logMessage")
log.innerHTML = ""
firebase.auth().onAuthStateChanged(function (user) {


    if (user) {
        customerObject.user = { user }
        // User is signed in.
        customerObject.Name = user.displayName;
        customerObject.displayName = user.displayName;
        customerObject.Email = user.email;
        customerObject.ImageURL = user.photoURL;

        if (customerObject.displayName === null) {
            customerObject.displayName = customerObject.Email
            customerObject.Name = customerObject.Email
        }
        document.getElementById("welcome").style.display = "none"
        document.getElementById("user").style.display = "none"
        //document.getElementById("hiUser").innerHTML = `Hi ${customerObject.displayName}`
        document.getElementById("signout").style.display = "initial"
        document.getElementById("welcome").classList.add('shrinkmargin')
        if (customerObject.ImageURL !== null) {
            document.getElementById("editUser").src = customerObject.ImageURL
        }
        showCustomerForm()
        // ...
    } else {
        // User is signed out.
        // ...
        customerObject = {}
        document.getElementById("welcome").style.display = "block"
        document.getElementById("user").style.display = "block"
        //        document.getElementById("customer").style.display = "none"
        document.getElementById("main").innerHTML = ""
        document.getElementById("editUser").src = ""
        document.getElementById("signout").style.display = "none"
        document.getElementById("editUser").style.display = "none"

    }




    return customerObject
});



function signin() {

    var log = document.getElementById("logMessage")
    var email = document.getElementById("userEmail").value
    var password = document.getElementById("userPassword").value


    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        log.innerHTML = errorCode + '<br>' + errorMessage
        // ...
    });

}


function signup() {

    var log = document.getElementById("log")
    var email = document.getElementById("userEmail").value
    var password = document.getElementById("userPassword").value

    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        log.innerHTML = errorCode + '<br>' + errorMessage

        // ...
    });

    sendEmailVerification()

}


function signout() {
    firebase.auth().signOut();
    document.getElementById("main").innerHTML = "";
}


function sendPasswordReset() {
    var email = document.getElementById("userEmail").value
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function () {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        log.innerHTML = 'Password Reset Email Sent!';
        // [END_EXCLUDE]
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
            log.innerHTML += errorMessage;
        } else if (errorCode == 'auth/user-not-found') {
            log.innerHTML += errorMessage;
        }
        log.innerHTML += error;
        // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
}


function sendEmailVerification() {
    // [START sendemailverification]
    firebase.auth().currentUser.sendEmailVerification().then(function () {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!')
        log.innerHTML = 'Email Verification Sent!';
        // [END_EXCLUDE]
    });
    // [END sendemailverification]
}







function googleSignin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    //    provider.addScope('profile');
    //  provider.addScope('email');
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.log(user)
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        log.innerHTML = `${errorCode} <br>${errorMessage}`
    });
    return user
}