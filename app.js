const submitButton = document.querySelector('.promo-submit')
const heroButton = document.querySelector('.hero-banner-button')
const bannerButton = document.querySelector('.banner-button')

submitButton.addEventListener('click', (e)=>{
    e.preventDefault();

    const codeSnippet = document.querySelector('.invoke-init-text')
    codeSnippet.innerText = "init('hero-parent-element', function() {"

    // Create Copy Text Button upon submit
    const copyTextButton = document.createElement('button')
    copyTextButton.classList.add('btn', 'btn-primary', 'copy-text')
    copyTextButton.innerText = 'Copy Code Snippet'
    copyTextButton.setAttribute("onclick", "copyText()")
    copyTextButton.setAttribute("type", "submit") 

    if (document.querySelector('#append-button').childElementCount === 0) {
        document.querySelector('#append-button').append(copyTextButton)
    };


    if (localStorage.getItem('include-heroBanner') == "true") {
        codeSnippet.innerText += `
    heroBanner(
        '.${localStorage.getItem('heroParentElement')}',
        '${localStorage.getItem('heroTextTop')},
        '${localStorage.getItem('heroTextBottom')},
        '${localStorage.getItem('heroTextLocation')},
        [
            'http://sb.monetate.net/img/1/388/${localStorage.getItem('heroImageDesktop')}',
            'http://sb.monetate.net/img/1/388/${localStorage.getItem('heroImageMobile')}'
        ]
    );`
    } 
    if (localStorage.getItem('include-countdown') == "true") {
    codeSnippet.innerText += `
    countDown(
        '.${localStorage.getItem('heroParentElement')}',
        '${localStorage.getItem('countdownStart')}', 
        '${localStorage.getItem('countdownEnd')}', 
    {
        offer:     '${localStorage.getItem('bannerOffer')}',
        text:      '${localStorage.getItem('bannerText')}',
        subText:   '${localStorage.getItem('bannerSubText')}',
        timerText: '${localStorage.getItem('bannerTimerText')}'
    },
        ['${localStorage.getItem('bannerMarket')}']
    );`
    } 
    codeSnippet.innerText += `
});`

    if (localStorage.getItem('include-countdown') == "false" && localStorage.getItem('include-heroBanner') == "false") {
        codeSnippet.innerText = "DON'T FORGET TO INCLUDE COMPONENTS!!"
    }
});

bannerButton.addEventListener('click', ()=> {
    let form = document.querySelector('.promo-inputs');
    let oldFormContent = document.querySelectorAll('.form-group');

    // HIDES FORM INPUTS FROM OTHER COMPONENTS
    for(let i = 0; i < oldFormContent.length; i++) {
        oldFormContent[i].style.visbility = 'invisible';
    }

    // APPENDS FORM INPUTS FOR BANNER and COUNTDOWN
    let html = `
    <div class="d-flex justify-content-between include-component">
        <h3>Countdown Banner</h3>
        <div>
            <label for="include-countdown">Include Component?</label>
            <input type="checkbox" id="include-countdown" onclick="save(this)">
        </div>
    </div>
    <div class="banner-form-group">
        <div class="form-group">
            <label for="countdownParentElement">Parent Element</label>
            <input type="text" class="form-control banner-input" id="countdownParentElement" onkeyup="saveValue(this)" placeholder="Hero Parent Element">
        </div>

        <div class="form-group">
            <label for="countdownStart">Countdown Start Time:</label>
            <input type="text" class="form-control banner-input" id="countdownStart" placeholder="Countdown Start Time" onkeyup="saveValue(this)">
        </div>

        <div class="form-group">
            <label for="countdownEnd">Countdown End Time:</label>
            <input type="text" class="form-control banner-input" id="countdownEnd" placeholder="Countdown End Time" onkeyup="saveValue(this)">
        </div>

        <div class="form-group">
            <label for="bannerOffer">Offer:</label>
            <input type="text" class="form-control banner-input" id="bannerOffer" onkeyup="saveValue(this)" placeholder="Offer">
        </div>
        
        <div class="form-group">
                <label for="bannerText">Banner Text:</label>
                <input type="text" class="form-control banner-input" id="bannerText" onkeyup="saveValue(this)" placeholder="Offer Text">
        </div>
        
        <div class="form-group">
                <label for="bannerSubText">Banner Sub Text:</label>
                <input type="text" class="form-control banner-input" id="bannerSubText" onkeyup="saveValue(this)" placeholder="Banner Sub Text">
        </div>

        <div class="form-group">
            <label for="bannerTimerText">Banner Timer Text:</label>
            <input type="text" class="form-control banner-input" id="bannerTimerText" onkeyup="saveValue(this)" placeholder="Banner Timer Text">
        </div>

        <div class="form-group">
            <label for="bannerMarket">Banner Market:</label>
            <input type="text" class="form-control banner-input" id="bannerMarket" onkeyup="saveValue(this)" placeholder="Countdown Market">
        </div>
    </div>
    `;
    
    form.innerHTML = html
    let newFormContent = document.querySelectorAll('.banner-input');

    for (let i = 0; i < newFormContent.length; i++) {
        newFormContent[i].value = getSavedValue(newFormContent[i].id);
    }

    if(localStorage.getItem('include-countdown') === "true") {
        document.querySelector('#include-countdown').checked = true;
    } else {
        document.querySelector('#include-countdown').checked = false;
    }
});


