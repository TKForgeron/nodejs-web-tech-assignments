// This just creates the footer
function createFooter() {
    var footer = document.getElementsByTagName('footer')[0];

    var footerP = document.createElement('p');
    footerP.appendChild(
        document.createTextNode('Made by Douwe, Tim and Maarten.')
    );

    var footerImg = document.createElement('img');
    footerImg.classList.add('footer__image');
    footerImg.setAttribute('src', 'images/uulogotext.png');
    footerImg.setAttribute(
        'alt',
        'UU Logo with Text reading Universiteit Utrecht'
    );

    footer.appendChild(footerP);
    footer.appendChild(footerImg);
}
createFooter();