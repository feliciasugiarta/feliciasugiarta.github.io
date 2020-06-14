const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

var iSlider = {
  slideIndex: null,
  prevSlideIndex: null,
  slides: null,
  defaultDuration: 2000,

  initSlides: function(){
    this.slides = document.getElementsByClassName("iSlide");
    for( var i = 0; i < this.slides.length; i++ ){
      this.slides[i].style.display = "none"; 
    }
    this.prevSlideIndex = null;
    this.slideIndex = -1;
  },

  showSlides: function(){
    if( this.prevSlideIndex != null )  this.slides[ this.prevSlideIndex ].style.display = "none";
    this.slideIndex = ( this.slideIndex + 1 + this.slides.length ) % this.slides.length;
    this.slides[ this.slideIndex ].style.display = "block";
    this.prevSlideIndex = this.slideIndex;
    var duration = +( this.slides[ this.slideIndex ].getAttribute('data-duration') || this.defaultDuration );
    setTimeout( this.showSlides.bind( this ), duration ); // Change image every 2 seconds
  }
};

iSlider.initSlides();
iSlider.showSlides();

const logo = document.querySelectorAll('#logo path');

for(let i=0; i<logo.length; i++){
  console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
}