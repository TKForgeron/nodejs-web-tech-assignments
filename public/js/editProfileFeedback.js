const oldPw = document.getElementsByTagName('input').oldPassword;
const newPw = document.getElementsByTagName('input').newPassword;
// const newUsername = document.getElementsByTagName('input').newUsername;
// const newName = document.getElementsByTagName('input').newName;
let inputFields = [oldPw, newPw]; //, newUsername, newName];

inputFields.forEach(elm => {
  elm.style.borderColor = '#f44336';
  // elm.placeholder = 'Credentials wrong';
});
