var gooey = document.querySelector(".gooey"),
    down=false; 

window.onmousemove = function(e) {
    if(down){
        gooey.style.top = e.client + "px"
        gooey.style.left= e.client + "px"
    }
}