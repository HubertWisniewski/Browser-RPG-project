var changeButton = document.querySelector('.changeregisterform')
var changeButtonTwo = document.querySelector('.changeform')
var loginForm = document.querySelector('.login')
var signUpForm = document.getElementById('mainform')
var isOut = false

changeButton.addEventListener('click', animate)

changeButtonTwo.addEventListener('click', animate)

function animate() {
    signUpForm.classList.remove('register')
    if (isOut === false) {     
        signUpForm.classList.remove('register-before') 
        signUpForm.classList.add('register-after')
        isOut = !isOut
    } else if (isOut === true) {
        signupForm.classList.remove('register-after')
        signUpForm.classList.toggle('register-before')
        isOut = !isOut
    }
   
}


