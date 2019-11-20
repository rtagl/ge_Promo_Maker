const submitButton = document.querySelector('.promo-submit');
const heroButton = document.querySelector('.hero-banner-button');
const bannerButton = document.querySelector('.banner-button');
const pillsButton = document.querySelector('.pills-button');
const bookingButton = document.querySelector('.booking-button');
const componentMenuButton = document.querySelectorAll('.component-menu-btn');

// Variable State
let data = {
    heroComponent: {

    },
    bannerComponent: {

    },
    pillsComponent: {
        pillDetails: {

        },
        pillCriteria: {
        
        },
        pillExclusions: {

        }
    },
    bookingComponent: {


    }
};

loadEventListeners();

// Loads All Event Listeners
function loadEventListeners() {
    submitButton.addEventListener('click', submitPromoFields);
    heroButton.addEventListener('click', showHeroFields);
    bannerButton.addEventListener('click', showBannerFields);
    pillsButton.addEventListener('click', showPillFields);
    bookingButton.addEventListener('click', showBookingFields);
}

// Creates Copy Button and Code Snippet Text
function submitPromoFields(e) {
    e.preventDefault();
    // Create Copy Text Button upon submit
    const copyTextButton = document.createElement('button')
    copyTextButton.classList.add('btn', 'btn-primary', 'copy-text')
    copyTextButton.innerText = 'Copy Code Snippet'
    copyTextButton.setAttribute("onclick", "copyText()")
    copyTextButton.setAttribute("type", "submit") 

    if (document.querySelector('#append-button').childElementCount === 0) {
        document.querySelector('#append-button').append(copyTextButton)
    };

    generateCodeSnippet();
};

// POPULATES COUNTDOWN BANNER FORM UPON CLICKING COUNTDOWN BANNER BUTTON
function showBannerFields(e) {
    let form = document.querySelector('.promo-inputs');
    let oldFormContent = document.querySelectorAll('.form-group');

    // HIDES FORM INPUTS FROM OTHER COMPONENTS
    for(let i = 0; i < oldFormContent.length; i++) {
        oldFormContent[i].style.display = 'none';
    }

    // APPENDS FORM INPUTS FOR BANNER and COUNTDOWN
    let html = `${bannerFieldsHTML()}`;
    
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
};

// POPULATES HERO BANNER FORM UPON CLICKING HERO BANNER BUTTON
function showHeroFields(e) {
    let oldFormContent = document.querySelectorAll('.form-group')
    let form = document.querySelector('.promo-inputs')
    
    // HIDES FORM INPUTS FROM OTHER COMPONENTS
    for(let i = 0; i < oldFormContent.length; i++) {
        oldFormContent[i].style.display = "none";
    }

    // APPENDS FORM INPUTS FOR HERO
    let html = `${heroFieldsHTML()}`

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

    // Load Hero Text Location value from Local Storage
    heroTextLocationRadioValue(); 
};



