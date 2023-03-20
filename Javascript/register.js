document.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault();
    validateForm();
    check_php();
    window.location.href='../HTML/index.html';
})


function validateForm(){
    let firstName = document.getElementsByName("first_name")[0].value;
    let lastName = document.getElementsByName("last_name")[0].value;
    let email = document.getElementsByName("email")[0].value;
    let password = document.getElementsByName("pass")[0].value;
    let birthDate = document.getElementsByName("birth_date")[0].value;
    let gender = document.getElementsByName("gender")[0].value;

    if(!firstName || !lastName || !email || !password || !birthDate || !gender)
    {
        alert("All the fields must be filled.");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmailDomains = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com", "icloud.com"];

    if(!emailRegex.test(email) || !validEmailDomains.includes(email.split("@")[1])){
        alert("Please enter a valid email address.");
        return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if(!passwordRegex.test(password)){
        alert("Please enter a strong password with at least 8 characters, one lowercase letter , one uppercase letter and one digit");
        return false;
    }
    
    const today = new Date();
    const selectedDate = new Date(birthDate);

    if(selectedDate > today){
        alert("Please enter a valid birth date in the past.");
        return false;
    }

    let age = today.getFullYear() - selectedDate.getFullYear();
    let monthDiff = today.getMonth() - selectedDate.getMonth();

    if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())){
        age--;
    }

    if(age < 10){
        alert("You are too young to register.");
        return false;
    }

    if(age > 90){
        alert("You are too old to register.");
        return false;
    }

    alert("Your information is valid. Registration finsihed");
    return true;
}

function check_php(){
    fetch('http://localhost/Project/PHP/register.php', {
        method: 'POST',
        body: new FormData(document.querySelector('form'))
    })
    .then(response => response.json())
    .then(data => {
        const checkPhpElem = document.querySelector('#check_php');
        if (checkPhpElem) {
            if (data.status === 'success') {
                checkPhpElem.innerHTML = 'Registration successful';
            } else if (data.status === 'error') {
                alert("Email is already used choose another one");
            }
        } else {
            console.error('Element with ID "check_php" not found');
        }
    })
}

