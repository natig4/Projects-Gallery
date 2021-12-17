'use strict';

function onInit() {
    renderImgs()
}

function renderImgs() {
    const imgs = getImgs()
    const strHtmls = imgs.map(function(img) {
        return `<div class="img-container" >
        <img class="img img${img.id}" onclick="onImg(${img.id})" src="./img/meme-imgs/${img.id}.jpg" alt=""></div>`
    })
    document.querySelector('.gallery-container').innerHTML = strHtmls.join('')
}

function toggleView(el1, el2, el3) {
    const $el1 = $(`${el1}`)
    const $el2 = $(`${el2}`)
    const $el3 = $(`${el3}`)
    $el1.removeClass('hide')
    $el1.addClass('flex')
    $el2.removeClass('flex')
    $el2.addClass('hide')
    $el3.removeClass('flex')
    $el3.addClass('hide')
        // $el4.removeClass('flex')
        // $el4.addClass('hide')
}

function onNav(elLi) {
    toggleNav(elLi)

    switch (elLi.innerHTML) {
        case 'Gallery':
            toggleView('.main-content', '.meme-container', '.memes-gallery')
            break;
        case 'Memes':
            toggleView('.memes-gallery', '.meme-container', '.main-content')
            renderMyMemes()
            break;
        case 'About':
            console.log('about')
            break;
    }
}

function toggleNav(elLi) {
    var lis = document.querySelectorAll('ul li')
    lis.forEach(li => {
        li.classList.remove('active')
    });
    if (elLi) elLi.classList.add('active');
}

function renderMyMemes() {
    const memes = getSavedMemes();
    var strHtmls;
    const memeSize = Object.keys(memes).length;
    if (memeSize) {
        strHtmls = memes.map((meme) => {
            return `<img src="${meme}"/>`;
        });
    } else {
        strHtmls = `<h1>No saved Memes Go ahead and create one 🙂</h1>`;
    }
    const elGallery = document.querySelector('.memes-gallery');
    if (memeSize) elGallery.innerHTML = strHtmls.join('');
    else elGallery.innerHTML = strHtmls;
}

function onSearch(ev) {
    ev.preventDefault();
    const elSearch = document.querySelector('input[name="search"]');
    fillterBySearch(elSearch.value);
    elSearch.value = '';
    renderKeywords();
    renderImgs();
}

function onKeyFillter(word) {
    fillterBySearch(word);
    renderKeywords();
    renderImgs();
}

function renderKeywords() {
    const isViewAllKeys =
        document.querySelector('.btn-more').innerText === 'More...' ? false : true;
    const keywords = getKeywords(isViewAllKeys);

    var strHtmls = '';
    for (const word in keywords) {
        strHtmls += `
      <li class="keyword"><a href="#" style="font-size: ${keywords[word]}px; margin-right:20px;"
      onclick="onKeyFillter('${word}')">${word}</a></li>`;
    }

    document.querySelector('.search-indexes').innerHTML = strHtmls;
}

function onToggleMore(elBtn) {
    elBtn.innerText = elBtn.innerText === 'More...' ? 'Less...' : 'More...';
    renderKeywords();
}