
function toggleResetPswd(e){
    e.preventDefault();
    $('#logreg-forms .form-signin').toggle() // display:block or none
    $('#logreg-forms .form-reset').toggle() // display:block or none
}

function toggleSignUp(e){
    e.preventDefault();
    $('#logreg-forms .form-signin').toggle(); // display:block or none
    $('#logreg-forms .form-signup').toggle(); // display:block or none
}

$(()=>{
    // Login Register Form
    $('#logreg-forms #forgot_pswd').click(toggleResetPswd);
    $('#logreg-forms #cancel_reset').click(toggleResetPswd);
    $('#logreg-forms #btn-signup').click(toggleSignUp);
    $('#logreg-forms #cancel_signup').click(toggleSignUp);
});


    

    



  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyApGZMOF7-buqF58sTN710yT4FtlCwAPQA",
    authDomain: "fir-2-6c9e4.firebaseapp.com",
    projectId: "fir-2-6c9e4",
    storageBucket: "fir-2-6c9e4.appspot.com",
    messagingSenderId: "376627362894",
    appId: "1:376627362894:web:6965827d21ec8ca53e571f",
    measurementId: "G-VB3R06DH84"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var signupbtn=document.getElementById("signupbtn")
  var emailsignup=document.getElementById("useremail")
  var passswordsignup=document.getElementById("userpass")


  //================Signup With Email and Password==========================
  signupbtn.onclick=function(){
      signupbtn.disabled=true;
      signupbtn.textContent="Registering Your Account! Please Wait";
      firebase.auth().createUserWithEmailAndPassword(emailsignup.value,passswordsignup.value).then(function(response){
        sendingVerifyEmail(signupbtn);
            console.log(response);
            alert("REGISTRATION SUCCESSFULL!")
      })
      .catch(function(error){
        signupbtn.disabled=false;
        signupbtn.textContent="Sign Up";
          console.log(error);
          alert(error);
      })


  }

  function sendingVerifyEmail(button){
     firebase.auth().currentUser.sendEmailVerification().then(function(response){
                signupbtn.disabled=false;
        signupbtn.textContent="Sign Up S";

        console.log(response);
     })
     .catch(function(error){
                signupbtn.disabled=false;
        signupbtn.textContent="Sign Up S";

         console.log(error);
     })
  }
  //================End Signup With Email and Password======================

  //==========================Sign in With Email and Password============================

   var loginemail=document.getElementById("inputEmail");
   var loginpassword=document.getElementById("inputPassword");
   var loginbtn=document.getElementById("loginbtn");


   loginbtn.onclick=function(){
    loginbtn.disabled=true;
    loginbtn.textContent="Logging In Please Wait.."
       firebase.auth().signInWithEmailAndPassword(loginemail.value,loginpassword.value).then(function(response){
           console.log(response);
           alert("LOGIN SUCCESSFUL!");
           loginbtn.disabled=false;
    loginbtn.textContent="Sign In"
            var userobj=response.user;
            var token=userobj.xa;
            var provider="email";
            var email=loginemail.value;
            
            if(token!=null && token!=undefined && token!=""){
            sendDatatoServerPhp(email,provider,token,email);
            }
       })
       .catch(function(error){
           console.log(error);
           alert("USER NOT EXIST!");
           loginbtn.disabled=false;
        loginbtn.textContent="Sign In" ;

       })
   }
  //======================Sign With Email and Password

 
   //===========================End Saving Details in My Server=======================
   //=========================Login With Phone==========================
   var loginphone=document.getElementById("phoneloginbtn");
   var phoneinput=document.getElementById("inputPhone");
   var otpinput=document.getElementById("inputOtp");
   var verifyotp=document.getElementById("verifyotp");

   loginphone.onclick=function(){
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': function(response) {
         // reCAPTCHA solved, allow signInWithPhoneNumber.
             // ...
        },
        'expired-callback': function() {
             // Response expired. Ask user to solve reCAPTCHA again.
            // ..
        }
        });

        var cverify=window.recaptchaVerifier;

        firebase.auth().signInWithPhoneNumber(phoneinput.value,cverify).then(function(response){
            console.log(response);
            window.confirmationResult=response;
        }).catch(function(error){
            console.log(error);
            alert("LOGIN FAILED");
        })
   }

   verifyotp.onclick=function(){
       confirmationResult.confirm(otpinput.value).then(function(response){
           console.log(response);
           alert("LOGIN SUCCESSFUL!");
           
       })
       .catch(function(error){
           console.log(error);
       })
   }
   //=================End Login With Phone=========================

    ///=================Login With google===========================
    var googleLogin=document.getElementById("googleLogin");

googleLogin.onclick=function(){
    var provider=new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(response){
        var userobj=response.user;
         var token=userobj.xa;
         var provider="google";
         var email=userobj.email;
        

        console.log(response);
        alert("LOGIN SUCCESSFUL!");
    })
    .catch(function(error){
        console.log(error);
        alert("LOGIN FAILED");
    })

}
//=======================End Login With Google==================
   //======================Login With Facebook==========================
    
   var facebooklogin=document.getElementById("facebooklogin");
   facebooklogin.onclick=function(){
    var provider=new firebase.auth.FacebookAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(response){
    var userobj=response.user;
     var token=userobj.xa;
     var provider="facebook";
     var email=userobj.email;
     if(token!=null && token!=undefined && token!=""){
     sendDatatoServerPhp(email,provider,token,userobj.displayName);
     }

    console.log(response);
    alert("LOGIN SUCCESSFUL!");
})
.catch(function(error){
    console.log(error);
    alert("LOGIN FAILED");
})


   }
   //======================End Login With Facebook==========================
    //======================Login With Github==========================
    
    var githubLogin=document.getElementById("githubLogin");
   githubLogin.onclick=function(){
    var provider=new firebase.auth.GithubAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(response){
    var userobj=response.user;
     var token=userobj.xa;
     var provider="github";
     var email=userobj.email;
     if(token!=null && token!=undefined && token!=""){
     sendDatatoServerPhp(email,provider,token,userobj.displayName);
     }

    console.log(response);
    alert("LOGIN SUCCESSFUL!");
})
.catch(function(error){
    console.log(error);
    alert("LOGIN FAILED");
})


   }
   //======================End Login With Github==========================


