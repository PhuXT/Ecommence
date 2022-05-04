let user = JSON.parse(sessionStorage.user || null)
window.onload = function() {
    if(!user) {
        location.replace('/user/signin')
    }
}

const title = document.querySelector('.add-product-section h1')

// show erro message 
const errorBox =document.querySelector('.add-product-section .error')
function showErroMessage(message) {
    errorBox.style.left = '30px';
    errorBox.style.display = 'block'
    errorBox.innerText = message
    setTimeout(() => {
        errorBox.style.left = '-200px';
        errorBox.style.display = 'none'
    }, 3000)
}


// Upload 
const backgoundUpload = document.querySelector('#backgound-upload')
const uploadInput = document.getElementById('upload-img')
const imgPath = "/img/No-img.png"


uploadInput.addEventListener('change', (e) => {
    // preview image before uploaded image
    const url = window.URL.createObjectURL(uploadInput.files[0]);
    backgoundUpload.src = url
    backgoundUpload.style.display = 'block'
})

console.log(uploadInput.files);
// BTN ADD PRODUCT LISTEN EVENT
const addProductBtn = document.querySelector('#add-product-btn')

const productName = document.getElementById('product-name')
const shortDescription = document.getElementById('short-description')
const productPrice = document.getElementById('price')
const description = document.getElementById('description')
const tag = document.getElementById('tag')


//send  XML RESQUEST 

const userSession = JSON.parse(sessionStorage.user)

const requestUploadFile =  () =>{
    const formData = new FormData()
    formData.append('myfile', uploadInput.files[0])
    formData.append('productName', productName.value)
    formData.append('shortDescription', shortDescription.value)
    formData.append('productPrice', productPrice.value)
    formData.append('description', description.value)
    formData.append('tag', tag.value)
    formData.append('seller', userSession.email)


    const xmlRequest = new XMLHttpRequest()
    xmlRequest.onreadystatechange = () => {
        if(xmlRequest.readyState === XMLHttpRequest.DONE){
            console.log('DONE')
            const respone = JSON.parse(xmlRequest.response || null)
            console.log(respone);
            if(respone.error){
                console.log(respone.error);
                showErroMessage(respone.error)
            }else if(respone.success){
                location.replace('/user/seller')
            }
        }
    }
    xmlRequest.open('POST', '/user/addproduct')
    xmlRequest.send(formData)
}


addProductBtn.addEventListener('click', () => {
    const price = Number.parseInt(productPrice.value)
    if(!uploadInput.files[0]) {
        showErroMessage('You need upload a photo')
    }else if( !productName.value.length || 
              !shortDescription.value.length || 
              !productPrice.value.length || 
              !description.value.length || 
              !tag.value.length ) {
        
        showErroMessage('All field is required')
    }else if( !price ) {
        showErroMessage('Price is not a number')    
    }else {
        requestUploadFile()
    }
})


// Chức năng edit Product
let productId = null
if(location.pathname != '/user/addproduct') {
    title.innerText = "Edit Product"
    addProductBtn.innerText = "Save Edit"
    const id = location.pathname.split('/').pop()
    const data = {id, user}
    fetch(`/user/editproduct/${productId}`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json'}),
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            productName.value = data.product.nameProduct
            shortDescription.value = data.product.shortDescription
            productPrice.value = data.product.price
            description.value = data.product.description
            tag.value = data.product.tags
            backgoundUpload.src = `/${data.product.img}`
            backgoundUpload.style.display = 'block'
        })  

    addProductBtn.addEventListener('click', () => {
        console.log('Chua xong');
        location.replace('/user/dashboard')
    })    
}



    