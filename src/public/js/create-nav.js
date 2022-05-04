const navbar1 = document.querySelector('.navbar');

if(navbar1) {
navbar1.innerHTML = `<ul class="links-container">
                    <li class="link-item active"><a class="link" href="#">Home</a></li>
                    <li class="link-item"><a class="link" href="#">Product</a></li>
                    <li class="link-item"><a class="link" href="#">About</a></li>
                    <li class="link-item"><a class="link" href="#">Contact</a></li>
                    </ul> 
                    <div class="user-interaction">
                    <div class="cart">
                        <img class="cart-icon" src="/img/cart.png">
                        <span class="cart-item-count">00</span>
                    </div>
                    <div class="user">
                        <img class="user-icon" src="/img/user.png">
                        <div class="user-icon-popup">
                            <p>login your account</p>
                            <a href="http://localhost:3000/user/signin">Login</a>
                        </div>
                    </div>
                    </div>`


const userIcon = document.querySelector('.user-icon')
const userIconPopup = document.querySelector('.user-icon-popup')

// CLick show popup
userIcon.addEventListener('click', () =>{
    userIconPopup.classList.toggle('active')
})                    

const text = document.querySelector('.user-icon-popup p')
const button = document.querySelector('.user-icon-popup a')
let user = JSON.parse(sessionStorage.user || null)
console.log(user);
if(!user){
    button.innerText = 'Login'
    text.innerText = 'Login your account'
}else{
    text.innerText = `login as ${user.fullName}`
    button.innerText = 'Logout'
    button.addEventListener('click', function(e){
        e.preventDefault();
        logout()
    })
}

const logout = () => {
    sessionStorage.clear()
    location.reload()
}

}