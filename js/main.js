'use strict';

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

var gMeme = {
    selectedImgId: null,
    txts: [{
        line: 'I never eat Falafel',
        size: 20,
        align: 'left',
        color: 'red'
    }]
}


function init() {
    //hidding canvas element
    // var c = document.querySelector('.canvas');
    // c.classList.add('display-none');
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
    elMemes.style.display = '';
    elMemes.style.display = 'none';
    var imgId = el.id;
    imgId = parseInt(imgId);
    var elIdx = gImgs.findIndex(function (emp) {
        return emp.id === imgId
    });
    gMeme.selectedImgId=elIdx;
    createCanvas(elIdx);
}

// function createCanvas(elIdx) {
//     console.log('elIdx:', elIdx);
//     var c = document.getElementById('memecanvas');
//     c.classList.remove('display-none');
//     var ctx = c.getContext("2d");
//     var img = new Image;
//     img.src = gImgs[elIdx].url;
//     ctx.drawImage(img, 1, 1, canvasWidth, canvasHeight);
//     // ctx.width

// }

function createCanvas(elIdx) {
    var memeSize = 300;

    var canvas = document.getElementById('memecanvas');
    var ctx = canvas.getContext('2d');


    // Set the text style to that to which we are accustomed



    canvas.width = memeSize;
    canvas.height = memeSize;

    //  Grab the nodes

    var img = new Image;
    img.src = gImgs[elIdx].url;
    var topText = document.getElementById('top-text');
    var bottomText = document.getElementById('bottom-text');

    // When the image has loaded...
    // img.onload = function () {
    drawMeme()
    // }

    topText.addEventListener('keydown', drawMeme)
    topText.addEventListener('keyup', drawMeme)
    topText.addEventListener('change', drawMeme)

    bottomText.addEventListener('keydown', drawMeme)
    bottomText.addEventListener('keyup', drawMeme)
    bottomText.addEventListener('change', drawMeme)

    function drawMeme() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0, memeSize, memeSize);

        ctx.lineWidth = 4;
        ctx.font = '20pt sans-serif';
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        var text1 = document.getElementById('top-text').value;
        text1 = text1.toUpperCase();
        var x = memeSize / 2;
        var y = 0;

        wrapText(ctx, text1, x, y, 300, 28, false);

        ctx.textBaseline = 'bottom';
        var text2 = document.getElementById('bottom-text').value;
        text2 = text2.toUpperCase();
        y = memeSize;

        wrapText(ctx, text2, x, y, 300, 28, true);

    }

    function wrapText(context, text, x, y, maxWidth, lineHeight, fromBottom) {

        var pushMethod = (fromBottom) ? 'unshift' : 'push';

        lineHeight = (fromBottom) ? -lineHeight : lineHeight;

        var lines = [];
        var y = y;
        var line = '';
        var words = text.split(' ');

        for (var n = 0; n < words.length; n++) {
            var testLine = line + ' ' + words[n];
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;

            if (testWidth > maxWidth) {
                lines[pushMethod](line);
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }
        lines[pushMethod](line);

        for (var k in lines) {
            context.strokeText(lines[k], x, y + lineHeight * k);
            context.fillText(lines[k], x, y + lineHeight * k);
        }


    }
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
        } else {
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