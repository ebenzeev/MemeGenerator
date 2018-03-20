'use strict';

console.log('Meme Generator');

var gImgs = [{
    id: 1,
    url: 'img/aliens.jpg',
    keywords: ['aliens', 'crazy', 'hands']
}, {
    id: 2,
    url: 'img/bad-luck-brian.jpg',
    keywords: ['brian', 'bad luck', 'ginger']
}, {
    id: 3,
    url: 'img/doge.jpg',
    keywords: ['happy', 'dog', 'doge', 'wows']
}, {
    id: 4,
    url: 'img/facepalm.jpg',
    keywords: ['stuiped', 'facepalm', 'picard']
}, {
    id: 5,
    url: 'img/fb-girl.jpg',
    keywords: ['stuiped', 'annoying', 'teenager', 'girl']
}, {
    id: 6,
    url: 'img/hide-the-pain-harold.jpg',
    keywords: ['old', 'harold', 'phone', 'awkward', 'pain']
}, {
    id: 7,
    url: 'img/if-you-know-what-i-mean.jpg',
    keywords: ['mr bean', 'know what i mean']
}, {
    id: 8,
    url: 'img/i-have-no-idea.jpg',
    keywords: ['dog', 'lab', 'no idea']
}, {
    id: 9,
    url: 'img/mordor.jpg',
    keywords: ['mordor', 'sean bean', 'lord of the rings']
}, {
    id: 10,
    url: 'img/neil-degrasse.jpg',
    keywords: ['neil degrasse tyson', 'badass', 'watchout']
}, {
    id: 11,
    url: 'img/not-sure-if.jpg',
    keywords: ['futurama', 'frey', 'not sure if']
}, {
    id: 12,
    url: 'img/over-9000.jpg',
    keywords: ['vegeta', 'over 9000', 'dragon ball z']
}, {
    id: 13,
    url: 'img/photogenic-guy.jpg',
    keywords: ['photogenic guy', 'smile', 'marathon']
}, {
    id: 14,
    url: 'img/success.jpg',
    keywords: ['success', 'baby', 'fist']
}, {
    id: 15,
    url: 'img/time-for-that.jpg',
    keywords: ['hood', 'aint nobody got time for that']
}, {
    id: 16,
    url: 'img/wat.jpg',
    keywords: ['wat', 'wtf', 'women']
}];

function renderMemes() {
    var elGallary = document.querySelector('.meme-gallary');
    var strHtml = '';
    for (var i = 0; i < gImgs.length; i++) {
        strHtml += '<img imgId="'+gImgs[i].id+'" src="'+gImgs[i].url+'" onclick="memeSelect(this)" alt="" srcset="">';
    }
    elGallary.innerHTML = strHtml;
}

function memeSelect(element){
    var elMemes = document.getElementById('memes');
    var elAbout = document.getElementById('about');
    var elContact = document.getElementById('contact');
    console.log(elMemes);
    elMemes.style.display = '';
    elMemes.style.display = 'none';
    
}