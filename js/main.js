'use strict';

console.log('Meme Generator');
var canvasWidth = 460;
var canvasHeight = 480;

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


function init() {
    //hidding canvas element
    var c = document.querySelector('.canvas');
    c.classList.add('display-none');
    //rendering imgs grid
    renderMemes(gImgs);

}
function renderMemes(imgs) {

    var elGallary = document.querySelector('.meme-gallary');
    var strHtml = '';
    for (var i = 0; i < imgs.length; i++) {
        strHtml += '<img id="' + imgs[i].id + '" src="' + imgs[i].url + '" onclick="memeSelect(this)" alt="" srcset="">';
    }
    elGallary.innerHTML = strHtml;
}

function memeSelect(el) {
    var elMemes = document.getElementById('memes');
    var elAbout = document.getElementById('about');
    var elContact = document.getElementById('contact');
    console.log(elMemes);
    elMemes.style.display = '';
    elMemes.style.display = 'none';
    var imgId = el.id;
    imgId = parseInt(imgId);
    var elIdx = gImgs.findIndex(function (emp) { return emp.id === imgId });
    createCanvas(elIdx);
}

function createCanvas(elIdx) {
    console.log('elIdx:', elIdx);
    var c = document.querySelector('.canvas');
    c.classList.remove('display-none');
    var ctx = c.getContext("2d");
    var img = new Image;
    //var imgIdx = gImgs.findIndex(function(emp){return emp.id === el.id});
    img.src = gImgs[elIdx].url;
    ctx.drawImage(img, 1, 1, canvasWidth * 0.5, canvasHeight);
    // ctx.width

}

function filterContatins(reset) {
    //reset filter query
    if (reset === 'reset') {
        document.querySelector('.filterd').innerHTML = '';
        document.querySelector('.filter-result').classList.add('display-none');
        document.getElementById('filter').placeholder = 'Enter filter keyword';
        document.getElementById('filter').value = '';
        renderMemes(gImgs);
    } else {
        //validation empty query
        var keywords = document.getElementById('filter').value;
        if (keywords === '' || keywords === undefined) {
            renderMemes(gImgs);
            return;
        }
        else {
            //creating an array from the string
            keywords = keywords.split(' ');
            var filteredImgs = [];
            for (var i = 0; i < keywords.length; i++) {
                var keyword = keywords[i].toLowerCase();
                gImgs.forEach(function (element, idx) {
                    if (element.keywords.includes(keyword)) filteredImgs.push(gImgs[idx]);
                })
            }
            //telling the user for the results of the query
            document.querySelector('.filter-result').classList.remove('display-none');
            document.querySelector('.filterd').innerHTML = filteredImgs.length + ' images were found';
           //in-case of no results found
            if (filteredImgs.length === 0) {
                document.querySelector('.filterd').innerHTML = 'No Results Were Found, try again';
            }
        }
        renderMemes(filteredImgs);
        // console.log('the filtered imgs array is: ', filteredImgs);
    }
}