// POPULATES PILLS FORM UPON CLICKING HERO BANNER BUTTON
function showPillFields(e) {
    const oldFormContent = document.querySelectorAll('.form-group');
    const form = document.querySelector('.promo-inputs');

    let promoClickCount = 1
    let sailingClickCount = 1
    let exSailingClickCount = 1
    
    // HIDES FORM INPUTS FROM OTHER COMPONENTS
    for(let i = 0; i < oldFormContent.length; i++) {
        oldFormContent[i].style.display = "none";
    }

    // APPENDS FORM INPUTS FOR BANNER and COUNTDOWN
    let html = `${pillFieldsHTML()}`;

    form.innerHTML = html

    const newFormContent = document.querySelectorAll('.pill-input');
    const addPromoDatesBtn = document.querySelector('.add-promo-dates');
    const addSailingDatesBtn = document.querySelector('.add-sailing-dates');
    const addExSailingDatesBtn = document.querySelector('.add-exSailing-dates');

    for (let i = 0; i < newFormContent.length; i++) {
        newFormContent[i].value = getSavedValue(newFormContent[i].id);
    }

    // CHECK TO INCLUDE PILLS
    if(localStorage.getItem('include-pills') === "true") {
        document.querySelector('#include-pills').checked = true;
    }  else {
        document.querySelector('#include-pills').checked = false;
    }

    addPromoDatesBtn.addEventListener('click', (e) => {
        e.preventDefault()
        promoClickCount += 1;
        let insertMorePromoDates = document.querySelector('.insert-pill-promo-dates')

        let promoDateInputs = `
        <div class="d-flex justify-content-between added-inputs">
            <div class="dates-input">
                <label for="pillPromoStartDates${promoClickCount}">Start Date:</label>
                <input type="date" class="form-control promo-dates added-promo-date pill-input pill-criteria" id="pillPromoStartDates${promoClickCount}" onchange="saveValue(this)">
            </div>
            <div class="dates-input">
                <label for="pillPromoEndDates${promoClickCount}">End Date:</label>
                <input type="date" class="form-control promo-dates added-promo-date pill-input pill-criteria" id="pillPromoEndDates${promoClickCount}" onchange="saveValue(this)">
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
                <input type="date" class="form-control added-sailing-date pill-input pill-criteria" id="sailingStartDate${sailingClickCount}" onkeyup="saveValue(this)">
            </div>
            <div class="dates-input">
                <label for="sailingEndDate${sailingClickCount}">End Date:</label>
                <input type="date" class="form-control added-sailing-date pill-input pill-criteria" id="sailingEndDate${sailingClickCount}" onkeyup="saveValue(this)">
            </div>
        </div>
        `;

        insertMoreSailingDates.innerHTML += sailingDateInputs;

        const addedSailingDates = document.querySelectorAll('.added-sailing-date');
        
        for (let i = 0; i < addedSailingDates.length; i++) {
            addedSailingDates[i].value = getSavedValue(addedSailingDates[i].id);
        }

    })

    addExSailingDatesBtn.addEventListener('click', (e) => {
        e.preventDefault()
        exSailingClickCount += 1;
        let insertMoreExSailingDates = document.querySelector('.insert-pill-exSailing-dates')

        let exSailingDateInputs = `
        <div class="d-flex justify-content-between added-inputs">
            <div class="dates-input">
                <label for="exSailingStartDate${exSailingClickCount}">Start Date:</label>
                <input type="date" class="form-control added-exSailing-date pill-input pill-exclusion" id="exSailingStartDate${exSailingClickCount}" onkeyup="saveValue(this)">
            </div>
            <div class="dates-input">
                <label for="sailingEndDate${exSailingClickCount}">End Date:</label>
                <input type="date" class="form-control added-exSailing-date pill-input pill-exclusion" id="exSailingEndDate${exSailingClickCount}" onkeyup="saveValue(this)">
            </div>
        </div>
        `;

        insertMoreExSailingDates.innerHTML += exSailingDateInputs;

        const addedExSailingDates = document.querySelectorAll('.added-exSailing-date');
        
        for (let i = 0; i < addedExSailingDates.length; i++) {
            addedExSailingDates[i].value = getSavedValue(addedExSailingDates[i].id);
        }

    })
    
};

function showBookingFields(e) {
    const oldFormContent = document.querySelectorAll('.form-group');
    const form = document.querySelector('.promo-inputs');
    
    // HIDES FORM INPUTS FROM OTHER COMPONENTS
    for(let i = 0; i < oldFormContent.length; i++) {
        oldFormContent[i].style.display = "none";
    }

    let html = `${bookingFieldsHTML()}`;

    form.innerHTML = html;

    let newFormContent = document.querySelectorAll('.booking-popup-input');

    for (let i = 0; i < newFormContent.length; i++) {
        newFormContent[i].value = getSavedValue(newFormContent[i].id);
    }

    // CHECK TO INCLUDE Exit Popup
    if(localStorage.getItem('include-bookingPopup') === "true") {
        document.querySelector('#include-bookingPopup').checked = true;
    }  else {
        document.querySelector('#include-bookingPopup').checked = false;
    }
};


componentMenuButton.forEach(item => {
    item.addEventListener('click', () => {
        submitButton.style.display = "block";
    })
})

// SAVES CHECKBOX TO INCLUDE COMPONENT
function saveCheckbox(e) {
    let checkbox = document.querySelector(`#${e.id}`).checked
    localStorage.setItem(e.id, checkbox)
}

//SAVE HERO BANNER TEXT LOCATION RADIO BUTTON
function saveRadio(e) {
    localStorage.setItem('checkedRadio', e.id)
}

