const navbar = document.querySelector('.navbar')
window.addEventListener('scroll', (x) => {
    if(scrollY >= 190) {
        navbar.classList.add('bg')
    }else{
        navbar.classList.remove('bg')
    }
})

const collageImgs = [... document.querySelectorAll('.collage-img')]
collageImgs.forEach((collageImage, index) => {
    collageImage.addEventListener('mouseover', () => {
        collageImage.style.zIndex = 9
        collageImgs.forEach((collageImage2, index2) => {
            if(index !== index2) {
                collageImage2.style.filter = 'blur(10px)';
            }
        })
    })
    collageImage.addEventListener('mouseleave', () => {
        collageImage.style = ""
        collageImgs.forEach((collageImage2, index2) => {
            if(index !== index2) {
                collageImage2.style = ""
            }
        })
    })
})