heroButton.addEventListener('click', ()=> {
    let oldFormContent = document.querySelectorAll('.form-group')
    let form = document.querySelector('.promo-inputs')
    
    // HIDES FORM INPUTS FROM OTHER COMPONENTS
    for(let i = 0; i < oldFormContent.length; i++) {
        oldFormContent[i].setAttribute("type", "hidden");
    }

    // APPENDS FORM INPUTS FOR HERO
    let html = `
    <div class="d-flex justify-content-between include-component">
        <h3>Hero Banner</h3>
        <div>
            <label for="include-heroBanner">Include Component?</label>
            <input type="checkbox" id="include-heroBanner" onclick="save(this)">
        </div>
    </div>
        <div class="form-group">
            <label for="heroParentElement">Parent Element</label>
            <input type="text" class="form-control hero-input" id="heroParentElement" onkeyup="saveValue(this)" placeholder="hero-parent-element">
        </div>

        <div class="form-group">
            <label for="heroTextTop">Hero Text: Top</label>
            <input type="text" class="form-control hero-input" id="heroTextTop" onkeyup="saveValue(this)" placeholder="Hero Text Top">
        </div>

        <div class="form-group">
            <label for="heroTextBottom">Hero Text: Bottom</label>
            <input type="text" class="form-control hero-input" id="heroTextBottom" onkeyup="saveValue(this)" placeholder="Hero Text Bottom">
        </div>

        <div class="form-group">
            <label for="heroTextLocation">Hero Text: Location (Left, Right, Center)</label>
            <input type="text" class="form-control hero-input" id="heroTextLocation" onkeyup="saveValue(this)" placeholder="Hero Text Location">
        </div>
        
        <div class="form-group">
                <label for="heroImageDesktop">Desktop Hero Image ID.jpg</label>
                <input type="text" class="form-control hero-input" id="heroImageDesktop" onkeyup="saveValue(this)" placeholder="Hero Image ID">
        </div>
        
        <div class="form-group">
                <label for="heroImageMobile">Mobile Hero Image ID.jpg</label>
                <input type="text" class="form-control hero-input" id="heroImageMobile" onkeyup="saveValue(this)" placeholder="Hero Image ID">
        </div>
    `;
    form.innerHTML = html

    let newFormContent = document.querySelectorAll('.hero-input');

    for (let i = 0; i < newFormContent.length; i++) {
        newFormContent[i].value = getSavedValue(newFormContent[i].id);
    }

    if(localStorage.getItem('include-heroBanner') === "true") {
        document.querySelector('#include-heroBanner').checked = true;
    } else {
        document.querySelector('#include-heroBanner').checked = false;
    }
});


function save(e) {
    let checkbox = document.querySelector(`#${e.id}`).checked
    localStorage.setItem(e.id, checkbox)
}

// SAVES VALUES TYPED INTO INPUTS
function saveValue(e) {
    let id = e.id;
    let val = e.value;
    localStorage.setItem(id, val)
}

// GATHERS INPUT VALUES FROM LOCALSTORAGE
function getSavedValue(v) {
    if(!localStorage.getItem(v)) {
        return "";
    }
    return localStorage.getItem(v);
}

// COPY CODE SNIPPET w BUTTON 
function copyText() {
    const snippetText = document.querySelector('.invoke-init-text').innerText;
    const textArea = document.createElement('textarea');
    textArea.textContent= snippetText;
    document.body.append(textArea);
    textArea.select()
    document.execCommand("copy");
    textArea.remove()
} 