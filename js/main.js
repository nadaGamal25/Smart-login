var theName =document.getElementById("theName");
var signEmail=document.getElementById("signEmail");
var signPass=document.getElementById("signPass");
var signupBtn=document.getElementById("signupBtn");
var theAlert =document.getElementById("alerts");

var signArray=[];
if (localStorage.getItem('theUsers') == null) {
    signArray = [];
} else {
    signArray = JSON.parse(localStorage.getItem('theUsers'));
};
//
function signUpFunc(){
    let messages = []
    if (theName.value === '' || theName.value == null ||signEmail.value===''||signEmail.value==null ||signPass.value==='' ||signPass.value==null) {
      messages.push('All inputs are required');
    };
    if (signPass.value.length <= 6) {
      messages.push('Password must be longer than 6 characters');
    };
    if (signPass.value.length >= 20) {
      messages.push('Password must be less than 20 characters');
    };

    var signup={
        name:theName.value,
        email:signEmail.value,
        pass:signPass.value,
    };
    if (signArray.length == 0){
        signArray.push(signup);
        localStorage.setItem("theUsers",JSON.stringify(signArray));
    };

    for(i=0;i<signArray.length;i++){
        if(signArray[i].email.toLowerCase() ==signEmail.value.toLowerCase()){
            messages.push("email already exists");
        };
    };
    if (messages.length > 0) {
        theAlert.innerText = messages[0];
    }else{
        theAlert.innerHTML=`<span class="text-success">Success</span>`;
        signArray.push(signup);
        localStorage.setItem('theUsers', JSON.stringify(signArray));
    };
};

// login page  
var loginEmail=document.getElementById("loginEmail");
var loginPass=document.getElementById("loginPass");
var loginBtn=document.getElementById("loginBtn");

function loginFunc(){
    if (loginEmail.value===''||loginEmail.value==null ||loginPass.value==='' ||loginPass.value==null) {
        theAlert.innerHTML='All inputs are required';
        return false;
      };
    for(i=0;i<signArray.length;i++){
        if(signArray[i].email.toLowerCase() == loginEmail.value.toLowerCase() && signArray[i].pass.toLowerCase() ==loginPass.value.toLowerCase()){
            localStorage.setItem("sessionName",signArray[i].name);
            loginBtn.href="home.html";
            return true;
        }else{
            theAlert.innerHTML='incorrect email or password'
        };
    };  
};

//home page
var welcomeUser=document.getElementById("welcomeUser");
var userName =localStorage.getItem("sessionName");
if(userName){
    welcomeUser.innerHTML=`Welcome ${userName}`;
};
//logout
function logout(){
    localStorage.removeItem("sessionName");
};