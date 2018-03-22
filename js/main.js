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
    txts: []
}

var memeSize = 300;
var gCanvas;

function init() {
    renderCommon();
    var elCanvas = document.querySelector('.canvas-container');
    elCanvas.style.display = 'none';
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
    var elCanvas = document.querySelector('.canvas-container');
    elCanvas.style.display = '';
    elMemes.style.display = 'none';
    elAbout.style.display = 'none';
    elContact.style.display = 'none';
    var imgId = el.id;
    imgId = parseInt(imgId);
    if (gMeme.selectedImgId === 'custom') return;
    gMeme.selectedImgId = gImgs.findIndex(function (emp) {
        return emp.id === imgId
    });
    createCanvas(gMeme.selectedImgId);

}

function createCanvas(elIdx) {
    createEditBox();
    drawMeme();
}

function drawMeme(url) {
    var img = new Image;
    if (gMeme.selectedImgId === 'custom') {
        img.src = url;
    } else {
        img.src = gImgs[gMeme.selectedImgId].url;
    }
    img.onload = function () {

        // console.log('img:', img);
        gCanvas = document.getElementById('memecanvas');
        var ctx = gCanvas.getContext('2d');
        gCanvas.width = memeSize;
        gCanvas.height = memeSize;
        // var bottomText = document.getElementById('bottom-text');
        ctx.clearRect(0, 0, gCanvas.width, gCanvas.height);

        ctx.drawImage(img, 0, 0, memeSize, memeSize);

        ctx.lineWidth = 4;
        ctx.strokeStyle = 'black';
        ctx.textBaseline = 'top';
        for (var i = 0; i < gMeme.txts.length; i++) {
            var txt = document.getElementById('top-text-' + i);
            txt.addEventListener('keydown', drawMeme);
            txt.addEventListener('keyup', drawMeme);
            txt.addEventListener('change', drawMeme);
            ctx.font = gMeme.txts[i].size + 'pt sans-serif';
            ctx.fillStyle = gMeme.txts[i].color;
            ctx.textAlign = gMeme.txts[i].align;
            if (gMeme.txts[i].shadow === true) {
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                ctx.shadowColor = '#808080';
            } else{
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowColor = '#808080'; 
            }
            document.querySelector('.font-color-' + i + '').value = gMeme.txts[i].color;
            var text1 = document.getElementById('top-text-' + i).value;
            gMeme.txts[i].line = text1;
            text1 = text1.toUpperCase();
            EventListner(text1, i);
            var y = 50 * i;
            switch (gMeme.txts[i].align) {
                case 'center':
                    var x = memeSize / 2;
                    break;
                case 'left':
                    var x = 0.5;
                    break;
                case 'right':
                    var x = memeSize - 5;
                    break;
                default:
                    var x = memeSize / 2;;
            }

            wrapText(ctx, text1, x, y, 300, 28, false);
        }

        function EventListner(txt, idx) {
            var txt = document.getElementById('top-text-' + idx);
            txt.addEventListener('keydown', drawMeme);
            txt.addEventListener('keyup', drawMeme);
            txt.addEventListener('change', drawMeme);
        }
    }
}

