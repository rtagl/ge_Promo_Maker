const submitButton = document.querySelector('.promo-submit')

submitButton.addEventListener('click', (e)=>{
    e.preventDefault();

    // Hero Banner Selectors
    const heroParentElement = document.querySelector('#heroParentElement').value;
    const heroTextTop = document.querySelector('#heroTextTop').value;
    const heroTextBottom = document.querySelector('#heroTextBottom').value;
    const heroTextLocation = document.querySelector('#heroTextLocation').value;
    const heroImageDesktop = document.querySelector('#heroImageDesktop').value;
    const heroImageMobile = document.querySelector('#heroImageMobile').value;

    const codeSnippet = document.querySelector('.invoke-init-text')

    // Create Copy Text Button upon submit
    const copyTextButton = document.createElement('button')
    copyTextButton.classList.add('btn', 'btn-primary', 'copy-text')
    copyTextButton.innerText = 'Copy Code Snippet'
    copyTextButton.setAttribute("onclick", "copyText()")
    copyTextButton.setAttribute("type", "submit")

    document.querySelector('#append-button').append(copyTextButton)

    // Generated Code Snippet
    codeSnippet.innerText = `
        init('.${heroParentElement}', function() {
            heroBanner(
                '.${heroParentElement}',
                '${heroTextTop},
                '${heroTextBottom},
                '${heroTextLocation},
                [
                    'http://sb.monetate.net/img/1/388/${heroImageDesktop}',
                    'http://sb.monetate.net/img/1/388/${heroImageMobile}'
                ]
            );
        });
    `

});


// copy codesnippet function 
function copyText() {
    const snippetText = document.querySelector('.invoke-init-text').innerText;
    const textArea = document.createElement('textarea');
    textArea.textContent= snippetText;
    document.body.append(textArea);
    console.log(textArea.textContent)
    textArea.select()
    document.execCommand("copy");
    textArea.remove()
} 

const bannerButton = document.querySelector('.banner-button')

bannerButton.addEventListener('click', ()=> {
    let formContent = document.querySelectorAll('.form-group')

    for(let i = 0; i < formContent.length; i++) {
        formContent[i].remove()
    }

    
})
