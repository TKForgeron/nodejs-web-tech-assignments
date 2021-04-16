const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const unsuccessful = urlParams.has('unsuccessful');

if (unsuccessful) {
    const passwordInput = document.getElementsByTagName('input').password; 
    passwordInput.style.borderColor = '#f44336';    
    alert("Your password isn't complex enough!");
  
}
