
function saveImage(elLink){
var canvas = document.getElementById("memecanvas");
var dataURL = canvas.toDataURL();
elLink.href = dataURL;
}

var fonts = ["Monaco","sans-serif","cursive"];

function updateForCanvas(){   
    var elCanvas = document.querySelector('.canvas-container');
    elCanvas.style.display = '';
    var elSearchInput = document.querySelector(".search-input");
    elSearchInput.style.display = 'none';
    var elFilterResult = document.querySelector(".filter-result");
    elFilterResult.style.display = 'none';
    var elMostCommon = document.querySelector(".most-common");
    elMostCommon.style.display = 'none';
    var elMemes = document.getElementById('memes');
    elMemes.style.display = 'none';
    var elAbout = document.getElementById('about');
    elAbout.style.display = 'none';
    var elContact = document.getElementById('contact');
    elContact.style.display = 'none';
}

function moveUp(){
    console.log("up");
}

function moveDown(){
    console.log("down");

}