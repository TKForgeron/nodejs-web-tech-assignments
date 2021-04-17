const oldPw = document.getElementsByTagName('input').oldPassword;
const newPw = document.getElementsByTagName('input').newPassword;
let inputFields = [oldPw, newPw];

inputFields.forEach(elm => {
  elm.style.borderColor = '#f44336';
});
