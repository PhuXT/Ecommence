const noFillStars = [ ...document.getElementsByClassName('no-fill-star')]
let rating = 0
noFillStars.forEach((star, index) => {
    star.addEventListener('click', () => {
        for(x = 0; x <= 4; x++ ){
            if(x <= index) {
                rating = (x + 1)
                noFillStars[x].src = '/img/fill star.png'
            }
            else {
                noFillStars[x].src = '/img/no fill star.png'
            }
        }
    })
})

// function set review Start
const starReviews = [...document.querySelectorAll('.star-reviews')]
function setReviewStars(starRating) {
    starReviews.forEach( (star, index) => {
        if(index+1 <= starRating){
            star.src = '/img/fill star.png'
        }else {
            star.src = '/img/no fill star.png'
        }
    })
}


// Funtion Create REview Item
function createReviewItem(listReview) {
    let html = ''
    listReview.map((review => {
        html += `<div class="review-item">
                    <div class="avatar-reviewer" data-rating="${review.rating}.0">
                        <img src="/img/user 1.png" alt="" srcset="">
                    </div>
                    <h3 class="review-title">${review.reviewTitle}</h3>
                    <p class="review-content">${review.reviewContent}</p>
                </div>`
        reviewerContainer.innerHTML = html        
    }))

}
// function create same cart product
const productContainer = document.querySelector('.product-container') 

function createProductCard(listProducts){
    let html = ''
    listProducts.map(product =>{
        return html += `<div class="product-card">
                            <a href="/product/${product._id}"><img src="/${product.img}" alt="Product-1" class="product-img"></a>
                            <p class="product-name">${product.nameProduct}</p> <span><i class="fa-solid fa-arrow-right-long"></i></span> </p>
                        </div>`
    }) 
    productContainer.innerHTML = html
}

// handle RESPONE from server
const img = document.querySelector('.detail-product-container > img')
const productName = document.querySelector('.product-name')
const shortDes = document.querySelector('.description')
const description = document.querySelector('.des')
const price = document.querySelector('.price')
const bestSelling = document.querySelector('.best-selling-product-section')
const productCart = document.querySelector('.product-card')
const reviewerContainer = document.querySelector('.reviewer-container')
const ratingCount = document.querySelector('.rating-count')


function sendata(path, data, method) {
    fetch(path, {
        method: method,
        headers: new Headers({
            accept: 'application/json',
            contentType: 'application/json'
        }),
        body: JSON.stringify(data)

    } )
        .then( res => res.json())
        .then(data => {
            img.src = "/"+data.product.img
            productName.innerText = data.product.nameProduct
            shortDes.innerText = data.product.shortDescription
            description.innerText = data.product.description
            ratingCount.innerText = data.product.countRating + ' reviews'
            price.innerText = data.product.price + ' $'
            // Set Star Review
            setReviewStars(data.product.everageRating)
            if(!data.sameProduct[0]) {
                productContainer.innerHTML = `<h1>No Product Same</h1>`
            }else {
                createProductCard(data.sameProduct  )
            }
            if(!data.reviews[0]) {
                console.log('No Reviews');
                reviewerContainer.innerHTML = 'No Review'
            }else {
                createReviewItem(data.reviews)
            }
        })
}

const id = location.pathname.split('/').pop()
sendata(`/product/${id}`, {id}, 'POST')

// ADD REVIEWS



const btnAddReview = document.querySelector('.add-review-btn')
const user = JSON.parse(sessionStorage.user || null)
const reviewHeadline = document.querySelector('.review-headline')
const reivewField = document.querySelector('.reivew-field')
const erro = document.querySelector('.erro')

btnAddReview.addEventListener('click', () => {
    if(!user) {
        location.replace(`/user/signin?after=${id}`)
    }else {
        if(!reviewHeadline.value.length || !reivewField.value.length || rating == 0) {
            erro.innerText = 'All field is required'
        }else if(reviewHeadline.value.length > 50 || reivewField.value.length > 100 ) {
            erro.innerText = 'reivewField < 50 letter'
        }else {
            erro.innerText = ''
            fetch('/product/addreview', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user.email,
                    rating,
                    productID: id,
                    reviewContent: reivewField.value,
                    reviewTitle: reviewHeadline.value,
                }),
            })
                .then( res => res.json())
                .then(data => {
                        createReviewItem(data.reviews)
                })
        }
    }
})
