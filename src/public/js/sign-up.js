const erro = document.querySelector('.erro')
function showErrorMessage( message ) {
    erro.innerText = message
}

// send Data
const sendData = (path, data) => {
    fetch(path, {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
        }),
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                showErrorMessage(data.error)
                showLoader('none')
            }
            else if(data.created){
                location.replace('/')
            }
            else {
                sessionStorage.user = JSON.stringify(data)
                if(location.search){
                    const id = location.search.split('=')[1]
                    location.replace(`/product/${id}`)
                }
                else{
                    location.replace('/')
                }
            }

        })
}


// Loader.gif show loader
const loader = document.querySelector('.loader')
function showLoader(action) {
    loader.style.display = `${action}`
}

// check input
const fullName = document.querySelector('input[name="full-name"]') || null
const email = document.querySelector('input[name="email"]')
const password = document.querySelector('input[name="password"]')
const rePassword = document.querySelector('input[name="re-password"]') || null
const phone = document.querySelector('input[name="phone"]') || null
const submitBtn = document.querySelector('.submit') 
const term = document.querySelector('#term')|| null

submitBtn.addEventListener('click', function() {
    // Sign-Up form click
    if(fullName !== null){
        if(fullName.value.length < 5){
            showErrorMessage('name must be 5 letter long')
        }else if(!email.value.length){
            showErrorMessage('enter your email address')
        }else if(password.value.length < 8) {
            showErrorMessage('password must be 8 letter long')
        }else if(rePassword.value !== password.value) {
            showErrorMessage('password and confirm password not same')
        }else if(phone.value.length < 10 ) {
            showErrorMessage('phone invalid')
        }else if(!term.checked) {
            showErrorMessage('you must agree our term')
        }
        else {
            showErrorMessage('')
            showLoader('block')
            sendData('/user/signup', {
                fullName: fullName.value,
                email: email.value,
                password:password.value,
                rePassword:rePassword.value,
                phone:phone.value,
                agreeTerm: term.checked
            })
        }
    }


 // Sign-In form click handler
    if(fullName == null) {
        if(!email.value.length || !password.value.length){
                showErrorMessage('fill all the input')
        }else {
            showLoader('block')
            sendData('/user/signin', {
            email: email.value,
            password: password.value
        })
        }
    }
})