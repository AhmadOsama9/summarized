document.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault();
    validateForm();
    checkLogin();
    window.location.href='../HTML/index.html';
})



function validateForm(){
    let email = document.getElementsByName("email")[0].value;
    let password = document.getElementsByName("pass")[0].value;


    if(!email || !password){
        alert("Enter your email and password");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmailDomains = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com", "icloud.com"];

    if(!emailRegex.test(email) || !validEmailDomains.includes(email.split("@")[1])){
        alert("There's no email like that in our database, make sure and try again");
        return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if(!passwordRegex.test(password)){
        alert("there's no password like that in our database, make sure and try again");
        return false;
    }
}

function checkLogin() {

    fetch('http://localhost/Project/PHP/login.php', {
        method: 'POST',
        body: new FormData(document.querySelector('form'))
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert("Login successful");
        } else if (data.status === 'error') {
            alert("Incorrect email or password");
        }
    })
}