// SAVES USER TEXT INPUTS INTO DATA OBJECT
function saveValue(e) {
    let id = e.id;
    let val = e.value;

    if (e.classList.contains('hero-input')) {
        data.heroComponent[id] = val;
    } else if (e.classList.contains('banner-input')) {
        data.bannerComponent[id] = val;
    } else if (e.classList.contains('pill-input')) {

        if (e.classList.contains('pill-criteria')) {
            data.pillsComponent.pillCriteria[id] = val
        } else if (e.classList.contains('pill-exclusions')) {
            data.pillsComponent.pillExclusions[id] = val
        } else if (e.classList.contains('pill-details')) {
            data.pillsComponent.pillDetails[id] = val
        }
    } 

    console.log(data)
    //localStorage.setItem(id, val)
}

// GATHERS INPUT VALUES FROM LOCALSTORAGE
function getSavedValue(v) {
    let inputId = v;

    if (data.heroComponent[inputId] !== undefined) {
        return data.heroComponent[inputId];
    } else if (data.bannerComponent[inputId] !== undefined) {
        return data.bannerComponent[inputId];
    } else if (data.pillsComponent.pillCriteria[inputId] !== undefined) {
        return data.pillsComponent.pillCriteria[inputId];
    } else if (data.pillsComponent.pillExclusions[inputId] !== undefined) {
        return data.pillsComponent.pillExclusions[inputId];
    } else {
        return ''
    }
    
    // if(!localStorage.getItem(v)) {
    //     return "";
    // }
    // return localStorage.getItem(v);
}

// COPY CODE SNIPPET TEXT WHEN COPY BUTTON IS CLICKED 
function copyText() {
    const snippetText = document.querySelector('.invoke-init-text').innerText;
    const textArea = document.createElement('textarea');
    textArea.textContent= snippetText;
    document.body.append(textArea);
    textArea.select()
    document.execCommand("copy");
    textArea.remove()
} 

