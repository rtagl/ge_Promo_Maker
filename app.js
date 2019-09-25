const submitButton = document.querySelector('.promo-submit')

submitButton.addEventListener('click', (e)=>{
    e.preventDefault();

    // Hero Text Selectors
    const heroParentElement = document.querySelector('#heroParentElement').value;
    const heroTextTop = document.querySelector('#heroTextTop').value;
    const heroTextBottom = document.querySelector('#heroTextBottom').value;
    const heroTextLocation = document.querySelector('#heroTextLocation').value;
    const heroImageDesktop = document.querySelector('#heroImageDesktop').value;
    const heroImageMobile = document.querySelector('#heroImageMobile').value;

    const codeSnippet = document.querySelector('.invoke-init-text')

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

//copy function 
function copyText() {
    const snippetText = document.querySelector('.invoke-init-text').innerText;
    const textArea = document.createElement('textarea');
    textArea.innerText = snippetText;
    document.body.append(textArea);
    textArea.select()
    document.execCommand("copy");
    textArea.remove()
    console.log('this is working');
} 