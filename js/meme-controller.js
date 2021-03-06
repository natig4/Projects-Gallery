'use strict';
var gElCanvas
var gCtx
var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function addListeners() {
    addMouseListeners();
    addTouchListeners();
    window.addEventListener('resize', () => {
        resizeCanvas();
        renderCanvas();
    });
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove);
    gElCanvas.addEventListener('mousedown', onDown);
    gElCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove);
    gElCanvas.addEventListener('touchstart', onDown);
    gElCanvas.addEventListener('touchend', onUp);
}

function onDown(ev) {
    const pos = getEvPos(ev);
    if (!isLineClicked(pos)) return;
    setLineDrag(true);
    gStartPos = pos;
    gElCanvas.style.cursor = 'grab';
    renderTextInput();
    renderCanvas();
}

function onUp() {
    setLineDrag(false);
    gElCanvas.style.cursor = 'grab';
}

function onMove(ev) {
    const line = getCurrentLine();
    if (!line || !line.isDrag) return;
    const pos = getEvPos(ev);
    const dx = pos.x - gStartPos.x;
    const dy = pos.y - gStartPos.y;
    moveLine(dx, 'x');
    moveLine(dy, 'y');
    gElCanvas.style.cursor = 'grabbing';
    gStartPos = pos;
    renderCanvas();
}




function onImg(imgId) {
    updateSelectedMeme(imgId)
    onAddLine()
    renderCanvas(imgId)
    toggleView('.meme-container', '.main-content', '.memes-gallery')
    resizeCanvas()
}


function onSetLineTxt(txt) {
    setLineTxt(txt);
    renderCanvas()
}

function onChangeColor(type, color) {
    changeColor(type, color);
    renderCanvas();
}

function onChangeFontSize(diff) {
    changeFontSize(diff);
    renderCanvas();
}

function onChangeFontFamily(font) {
    changeFontFamily(font);
    renderCanvas();
}

function onChangeLine() {
    var line = changeLine();
    onSetLineTxt(line.txt);
    renderCanvas();
}

function onMoveLine(direction) {
    const diff = direction === 'up' ? -5 : 5;
    moveLine(diff, 'y');
    renderCanvas();
}

function onCreateLine() {
    if (getLinesAmount() === 0) onAddLine();
}

function onAddLine() {
    const font = document.querySelector('.select-font-family').value;
    addLine(font);
    renderCanvas();
}

function onRemoveLine() {
    removeLine();
    document.querySelector('.str-input').value = ""
    renderCanvas();
}

function onChangeAlign(direction) {
    changeAlign(direction);
    renderCanvas();
}

function renderTextInput() {
    const line = getCurrentLine();
    if (!line) return;
    document.querySelector('.str-input').value = line.txt;
}

function drawText() {
    const lines = getLines();
    if (!lines) return;
    lines.forEach((line) => {
        const txt = line.txt;
        gCtx.lineWidth = 2;
        gCtx.textBaseline = 'top';
        gCtx.textAlign = `${line.align}`;
        gCtx.font = `${line.size}px ${line.fontFamily}`;
        gCtx.fillStyle = line.color;
        gCtx.strokeStyle = line.stroke;
        gCtx.fillText(txt, line.pos.x, line.pos.y);
        gCtx.strokeText(txt, line.pos.x, line.pos.y);
    });
}

function drawBorder() {
    const line = getCurrentLine();
    if (!line) return;
    gCtx.beginPath();
    if (line.align === 'left') {
        gCtx.rect(line.pos.x, line.pos.y, gCtx.measureText(line.txt).width + 10, line.size);
    } else if (line.align === 'center') {
        gCtx.rect(line.pos.x - gCtx.measureText(line.txt).width / 2, line.pos.y, gCtx.measureText(line.txt).width + 10, line.size);
    } else if (line.align === 'right') {
        gCtx.rect(line.pos.x - gCtx.measureText(line.txt).width, line.pos.y, gCtx.measureText(line.txt).width + 10, line.size);
    }
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = line.strokeColor;
    gCtx.stroke();
    gCtx.closePath();
}

function renderCanvas(imgId) {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    if (!imgId) imgId = getImgId()
    var img = new Image;
    img.src = './img/meme-imgs/' + imgId + '.jpg'
    img.onload = function() {
        var scale = Math.max(gElCanvas.width / img.width, gElCanvas.height / img.height);
        var x = (gElCanvas.width / 2) - (img.width / 2) * scale;
        var y = (gElCanvas.height / 2) - (img.height / 2) * scale;
        gCtx.drawImage(img, x, y, img.width * scale, img.height * scale)
        addListeners()
        drawText();
        drawBorder();
        renderTextInput();
    }
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function onDownloadMeme(elLink) {
    console.log(elLink)
    const memeContent = gElCanvas.toDataURL();
    elLink.href = memeContent;
}

function onSaveMeme() {
    const meme = gElCanvas.toDataURL('image/jpeg');
    saveMeme(meme);
}