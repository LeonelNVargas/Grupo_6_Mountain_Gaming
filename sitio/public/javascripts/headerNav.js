window.addEventListener('load', function(){
    let navItems = document.querySelectorAll('#headerNav a');
    for (let navItem of navItems){
        navItem.addEventListener('mouseover', function(){
            navItem.style.transition = "color 2s";
        })
    }
    let carritoIcono = document.querySelector('#cajacarrito i');
    carritoIcono.addEventListener('mouseover', function(){
        carritoIcono.style.transition = "1s";
        carritoIcono.style.transform = "scale(1.2)";
        carritoIcono.addEventListener('mouseout', function(){
            carritoIcono.style.transform = "none";
        })
    })
})