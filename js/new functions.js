
function saveImage(elLink){
var canvas = document.getElementById("memecanvas");
var dataURL = canvas.toDataURL();
elLink.href = dataURL;
}