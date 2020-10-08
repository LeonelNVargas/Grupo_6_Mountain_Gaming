window.addEventListener('load', function(){
    let imgZoom = document.querySelectorAll("#imagendelproducto");

    for (let imgzoom of imgZoom){
        imgzoom.addEventListener('mouseover', function(){
            imgzoom.style.transform = "scale(1.1)";
            imgzoom.style.transition = "1s";
        });
        imgzoom.addEventListener('mouseout', function(){
            imgzoom.style.transform = "none";
        }) 
    }
})