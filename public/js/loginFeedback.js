const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const unsuccessful = urlParams.has('unsuccessful');

if (unsuccessful) {
  const passwordInput = document.getElementsByTagName('input').password;
  const usernameInput = document.getElementsByTagName('input').username;
  let inputFields = [passwordInput, usernameInput];

  inputFields.forEach(elm => {
    elm.style.borderColor = '#f44336';
    elm.placeholder = 'Credentials wrong';
  });
}
