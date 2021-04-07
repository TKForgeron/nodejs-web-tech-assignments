const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const success = urlParams.has('unsuccessful');
console.log(success);

if (success) {
  let usernameInput = document.getElementsByTagName('input')[0];
  usernameInput.style.borderColor = '#f44336';
  usernameInput.placeholder = 'Username does not exist';
}
