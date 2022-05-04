window.onload = function(){
    let user = JSON.parse(sessionStorage.user || null)
    if(!user) {
        location.replace('http://localhost:3000/user/signin')
    }else if(user.isSeller){
    location.replace('http://localhost:3000/user/dashboard')
    }
}


// SHOW LOADING GIF
const loader = document.querySelector('.loader')
function showLoader(action) {
    loader.style.display = `${action}`
}

// FETCH SENDDATA
function sendData(path, data) {
    fetch(path, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then( data => {
            console.log(data);
            user = JSON.parse(sessionStorage.user)
            user.isSeller = true
            sessionStorage.user = JSON.stringify(user)
            location.replace('http://localhost:3000/user/dashboard')
        })
}


// SHOW ERROR message
const erro = document.querySelector(".erro")
function showError(message) {
    erro.innerText = message;
}


// FORM SUBMIT
const applyBtn = document.querySelector('.apply-btn')
const bussinessName = document.getElementById('business-name')
const numberContact = document.getElementById('number')
const address = document.querySelector('.address')
const about = document.querySelector('.about')

applyBtn.addEventListener('click', () => {
        if( bussinessName.value.length<10 ||
            numberContact.value.length<10 ||
            address.value.length<10 ||
            about.value.length<10) {
                showError('Some infomation is incorrect')
        }else {
            let email = JSON.parse(sessionStorage.user).email
            console.log(email);
            showError('')
            showLoader('block')
            sendData('http://localhost:3000/user/seller', 
            {
                bussinessName: bussinessName.value,
                numberContact: numberContact.value,
                address: address.value,
                about: about.value,
                email
            }
            )
        }
})