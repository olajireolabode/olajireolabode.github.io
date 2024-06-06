document.querySelectorAll('.thumbnail').forEach(item => {
    item.addEventListener('click', event => {
        document.querySelector('.main-image').src = item.getAttribute('data-src');
    });
});
