const noFillStars = [ ...document.getElementsByClassName('no-fill-star')]
noFillStars.forEach((star, index) => {
    star.addEventListener('click', () => {
        for(x = 0; x <= 4; x++ ){
            if(x <= index) {
                noFillStars[x].src = './img/fill star.png'
            }
            else {
                noFillStars[x].src = './img/no fill star.png'
            }
        }
    })
})