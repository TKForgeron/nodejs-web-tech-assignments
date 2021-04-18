// This file is designed to give feedback when a user tries to edit his credentials. It is not structured in a particular way.
const oldPw = document.getElementsByTagName('input').oldPassword;
const newPw = document.getElementsByTagName('input').newPassword;
let inputFields = [oldPw, newPw];

inputFields.forEach(elm => {
  elm.style.borderColor = '#f44336';
});
