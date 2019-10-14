const submitButton = document.querySelector('.promo-submit');
const heroButton = document.querySelector('.hero-banner-button');
const bannerButton = document.querySelector('.banner-button');
const pillsButton = document.querySelector('.pills-button');
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
    }
};

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
        ${data.heroComponent['heroParentElement'] ? "'." + data.heroComponent['heroParentElement'] + "'" : "''"},
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
        ${data.bannerComponent['countdownParentElement'] ? "'." + data.bannerComponent['countdownParentElement'] + "'" : "''"},
        ${data.bannerComponent['countdownStart'] ? "'" + getDateAndTime(data.bannerComponent['countdownStart']) + "'" : "''"}, 
        ${data.bannerComponent['countdownEnd'] ? "'" + getDateAndTime(data.bannerComponent['countdownEnd']) + "'" : "''"}', 
    {
        offer:     ${data.bannerComponent['bannerOffer'] ? "'" + data.bannerComponent['bannerOffer'] + "'" : "''"},
        text:      ${data.bannerComponent['bannerText'] ? "'" + data.bannerComponent['bannerText'] + "'" : "''"},
        subText:   ${data.bannerComponent['bannerSubText'] ? "'" + data.bannerComponent['bannerSubText'] + "'" : "''"},
        timerText: ${data.bannerComponent['bannerTimerText'] ? "'" + data.bannerComponent['bannerTimerText'] + "'" : "''"},
    },
        [${data.bannerComponent['bannerMarket'] ? "'" + data.bannerComponent['bannerMarket'] + "'," : "'',"}]
    );`
    }

    if (localStorage.getItem('include-pills') == "true") {
    codeSnippet.innerText += `
    pills({
        pillDetails: {
            color: ${data.pillsComponent['pillColor'] ? "'" + data.pillsComponent['pillColor'] + "'" : "''"},
            text: ${data.pillsComponent['pillText'] ? "'" + data.pillsComponent['pillText'] + "'" : "''"},
            class: ${data.pillsComponent['pillClass'] ? "'" + data.pillsComponent['pillClass'] + "'" : "''"}
        },
    `
    // Add for loop to go through pillCriteria and add whatever exists
    codeSnippet.innerText += `
        },
        pillExclusions: {
    `
    };
    
    codeSnippet.innerText += `
});`

    if (localStorage.getItem('include-countdown') == "false" && localStorage.getItem('include-heroBanner') == "false" && localStorage.getItem('include-pills') == "false") {
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
            <input type="text" class="form-control pill-input pill-criteria" id="shipCodes" onkeyup="saveValue(this)" placeholder="Ships IDs">
        </div>

        <hr>
        
        <div class="form-group">
            <h3>Promo Dates</h3>
            <div class="d-flex justify-content-between">
                <div class="dates-input">
                    <label for="pillPromoStartDates">Start Date:</label>
                    <input type="date" class="form-control pill-input pill-criteria" id="pillPromoStartDates" onkeyup="saveValue(this)" placeholder="Pill Promo Start Date">
                </div>
                <div class="dates-input">
                    <label for="pillPromoEndDates">End Date:</label>
                    <input type="date" class="form-control pill-input pill-criteria" id="pillPromoEndDates" onkeyup="saveValue(this)" placeholder="Pill Promo End Date">
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
    `;

    form.innerHTML = html
    const newFormContent = document.querySelectorAll('.pill-input');
    const addPromoDatesBtn = document.querySelector('.add-promo-dates');
    const addSailingDatesBtn = document.querySelector('.add-sailing-dates');
    const addExSailingDatesBtn = document.querySelector('.add-exSailing-dates');
    let promoClickCount = 1
    let sailingClickCount = 1
    let exSailingClickCount = 1

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
                <input type="date" class="form-control added-promo-date pill-input pill-criteria" id="pillPromoStartDates${promoClickCount}" onkeyup="saveValue(this)">
            </div>
            <div class="dates-input">
                <label for="pillPromoEndDates${promoClickCount}">End Date:</label>
                <input type="date" class="form-control added-promo-date pill-input pill-criteria" id="pillPromoEndDates${promoClickCount}" onkeyup="saveValue(this)">
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
    
})

componentMenuButton.forEach(item => {
    item.addEventListener('click', () => {
        submitButton.style.display = "block";
    })
})

// INCLUDE COMPONENT CHECKBOX
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
    if(!localStorage.getItem(v)) {
        return "";
    }
    return localStorage.getItem(v);
}

// COPY CODE SNIPPET w COPY BUTTON 
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

// Add code snippet logic for pill init function
// function addPillData() {
//     let codeSnippet = ``;
//     for (let i = 0; i < localStorage.length; i++) {
//         if (localStorage.key(i).includes('shipCodes') && localStorage.getItem('shipCodes') !== '') {
//             let shipCodes = localStorage.getItem(localStorage.key(i)).replace(/ /g, '');
//             let shipCodesArr = shipCodes.split(',');

//             for (let i = 0; i < shipCodesArr.length; i++) {
//                 shipCodesArr[i] = `'${shipCodesArr[i]}'`
//             }
//             codeSnippet += `    shipCodes: [${shipCodesArr}],
//             `
//         }
//         if (localStorage.key(i).includes('pillPromo')) {
//             getDate(localStorage.getItem(localStorage.key(i)));
//         }
//         if (localStorage.key(i).includes('minNights')) {
//             codeSnippet += `    `
//         }
//     };
//     return codeSnippet;
// }