function wrapText(context, text, x, y, maxWidth, lineHeight, fromBottom) {
    var pushMethod = (fromBottom) ? 'unshift' : 'push';
    lineHeight = (fromBottom) ? -lineHeight * 1.2 : lineHeight * 1.2;
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

function filterContatins(val) {
    var filteredImgs = [];
    //reset filter query
    if (val) {

        if (val !== 'reset') {
            gImgs.forEach(function (element, idx) {
                if (element.keywords.includes(val)) filteredImgs.push(gImgs[idx]);
            })
            renderMemes(filteredImgs);
            document.querySelector('.filter-result').classList.remove('hidden');
            document.querySelector('.filterd').innerHTML = filteredImgs.length + ' images were found';
            return;
        }
        if (val === 'reset') {
            document.querySelector('.filterd').innerHTML = '';
            document.querySelector('.filter-result').classList.add('hidden');
            document.getElementById('filter').placeholder = 'Enter filter keyword';
            document.getElementById('filter').value = '';
            renderMemes(gImgs);

            var elMemes = document.getElementById('memes');
            var elAbout = document.getElementById('about');
            var elContact = document.getElementById('contact');
            var elCanvas = document.querySelector('.canvas-container');
            elCanvas.style.display = 'none';
            elMemes.style.display = '';
            elAbout.style.display = '';
            elContact.style.display = '';
            return;
            /////
        }
    } else {
        // if (val === undefined) {
        //validation empty query
        var keywords = document.getElementById('filter').value;
        if (keywords === '' || keywords === undefined) {
            renderMemes(gImgs);
            document.querySelector('.filter-result').classList.add('hidden');
            return;
        } else {
            //creating an array from the string
            keywords = keywords.split(' ');
            for (var i = 0; i < keywords.length; i++) {
                var keyword = keywords[i].toLowerCase();
                gImgs.forEach(function (element, idx) {
                    if (element.keywords.includes(keyword)) filteredImgs.push(gImgs[idx]);
                })
            }
            //telling the user for the results of the query
            document.querySelector('.filter-result').classList.remove('hidden');
            document.querySelector('.filterd').innerHTML = filteredImgs.length + ' images were found';
            //in-case of no results found
            if (filteredImgs.length === 0) {
                document.querySelector('.filterd').innerHTML = 'No Results Were Found, try again';
            }
        }
        renderMemes(filteredImgs);
    }
}

function mostCommon() {
    var allKeywords = [];
    gImgs.forEach(function (obj) {
        obj.keywords.forEach(function (arr) {
            allKeywords.push(arr);
        })
    })
    var commonMap = allKeywords.reduce(function (acc, key) {
        if (key in acc) {
            acc[key]++
        } else acc[key] = 1;
        return acc;
    }, {})
    return commonMap;
}

function renderCommon() {
    var commonMap = mostCommon();
    var commonItems = Object.keys(commonMap);
    //mult for increasing font size based on times the keyword is shown.
    var mult = 16;
    var str = '';
    for (var i = 0; i < commonItems.length; i++) {
        str += `<p class="common" style= "font-size: ${commonMap[commonItems[i]] * mult}px" onclick="filterContatins('${commonItems[i]}')"> ${commonItems[i]} </p>
        `
    }
    document.querySelector('.most-common').innerHTML = str;
}

function addImgUrl(url) {
    var elMemes = document.getElementById('memes');
    var elAbout = document.getElementById('about');
    var elContact = document.getElementById('contact');
    var elCanvas = document.querySelector('.canvas-container');
    elCanvas.style.display = '';
    elMemes.style.display = 'none';
    elAbout.style.display = 'none';
    elContact.style.display = 'none';
    gMeme.selectedImgId = 'custom';
    drawMeme(url);
}

function increaseFontSize(Idx) {
    gMeme.txts[Idx].size++;
    drawMeme();
}

function decreaseFontSize(Idx) {
    gMeme.txts[Idx].size--;
    drawMeme();
}

function alignLeft(Idx) {
    gMeme.txts[Idx].align = 'left';
    drawMeme();
}

function alignRight(Idx) {
    gMeme.txts[Idx].align = 'right';
    drawMeme();
}

function alignCenter(Idx) {
    gMeme.txts[Idx].align = 'center';
    drawMeme();
}

function fontColor(elInput, Idx) {
    gMeme.txts[Idx].color = elInput.value;
    drawMeme();
}

function addShadow(Idx,el,isShadow){
    if (isShadow === true) {
        gMeme.txts[Idx].shadow = false;
        isShadow = false;
        // el.onclick = 'addShadow('+Idx+',this,false)';
        // el.classList.remove = '<i class="fas fa-moon"></i>'
        renderEditBox(isShadow);
        drawMeme();
    }else{
        gMeme.txts[Idx].shadow = true;
        isShadow = true;
        // el.onclick = 'addShadow('+Idx+',this,true)';
        // el.innerHTML = '<i class="far fa-moon"></i>';
        renderEditBox(isShadow);
        drawMeme();
    }

}

function delBox(Idx){
    gMeme.txts.splice(Idx,1);
    renderEditBox();
}


function createEditBox() {
    var emptyTxtObj = { line: 'Your Meme', size: 20, align: 'center', color: '#000000', shadow: false };
    gMeme.txts.push(emptyTxtObj)
    renderEditBox();
}

function renderEditBox(isShadow){
    var str = '';
    (isShadow === undefined)? isShadow = false : isShadow = isShadow;
    for (var i = 0; i < gMeme.txts.length; i++) {
        str += `<div class="canvas-inputs flex flex-column">
        <input type='text' value='${gMeme.txts[i].line}' id='top-text-${i}' />
        <div class="inputs-buttons">
        <button onclick="delBox(${i})">
        <i class="fas fa-trash-alt"></i>
        </button>
        <button onclick="createEditBox()">
        <i class="fas fa-cart-plus"></i>
        </button>
        <button onclick="addShadow(${i},this,${isShadow})">
        <i class="fas fa-sun"></i>
        </button>
        <button onclick="selectFont(${i})">
        <i class="fas fa-font"></i>
        </button>
        <button onclick="moveDown(${i})">
        <i class="fas fa-arrow-down"></i>
        </button>
        <button onclick="moveUp(${i})">
        <i class="fas fa-arrow-up"></i>
        </button>
        <input type="color" class="font-color-${i}" onchange="fontColor(this ,${i})">
        <button onclick="increaseFontSize(${i})">
        <i class="fas fa-plus"></i>
        </button>
        <button onclick="decreaseFontSize(${i})">
        <i class="fas fa-minus"></i>
        </button>
        <button onclick="alignLeft(${i})">
        <i class="fas fa-align-left"></i>
        </button>
        <button onclick="alignCenter(${i})">
        <i class="fas fa-align-center"></i>
        </button>
        <button onclick="alignRight(${i})">
        <i class="fas fa-align-right"></i>
        </button>
        </div>
        </div>`
    }
    document.getElementById('edit-box').innerHTML = str;
    drawMeme();
}