// Parses date into 'Month Day Year HH:MM:SS' Format 
function getDateAndTime(date) {
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

// Parses date into Month Day Year Format
function getDate(date) {
    let inputDate = date;
    let month, day, year;

    let arr1 = inputDate.split('-');
    year = arr1[0];
    month = arr1[1];
    day = arr1[2]

    console.log(month, day, year);
    let monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return `'${monthsArr[month - 1]} ${day} ${year}'`
};


function getPillCriteria() {
    let criteriaCodeSnippet = ''

    if (data.pillsComponent.pillCriteria.shipCodes) {
        criteriaCodeSnippet += `shipCodes: [${data.pillsComponent.pillCriteria.shipCodes.split(/[ ,]+/)}],`
    }
    for (var key in data.pillsComponent.pillCriteria) {
        if (key.indexOf('pillPromoStartDate') != -1) {
            criteriaCodeSnippet += `
            promoDates: [
                {
                    startDate: ${getDate(data.pillsComponent.pillCriteria[key])},`
        }
        if (key.indexOf('pillPromoEndDate') != -1) {
            criteriaCodeSnippet += `
                    endDate: ${getDate(data.pillsComponent.pillCriteria[key])}
                }
            ],`
        }
    }
    for (var key in data.pillsComponent.pillCriteria) {
        if (key.indexOf('sailingStartDate') != -1) {
            criteriaCodeSnippet += `
            sailingDates: [
                {
                    startDate: ${getDate(data.pillsComponent.pillCriteria[key])},`
            
        }
        if (key.indexOf('sailingEndDate') != -1) {
            criteriaCodeSnippet += `
                    endDate: ${getDate(data.pillsComponent.pillCriteria[key])}
                }
            ],`
        }
    }
    if (data.pillsComponent.pillCriteria.maxNights && data.pillsComponent.pillCriteria.minNights) {
        criteriaCodeSnippet += `
            numberOfNights: [${data.pillsComponent.pillCriteria.minNights}, ${data.pillsComponent.pillCriteria.maxNights}],
        ` 
    }
    if (data.pillsComponent.pillCriteria.departurePorts) {
        criteriaCodeSnippet += `
            departurePorts: [${data.pillsComponent.pillCriteria.departurePorts}],
        `
    }
    if (data.pillsComponent.pillCriteria.destinationPorts) {
        criteriaCodeSnippet += `
            departurePorts: [${data.pillsComponent.pillCriteria.destinationPorts}],
        `
    }
         
    return criteriaCodeSnippet
}

function getPillExclusions() {
    let criteriaCodeSnippet = ''

    if (data.pillsComponent.pillExclusions.exShipCodes) {
        criteriaCodeSnippet += `shipCodes: [${data.pillsComponent.pillExclusions.exShipCodes.split(/[ ,]+/)}],`
    }

    for (var key in data.pillsComponent.pillExclusions) {
        if (key.indexOf('exSailingStartDate') != -1) {
            criteriaCodeSnippet += `
            sailingDates: [
                {
                    startDate: ${getDate(data.pillsComponent.pillExclusions[key])},`
            
        }
        if (key.indexOf('exSailingEndDate') != -1) {
            criteriaCodeSnippet += `
                    endDate: ${getDate(data.pillsComponent.pillExclusions[key])}
                }
            ],`
        }
    }
    if (data.pillsComponent.pillExclusions.exMaxNights && data.pillsComponent.pillExclusions.exMinNights) {
        criteriaCodeSnippet += `
            numberOfNights: [${data.pillsComponent.pillExclusions.exMinNights}, ${data.pillsComponent.pillExclusions.exMaxNights}],
        ` 
    }
    if (data.pillsComponent.pillExclusions.exDeparturePorts) {
        criteriaCodeSnippet += `
            departurePorts: [${data.pillsComponent.pillExclusions.exDeparturePorts}],
        `
    }
    if (data.pillsComponent.pillExclusions.exDestinationPorts) {
        criteriaCodeSnippet += `
            departurePorts: [${data.pillsComponent.pillExclusions.exDestinationPorts}],
        `
    }
         
    return criteriaCodeSnippet
}

// Fetches hero Text Location from Local Storage
function heroTextLocationRadioValue() {
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
};

// GENERATES HTML FOR BANNER FORM FIELDS
function bannerFieldsHTML() {
    return `
    <div class="d-flex justify-content-between include-component">
        <h3>Countdown Banner</h3>
        <div>
            <label for="include-countdown">Include Component?</label>
            <input type="checkbox" id="include-countdown" onclick="saveCheckbox(this)">
        </div>
    </div>
    <div class="banner-form-group">
        <div class="form-group">
            <label for="countdownParentElement">Parent Element</label>
            <input type="text" class="form-control banner-input" id="countdownParentElement" onkeyup="saveValue(this)" placeholder="hero-parent-element">
        </div>

        <div class="d-flex justify-content-between">
            <div class="form-group">
                <label for="countdownStart">Countdown Start Time:</label>
                <input type="datetime-local" class="form-control banner-input" id="countdownStart" placeholder="Countdown Start Time" onchange="saveValue(this)">
            </div>

            <div class="form-group">
                <label for="countdownEnd">Countdown End Time:</label>
                <input type="datetime-local" class="form-control banner-input" id="countdownEnd" placeholder="Countdown End Time" onchange="saveValue(this)">
            </div>
        </div>

        <div class="form-group">
            <label for="bannerOffer">ADÉMAS:</label>
            <input type="text" class="form-control banner-input" id="bannerOffer" onkeyup="saveValue(this)" placeholder="ADÉMAS: ">
        </div>
        
        <div class="form-group">
                <label for="bannerText">Banner Text:</label>
                <input type="text" class="form-control banner-input" id="bannerText" onkeyup="saveValue(this)" placeholder="Offer Text">
        </div>
        
        <div class="form-group">Offer SubText:</label>
                <input type="text" class="form-control banner-input" id="bannerSubText" onkeyup="saveValue(this)" placeholder="Offer SubText">
        </div>

        <div class="form-group">
            <label for="bannerTimerText">Banner Timer Text:</label>
            <input type="text" class="form-control banner-input" id="bannerTimerText" onkeyup="saveValue(this)" placeholder="Oferta Termina En:">
        </div>

        <div class="form-group">
            <label for="bannerMarket">Banner Market:</label>
            <input type="text" class="form-control banner-input" id="bannerMarket" onkeyup="saveValue(this)" placeholder="Countdown Market. e.g lac, ita">
        </div>

        <div class="form-group">
            <label for="lastInMarketLanguage">"Last" in market Language</label>
            <input type="text" class="form-control banner-input" id="lastInMarketLanguage" onkeyup="saveValue(this)" placeholder="ÚLTIMOS">
        </div>

        <div class="form-group">
            <label for="daysInMarketLanguage">Banner Market:</label>
            <input type="text" class="form-control banner-input" id="daysInMarketLanguage" onkeyup="saveValue(this)" placeholder="DIAS">
        </div>

        <div class="form-group">
            <label for="dst">Is it Day Lights Savings?</label>
            <input type="text" class="form-control banner-input" id="dst" onkeyup="saveValue(this)" placeholder="True or False?">
        </div>
    </div>
    `
}

// GENERATES HTML FOR HERO FORM FIELDS
function heroFieldsHTML() {
    return `
    <div class="d-flex justify-content-between include-component">
        <h3>Hero Banner</h3>
        <div>
            <label for="include-heroBanner">Include Component?</label>
            <input type="checkbox" id="include-heroBanner" onclick="saveCheckbox(this)">
        </div>
    </div>
    <div class="form-group">
        <label for="heroParentElement">Parent Element</label>
        <input type="text" class="form-control hero-input" id="heroParentElement" onkeyup="saveValue(this)" placeholder="hero-image-container" value="hero-image-container">
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
    `
}

// GENERATES HTML FOR PILL FORM FIELDS
function pillFieldsHTML() {
    return `
    <div class="d-flex justify-content-between include-component">
        <h3>Pills</h3>
        <div>
            <label for="include-pills">Include Component?</label>
            <input type="checkbox" id="include-pills" onclick="saveCheckbox(this)">
        </div>
    </div>
    <div class="pills-form-group">
    <div class="form-group">
        <label for="pillColor">Pill Color:</label>
        <input type="text" class="form-control pill-input pill-details" id="pillColor" onkeyup="saveValue(this)" placeholder="Pill Color">
    </div>

    <div class="form-group">
        <label for="pillText">Pill Text:</label>
        <input type="text" class="form-control pill-input pill-details" id="pillText" placeholder="Pill Text" onkeyup="saveValue(this)">
    </div>

    <div class="form-group">
        <label for="pillClass">Pill Class:</label>
        <input type="text" class="form-control pill-input pill-details" id="pillClass" placeholder="Pill Class" onkeyup="saveValue(this)">
    </div>

    <div class="form-group">
        <label for="shipCodes">Ship Codes:</label>
        <input type="text" class="form-control pill-input pill-criteria" id="shipCodes" pattern="[A-Z]{2}" title="TWO letter Ship code" onkeyup="saveValue(this)" placeholder="Ships IDs">
    </div>

    <hr>
    
    <div class="form-group">
        <h3>Promo Dates</h3>
        <div class="d-flex justify-content-between">
            <div class="dates-input">
                <label for="pillPromoStartDates">Start Date: </label>
                <input type="date" class="form-control promo-dates pill-input pill-criteria" id="pillPromoStartDates" onchange="saveValue(this)" placeholder="Pill Promo Start Date">
            </div>
            <div class="dates-input">
                <label for="pillPromoEndDates">End Date: </label>
                <input type="date" class="form-control promo-dates pill-input pill-criteria" id="pillPromoEndDates" onchange="saveValue(this)" placeholder="Pill Promo End Date">
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
                <input type="date" class="form-control pill-input pill-criteria" id="sailingStartDate" onkeyup="saveValue(this)" placeholder="Start Date">
            </div>
            <div class="dates-input">
                <label for="sailingEndDate">End Date:</label>
                <input type="date" class="form-control pill-input pill-criteria" id="sailingEndDate" onkeyup="saveValue(this)" placeholder="End Date">
            </div>
        </div>
        <div class="insert-pill-sailing-dates">

        </div>
        <button class="btn add-sailing-dates btn-success">+ Add Sailing Dates +</button>
    </div>

    <hr>

    <div class="form-group">
        <h3>Number of Nights</h3>
        <div class="d-flex justify-content-between">
            <div class="nights-input">
                <label for="minNights">Min Nights:</label>
                <input type="Number" class="form-control pill-input pill-criteria" id="minNights" onkeyup="saveValue(this)" placeholder="Minimum Nights">
            </div>
            <div class="nights-input">
                <label for="maxNights">Max Nights:</label>
                <input type="number" class="form-control pill-input pill-criteria" id="maxNights" onkeyup="saveValue(this)" placeholder="Maximum Nights">
            </div>
        </div>
    </div>

    <div class="form-group">
        <label for="departurePorts">Departure Ports: Comma Separated</label>
        <input type="text" class="form-control pill-input pill-criteria" id="departurePorts" onkeyup="saveValue(this)" placeholder="Departure Ports">
    </div>

    <div class="form-group">
        <label for="destinationPorts">Destination Ports:</label>
        <input type="text" class="form-control pill-input pill-criteria" id="destinationPorts" onkeyup="saveValue(this)" placeholder="Destination Ports">
    </div>
    
    <hr>

    <h2>EXCLUSIONS</h2>

    <div class="form-group">
        <label for="exShipCodes">Ship Codes:</label>
        <input type="text" class="form-control pill-input pill-exclusions" id="exShipCodes" onkeyup="saveValue(this)" placeholder="Exclude Ships IDs">
    </div>

    <div class="form-group">
        <h3>Number of Nights</h3>
            <div class="d-flex justify-content-between">
            <div class="nights-input">
                <label for="exMinNights">Min Nights:</label>
                <input type="Number" class="form-control pill-input pill-exclusions" id="exMinNights" onkeyup="saveValue(this)" placeholder="Minimum Nights">
            </div>
            <div class="nights-input">
                <label for="exMaxNights">Max Nights:</label>
                <input type="number" class="form-control pill-input pill-exclusions" id=exMaxNights" onkeyup="saveValue(this)" placeholder="Maximum Nights">
            </div>
        </div>
    </div>

    <div class="form-group">
        <label for="exDeparturePorts">Exclude Departure Ports:</label>
        <input type="text" class="form-control pill-input pill-exclusions" id="exDeparturePorts" onkeyup="saveValue(this)" placeholder="Departure Ports">
    </div>

    <div class="form-group">
        <label for="exDestinationPorts">Excl Destination Ports:</label>
        <input type="text" class="form-control pill-input pill-exclusions" id="exDestinationPorts" onkeyup="saveValue(this)" placeholder="Destination Ports">
    </div>

    <div class="form-group">
        <h3>Excl. Sailing Ranges</h3>
        <div class="d-flex justify-content-between">
            <div class="dates-input">
                <label for="exSailingStartDate">Start Date:</label>
                <input type="date" class="form-control pill-input pill-exclusions" id="exSailingStartDate" onkeyup="saveValue(this)" placeholder="Start Date">
            </div>
            <div class="dates-input">
                <label for="exSailingEndDate">End Date:</label>
                <input type="date" class="form-control pill-input pill-exclusions" id="exSailingEndDate" onkeyup="saveValue(this)" placeholder="End Date">
            </div>
        </div>
        <div class="insert-pill-exSailing-dates">

        </div>
        <button class="btn add-exSailing-dates btn-success">+ Add Sailing Dates Excl.+</button>
    </div>

    <div class="form-group">
        <label for="exPillClass">Excl. Pill Class:</label>
        <input type="text" class="form-control pill-input pill-exclusions" id="exPillCLass" placeholder="Excl. Pill Class" onkeyup="saveValue(this)">
    </div>

    </div>
    `
}

// GENERATES HTML FOR BOOKING FORM FIELDS
function bookingFieldsHTML() {
    return `
    <div class="d-flex justify-content-between include-component">
        <h3>Booking Exit Popup</h3>
        <div>
            <label for="include-bookingPopup">Include Component?</label>
            <input type="checkbox" id="include-bookingPopup" onclick="saveCheckbox(this)">
        </div>
    </div>
    <div class="booking-form-group">
        <div class="form-group">
            <label for="popupBackgroundColor">Exit Popup Background Color</label>
            <input type="text" class="form-control exitbanner-details booking-popup-input" id="popupBackgroundColor" onkeyup="saveValue(this)" placeholder="#ffffff">
        </div>

        <div class="form-group">
            <label for="popupOfferText">Popup Offer Text:</label>
            <input type="text" class="form-control exitbanner-details booking-popup-input" id="popupOfferText" placeholder="Monthly Offer Text" onchange="saveValue(this)">
        </div>

        <div class="form-group">
            <label for="popupOfferSubText">Popup Offer SubText:</label>
            <input type="text" class="form-control exitbanner-details booking-popup-input" id="popupOfferSubText" placeholder="Flash Sale Text (if applicable)" onchange="saveValue(this)">
        </div>

        <div class="form-group">
            <label for="popupTextColor">Offer Text Color:</label>
            <input type="text" class="form-control exitbanner-details booking-popup-input" id="popupTextColor" onkeyup="saveValue(this)" placeholder="#0b214d">
        </div>

        <hr>

        <div class="form-group">
                <label for="continueBtnText">Continue Button Text:</label>
                <input type="text" class="form-control continueBtn booking-popup-input" id="continueBtnText" onkeyup="saveValue(this)" value="continuar">
        </div>
        
        <div class="form-group">
                <label for="continueBtnTextColor">Continue Button Text Color:</label>
                <input type="text" class="form-control continueBtn booking-popup-input" id="continueBtnTextColor" onkeyup="saveValue(this)" value="#000000">
        </div>

        <div class="form-group">
            <label for="continueBtnBackgroundColor">Continue Button Background Color:</label>
            <input type="text" class="form-control continueBtn booking-popup-input" id="continueBtnBackgroundColor" onkeyup="saveValue(this)" value="#febd11">
        </div>

        <hr>

        <div class="form-group">
            <label for="cancelBtnText">Cancel Button Text:</label>
            <input type="text" class="form-control cancelBtn booking-popup-input" id="cancelBtnText" onkeyup="saveValue(this)" value="cancelar">
        </div>

        <div class="form-group">
            <label for="cancelBtnTextColor">Continue Button Text Color:</label>
            <input type="text" class="form-control cancelBtn booking-popup-input" id="cancelBtnTextColor" onkeyup="saveValue(this)" value="#000000">
        </div>

        <div class="form-group">
            <label for="cancelBtnBackgroundColor">Continue Button Text Color:</label>
            <input type="text" class="form-control cancelBtn booking-popup-input" id="cancelBtnBackgroundColor" onkeyup="saveValue(this)" value="#ffffff">
        </div>

        <div class="form-group">
            <label for="cancelBtnBorderColor">Continue Button Text Color:</label>
            <input type="text" class="form-control cancelBtn booking-popup-input" id="cancelBtnBorderColor" onkeyup="saveValue(this)" value="#000000">
        </div>

        <hr>

        <div class="form-group">
            <label for="exitHours">Popup Hours:</label>
            <input type="text" class="form-control exitClock booking-popup-input" id="exitHours" onkeyup="saveValue(this)" value="cancelar">
        </div>

        <div class="form-group">
            <label for="exitMinutes">Popup Minutes:</label>
            <input type="text" class="form-control exitClock booking-popup-input" id="exitMinutes" onkeyup="saveValue(this)" value="#000000">
        </div>

        <div class="form-group">
            <label for="exitSeconds">Popup Seconds:</label>
            <input type="text" class="form-control exitClock booking-popup-input" id="ExitSeconds" onkeyup="saveValue(this)" value="#ffffff">
        </div>

        <div class="form-group">
            <label for="exitHoursLeft">Popup Hours Left:</label>
            <input type="text" class="form-control exitClock booking-popup-input" id="exitHoursLeft" onkeyup="saveValue(this)" value="#000000">
        </div>

        <div class="form-group">
            <label for="exitClockTextColor">Exit Clock Text Color:</label>
            <input type="text" class="form-control exitClock booking-popup-input" id="exitClockTextColor" onkeyup="saveValue(this)" value="#0b214d">
        </div>

        <hr>

        <div class="form-group">
            <label for="exitClockStartTime">Exit Clock Start Time:</label>
            <input type="datetime-local" class="form-control exitClockCountdown booking-popup-input" id="exitClockStartTime" onkeyup="saveValue(this)">
        </div>

        <div class="form-group">
            <label for="exitClockTextColor">Exit Clock End Time:</label>
            <input type="datetime-local" class="form-control exitClockCountdown booking-popup-input" id="exitClockEndTime" onkeyup="saveValue(this)">
        </div>

        <hr>

        <div class="form-group">
            <label for="exitClockCountry">Exit Clock Country Code:</label>
            <input type="text" class="form-control exitClockCountry booking-popup-input" id="exitClockCountry" onkeyup="saveValue(this)" placeholder="lac">
        </div>

    </div>
    `  
} 

// GENERATES CODE SNIPPET BASED ON COMPONENTS INCLUDED AND NON-EMPTY INPUT VALUES
function generateCodeSnippet() {
    const snippetBox = document.querySelector('pre code');
    snippetBox.style.backgroundColor = "#eee";
    snippetBox.style.border = "1px solid #999";
    const codeSnippet = document.querySelector('.invoke-init-text')
    codeSnippet.innerText = "init('hero-parent-element', function() {"

    if (localStorage.getItem('include-heroBanner') == "true") {
        codeSnippet.innerText += `
    heroBanner(
        ${data.heroComponent['heroParentElement'] ? "'." + data.heroComponent['heroParentElement'] + "'" : "'.hero-image-container'"},
        ${data.heroComponent['heroTextTop'] ? "'" + data.heroComponent['heroTextTop'] + "'" : "''"},
        ${data.heroComponent['heroTextBottom'] ? "'" + data.heroComponent['heroTextBottom'] + "'" : "''"},
        ${localStorage.getItem('checkedRadio') ? "'" + localStorage.getItem('checkedRadio') + "'" : "'Center'"},
        [
        ${data.heroComponent['heroImageDesktop'] ? "'http://sb.monetate.net/img/1/388/" + data.heroComponent['heroImageDesktop'] + "'" : "''"},
        ${data.heroComponent['heroImageMobile'] ? "'http://sb.monetate.net/img/1/388/" + data.heroComponent['heroImageMobile'] + "'" : "''"},
        ]
        `;
    }
 
    if (localStorage.getItem('include-countdown') == "true") {
        codeSnippet.innerText += `
    countDown(
        ${data.bannerComponent['countdownParentElement'] ? "'." + data.bannerComponent['countdownParentElement'] + "'" : "'.hero-image-container'"},
        ${data.bannerComponent['countdownStart'] ? "'" + getDateAndTime(data.bannerComponent['countdownStart']) + "'" : "''"}, 
        ${data.bannerComponent['countdownEnd'] ? "'" + getDateAndTime(data.bannerComponent['countdownEnd']) + "'" : "''"}, 
    {
        offer:     ${data.bannerComponent['bannerOffer'] ? "'" + data.bannerComponent['bannerOffer'] + "'" : "''"},
        text:      ${data.bannerComponent['bannerText'] ? "'" + data.bannerComponent['bannerText'] + "'" : "''"},
        subText:   ${data.bannerComponent['bannerSubText'] ? "'" + data.bannerComponent['bannerSubText'] + "'" : "''"},
        timerText: ${data.bannerComponent['bannerTimerText'] ? "'" + data.bannerComponent['bannerTimerText'] + "'" : "''"},
    },
        [${data.bannerComponent['bannerMarket'] ? "'" + data.bannerComponent['bannerMarket'] + "'" : "''"}]
    );`
    }

    if (localStorage.getItem('include-pills') == "true") {
        codeSnippet.innerText += `
    pills({
        pillDetails: {
            color: ${data.pillsComponent['pillColor'] ? "'" + data.pillsComponent['pillColor'] + "'" : "'#0b214d'"},
            text: ${data.pillsComponent['pillText'] ? "'" + data.pillsComponent['pillText'] + "'" : "'Savings For This Itinerary'"},
            class: ${data.pillsComponent['pillClass'] ? "'" + data.pillsComponent['pillClass'] + "'" : "'pill_promo'"}
        },
        pillCriteria: {
            ${getPillCriteria()}
        },
        pillExclusions: {
            ${getPillExclusions()}
        }
    });
    `
    };

    if (localStorage.getItem('include-BookingPopup') == "true") {
        codeSnippet.innerText += `
        
        `
    }
    
    codeSnippet.innerText += `
});`

    if (localStorage.getItem('include-countdown') == "false" && localStorage.getItem('include-heroBanner') == "false" && localStorage.getItem('include-pills') == "false") {
        codeSnippet.innerText = "DON'T FORGET TO INCLUDE COMPONENTS!!"
    }
}