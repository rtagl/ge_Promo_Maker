const submitButton = document.querySelector('.promo-submit');
const heroButton = document.querySelector('.hero-banner-button');
const bannerButton = document.querySelector('.banner-button');
const pillsButton = document.querySelector('.pills-button');
const componentMenuButton = document.querySelectorAll('.component-menu-btn');

submitButton.addEventListener('click', (e)=>{
    e.preventDefault();

    const snippetBox = document.querySelector('pre code');
    snippetBox.style.backgroundColor = "#eee";
    snippetBox.style.border = "1px solid #999";

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
        '${localStorage.getItem('checkedRadio')},
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
        '${dateFormat(localStorage.getItem('countdownStart'))}', 
        '${dateFormat(localStorage.getItem('countdownEnd'))}', 
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

// POPULATES COUNTDOWN BANNER FORM UPON CLICKING COUNTDOWN BANNER BUTTON
bannerButton.addEventListener('click', ()=> {
    let form = document.querySelector('.promo-inputs');
    let oldFormContent = document.querySelectorAll('.form-group');

    // HIDES FORM INPUTS FROM OTHER COMPONENTS
    for(let i = 0; i < oldFormContent.length; i++) {
        oldFormContent[i].style.display = 'none';
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
            <input type="text" class="form-control banner-input" id="countdownParentElement" onkeyup="saveValue(this)" placeholder="hero-parent-element">
        </div>

        <div class="form-group">
            <label for="countdownStart">Countdown Start Time:</label>
            <input type="datetime-local" class="form-control banner-input" id="countdownStart" placeholder="Countdown Start Time" onkeyup="saveValue(this)">
        </div>

        <div class="form-group">
            <label for="countdownEnd">Countdown End Time:</label>
            <input type="datetime-local" class="form-control banner-input" id="countdownEnd" placeholder="Countdown End Time" onkeyup="saveValue(this)">
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

// POPULATES HERO BANNER FORM UPON CLICKING HERO BANNER BUTTON
heroButton.addEventListener('click', ()=> {
    let oldFormContent = document.querySelectorAll('.form-group')
    let form = document.querySelector('.promo-inputs')
    
    // HIDES FORM INPUTS FROM OTHER COMPONENTS
    for(let i = 0; i < oldFormContent.length; i++) {
        oldFormContent[i].style.display = "none";
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
            <label for="heroTextLocation">Hero Text Location</label>

            <div class="d-flex justify-content-between hero-text-radio-btn">

                <label for="heroTextLocationLeft">
                    <input type="radio" class="form-control hero-input" id="Left" name="textLocation" onclick="saveRadio(this)"> Left
                </label>

                <label for="heroTextLocationCenter">
                    <input type="radio" class="form-control hero-input" id="Center" name="textLocation" onclick="saveRadio(this)"> Center
                </label>

                <label for="heroTextLocationRight">
                    <input type="radio" class="form-control hero-input" id="Right" name="textLocation" onclick="saveRadio(this)"> Right
                </label>

            </div>
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
    }  else {
        document.querySelector('#include-heroBanner').checked = false;
    }

    if(localStorage.getItem('checkedRadio') === "Center") {
        document.querySelector('#Center').checked = true;
    } else {
        document.querySelector('#Center').checked = false;
    }

    if(localStorage.getItem('checkedRadio') === "Left") {
        document.querySelector('#Left').checked = true;
    } else {
        document.querySelector('#Left').checked = false;
    }

    if(localStorage.getItem('checkedRadio') === "Right") {
        document.querySelector('#Right').checked = true;

    } else {
        document.querySelector('#Right').checked = false;
    }

});

// POPULATES PILLS FORM UPON CLICKING HERO BANNER BUTTON
pillsButton.addEventListener('click', () => {
    let oldFormContent = document.querySelectorAll('.form-group');
    let form = document.querySelector('.promo-inputs');
    
    // HIDES FORM INPUTS FROM OTHER COMPONENTS
    for(let i = 0; i < oldFormContent.length; i++) {
        oldFormContent[i].style.display = "none";
    }
    // APPENDS FORM INPUTS FOR BANNER and COUNTDOWN
    let html = `
    <div class="d-flex justify-content-between include-component">
        <h3>Pills</h3>
        <div>
            <label for="include-pills">Include Component?</label>
            <input type="checkbox" id="include-pills" onclick="save(this)">
        </div>
    </div>
    <div class="pills-form-group">
        <div class="form-group">
            <label for="pillColor">Pill Color:</label>
            <input type="text" class="form-control pill-input" id="pillColor" onkeyup="saveValue(this)" placeholder="Pill Color">
        </div>

        <div class="form-group">
            <label for="pillText">Pill Text:</label>
            <input type="text" class="form-control pill-input" id="pillText" placeholder="Pill Text" onkeyup="saveValue(this)">
        </div>

        <div class="form-group">
            <label for="pillClass">Pill Class:</label>
            <input type="text" class="form-control pill-input" id="pillCLass" placeholder="Pill Class" onkeyup="saveValue(this)">
        </div>

        <div class="form-group">
            <label for="shipCodes">Ship Codes:</label>
            <input type="text" class="form-control pill-input" id="shipCodes" onkeyup="saveValue(this)" placeholder="Ships IDs">
        </div>

        <hr>
        
        <div class="form-group">
            <h3>Promo Dates</h3>
            <div class="d-flex justify-content-between">
                <div class="dates-input">
                    <label for="pillPromoStartDates">Start Date:</label>
                    <input type="date" class="form-control pill-input" id="pillPromoStartDates" onkeyup="saveValue(this)" placeholder="Pill Promo Start Date">
                </div>
                <div class="dates-input">
                    <label for="pillPromoEndDates">End Date:</label>
                    <input type="date" class="form-control pill-input" id="pillPromoEndDates" onkeyup="saveValue(this)" placeholder="Pill Promo End Date">
                </div>
            </div>
            <div class="insert-pill-promo-dates">
            
            </div>

            <button class="btn add-promo-dates btn-success">+ Add Promo Dates +</button>
        </div>

        <hr>

        <div class="form-group">
            <h3>Eligible Sailing Ranges</h3>
            <div class="d-flex justify-content-between">
                <div class="dates-input">
                    <label for="sailingStartDate">Start Date:</label>
                    <input type="date" class="form-control pill-input" id="sailingStartDate" onkeyup="saveValue(this)" placeholder="Start Date">
                </div>
                <div class="dates-input">
                    <label for="sailingEndDate">End Date:</label>
                    <input type="date" class="form-control pill-input" id="sailingEndDate" onkeyup="saveValue(this)" placeholder="End Date">
                </div>
            </div>
            <div class="insert-pill-sailing-dates">

            </div>
            <button class="btn add-sailing-dates btn-success">+ Add Sailing Dates +</button>
        </div>

        <hr>

        <div class="form-group">
            <label for="bannerTimerText">Banner Timer Text:</label>
            <input type="text" class="form-control pill-input" id="bannerTimerText" onkeyup="saveValue(this)" placeholder="Banner Timer Text">
        </div>

        <div class="form-group">
            <label for="bannerMarket">Banner Market:</label>
            <input type="text" class="form-control pill-input" id="bannerMarket" onkeyup="saveValue(this)" placeholder="Countdown Market">
        </div>
    </div>
    `;

    form.innerHTML = html
    const newFormContent = document.querySelectorAll('.pill-input');
    const addPromoDatesBtn = document.querySelector('.add-promo-dates')
    const addSailingDatesBtn = document.querySelector('.add-sailing-dates')
    let promoClickCount = 1
    let sailingClickCount = 1

    for (let i = 0; i < newFormContent.length; i++) {
        newFormContent[i].value = getSavedValue(newFormContent[i].id);
    }

    addPromoDatesBtn.addEventListener('click', (e) => {
        e.preventDefault()
        promoClickCount += 1;
        let insertMorePromoDates = document.querySelector('.insert-pill-promo-dates')

        let promoDateInputs = `
        <div class="d-flex justify-content-between added-inputs">
            <div class="dates-input">
                <label for="pillPromoStartDates${promoClickCount}">Start Date:</label>
                <input type="date" class="form-control added-promo-date" id="pillPromoStartDates${promoClickCount}" onkeyup="saveValue(this)">
            </div>
            <div class="dates-input">
                <label for="pillPromoEndDates${promoClickCount}">End Date:</label>
                <input type="date" class="form-control added-promo-date" id="pillPromoEndDates${promoClickCount}" onkeyup="saveValue(this)">
            </div>
        </div>
        `;
        insertMorePromoDates.innerHTML += promoDateInputs;

        let addedPromoDates = document.querySelectorAll('.added-promo-date');

        for(let i = 0; i < addedPromoDates.length; i++) {
            addedPromoDates[i].value = getSavedValue(addedPromoDates[i].id);
        }

    });

    addSailingDatesBtn.addEventListener('click', (e) => {
        e.preventDefault()
        sailingClickCount += 1;
        let insertMoreSailingDates = document.querySelector('.insert-pill-sailing-dates')

        let sailingDateInputs = `
        <div class="d-flex justify-content-between added-inputs">
            <div class="dates-input">
                <label for="sailingStartDate${sailingClickCount}">Start Date:</label>
                <input type="date" class="form-control added-sailing-date" id="sailingStartDate${sailingClickCount}" onkeyup="saveValue(this)">
            </div>
            <div class="dates-input">
                <label for="sailingEndDate${sailingClickCount}">End Date:</label>
                <input type="date" class="form-control added-sailing-date" id="sailingEndDate${sailingClickCount}" onkeyup="saveValue(this)">
            </div>
        </div>
        `;

        insertMoreSailingDates.innerHTML += sailingDateInputs;

        const addedSailingDates = document.querySelectorAll('.added-sailing-date');
        
        for (let i = 0; i < addedSailingDates.length; i++) {
            addedSailingDates[i].value = getSavedValue(addedSailingDates[i].id);
        }

    })
    
})

componentMenuButton.forEach(item => {
    item.addEventListener('click', () => {
        submitButton.style.display = "block";
    })
})

// SAVE COMPONENT CHECKBOX
function save(e) {
    let checkbox = document.querySelector(`#${e.id}`).checked
    localStorage.setItem(e.id, checkbox)
}

//SAVE HERO BANNER TEXT LOCATION RADIO BUTTON
function saveRadio(e) {
    localStorage.setItem('checkedRadio', e.id)
}
 
// SAVES USER TEXT INPUTS
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

function dateFormat(date) {
    let inputDate = date
    let year, month, day, time;

    let arr1 = inputDate.split('-');
    year = arr1[0];
    month = arr1[1];

    let arr2 = arr1[2].split('T');
    day = arr2[0];
    time = arr2[1];

    let monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    return `${monthsArr[month-1]} ${day} ${year} ${time + ':00'}`
}


