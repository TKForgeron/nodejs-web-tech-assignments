// This just creates the navbar.
function createNav() {
    var nav = document.getElementsByTagName('nav')[0];
    var navItemClass = 'nav__item';
    var navItemAClass = 'nav__link';

    var unorderedNavList = document.createElement('ul');
    unorderedNavList.classList.add('nav__bar');
    unorderedNavList.classList.add('list--no-bullets');

    var indexItem = document.createElement('li');
    indexItem.classList.add(navItemClass);
    var indexAHref = document.createElement('a');
    indexAHref.classList.add(navItemAClass);
    indexAHref.setAttribute('href', 'index.html');
    indexAHref.appendChild(document.createTextNode('Home'));
    indexItem.appendChild(indexAHref);

    var historyItem = document.createElement('li');
    historyItem.classList.add(navItemClass);
    var historyAHref = document.createElement('a');
    historyAHref.classList.add(navItemAClass);
    historyAHref.setAttribute('href', 'history.html');
    historyAHref.appendChild(document.createTextNode('History'));
    historyItem.appendChild(historyAHref);

    var versionsItem = document.createElement('li');
    versionsItem.classList.add(navItemClass);
    var versionsAHref = document.createElement('a');
    versionsAHref.classList.add(navItemAClass);
    versionsAHref.setAttribute('href', 'versionsFrameworks.html');
    versionsAHref.appendChild(document.createTextNode('Versions & Frameworks'));
    versionsItem.appendChild(versionsAHref);

    var examplesItem = document.createElement('li');
    examplesItem.classList.add(navItemClass);
    var examplesAHref = document.createElement('a');
    examplesAHref.classList.add(navItemAClass);
    examplesAHref.setAttribute('href', 'examples.html');
    examplesAHref.appendChild(document.createTextNode('Examples'));
    examplesItem.appendChild(examplesAHref);

    var guidesItem = document.createElement('li');
    guidesItem.classList.add(navItemClass);
    var guidesAHref = document.createElement('a');
    guidesAHref.classList.add(navItemAClass);
    guidesAHref.setAttribute('href', 'guides.html');
    guidesAHref.appendChild(document.createTextNode('Helpful guides'));
    guidesItem.appendChild(guidesAHref);

    var dropdown = document.createElement('li');
    dropdown.classList.add("nav__dropdown");

    var profileItem = document.createElement('a');
    profileItem.classList.add(navItemAClass);
    profileItem.setAttribute('href', 'profile');
    profileItem.appendChild(document.createTextNode('Account ▼'));

    var dropdownContent = document.createElement('ul');
    dropdownContent.classList.add("nav__dropdown__content");
    dropdownContent.classList.add("list--no-bullets");

    var loginItem = document.createElement('li');
    loginItem.classList.add(navItemClass);
    var loginAHref = document.createElement('a');
    loginAHref.classList.add(navItemAClass);
    loginAHref.setAttribute('href', 'login');
    loginAHref.appendChild(document.createTextNode('Login'));
    loginItem.appendChild(loginAHref);
    dropdownContent.appendChild(loginItem);

    dropdown.appendChild(profileItem);
    dropdown.appendChild(dropdownContent);

    var profileItemMobile = document.createElement('li');
    profileItemMobile.classList.add(navItemClass);
    profileItemMobile.id = "mobile";
    var profileAHrefMobile = document.createElement('a');
    profileAHrefMobile.classList.add(navItemAClass);
    profileAHrefMobile.setAttribute('href', 'profile');
    profileAHrefMobile.appendChild(document.createTextNode('Account ▼'));
    profileItemMobile.appendChild(profileAHrefMobile);

    var loginItemMobile = document.createElement('li');
    loginItemMobile.classList.add(navItemClass);
    loginItemMobile.classList.add(navItemClass + '--mobile');
    var loginAHrefMobile = document.createElement('a');
    loginAHrefMobile.classList.add(navItemAClass);
    loginAHrefMobile.setAttribute('href', 'login');
    loginAHrefMobile.appendChild(document.createTextNode('Login'));
    loginItemMobile.appendChild(loginAHrefMobile);

    var spacerItem = document.createElement('li');
    spacerItem.classList.add(navItemClass + '--spacer');

    var assessmentItem = document.createElement('li');
    assessmentItem.classList.add(navItemClass);
    assessmentItem.classList.add(navItemClass + '--right');
    var assessmentAHref = document.createElement('a');
    assessmentAHref.classList.add(navItemAClass + '--active');
    assessmentAHref.setAttribute('href', 'assessment.html');
    assessmentAHref.appendChild(document.createTextNode('Assessment'));
    assessmentItem.appendChild(assessmentAHref);

    unorderedNavList.appendChild(indexItem);
    unorderedNavList.appendChild(historyItem);
    unorderedNavList.appendChild(versionsItem);
    unorderedNavList.appendChild(examplesItem);
    unorderedNavList.appendChild(guidesItem);
    unorderedNavList.appendChild(dropdown);
    unorderedNavList.appendChild(profileItemMobile);
    unorderedNavList.appendChild(loginItemMobile);
    unorderedNavList.appendChild(spacerItem);
    unorderedNavList.appendChild(assessmentItem);
    nav.appendChild(unorderedNavList);
}
createNav();