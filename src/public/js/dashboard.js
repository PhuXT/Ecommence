let user = JSON.parse(sessionStorage.user || null)


// showLoader
const loaderSeller = document.querySelector('.loader-seller')
function showLoader(action) {
    loaderSeller.style.display = `${action}`
}

// function deleteProduct
function deleteProduct(id) {
    fetch(`/user/dashboard/${id}`, { method: 'DELETE' })
        .then( res => res.json())
        .then( data => {
            console.log(data);
            if(data.success) {
                location.reload()
            }
        })
}   

// CREATE CARD PRODUCT
const noProduct = document.querySelector('.no-product')
const sellerProductCartContainer = document.querySelector('.seller-product-cart-container')

function createCardProduct(listData) {
    let html = ''
    listData.map(product => {
        html += `<div class="seller-product-cart">
                <img class"img-product-seller" src="/${product.img}" alt="${product.nameProduct}">
                <p class="product-seller-name">${product.nameProduct}</p>
                <div class="seller-action">
                    <i class="fa-solid fa-pencil btn-edit" onclick="location.href = '/user/editproduct/${product._id}'"></i>
                    <i class="fa-solid fa-arrow-up-right-from-square btn-show" onclick="location.href ='/product/${product._id}'"></i>
                    <i class="fa-solid fa-trash-can btn-delete" onclick ="deleteProduct('${product._id}')"></i>
                </div>
            </div>`    
    })
    noProduct.style.display = 'none'
    sellerProductCartContainer.innerHTML = html

}

// SENDATA 
function sendData(url, data, method) {
    fetch(url, {
        method: method,
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data),
    })
        .then( res => 
            {
                return res.json() 
            })
        .then( data => {
            console.log(data);
            showLoader('none')
            if(data.noData){
                noProduct.style.display = 'block'
            }else if(data.err){
                console.log(err);
            }else{
                createCardProduct(data.listProduct)
            }
            } 
        )

}   




// CHECK
const textGreeting = document.querySelector('#seller-greeting')
if(!user) {
    location.replace('/user/signin')
}else if(!user.isSeller) {
    location.replace('/user/seller')
}else{
    textGreeting.innerText += ` ${user.fullName}`
    showLoader('block')
    sendData('/user/dashboard', {seller: user.email}, 'POST')
}

