var typed = new Typed(".multiple-text", {
    strings: ["an aspiring developer.", "a problem solver.", "passionate and motivated."],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,

})  

var element = document.querySelector('.contact-container');

// Function to check if element is in view
function isInView(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Scroll event listener
window.addEventListener('scroll', function () {
    if (isInView(element)) {
        if (!element.classList.contains('visible')) {
            element.classList.add('visible');
        }
    } else {
        element.classList.remove('visible');
    }
});