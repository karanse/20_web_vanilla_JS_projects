const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


//Functions//
//Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//Check email is valid
function checkEmail(input) {
    const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
      showError(input, 'Email is not valid')
  }
}


//Check input length
function checkLength(input, min, max) {
    if (input.value.length < min || input.value.length > max) {
        showError(input, `${getFieldName(input)} should be ${min} - ${max} characters` )
    } else {
        showSuccess(input);
    }
}

//Password match check
function checkPasswordMatch(input1, input2) {
    if (input1.value === input2.value) {
        showSuccess(input2);
    } else {
        showError(input2, 'Passwords do not match');
    }
}

//Get fieldName
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });

}

//Event Listeners//
form.addEventListener('submit', function(e) {
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 5, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
})









//Below is not refactored version of the code
// if(username.value === '') {
//     showError(username, 'Username is required');
// } else {
//     showSuccess(username);
// }

// if(email.value === '') {
//     showError(email, 'Email is required');
// } else if(!isValidEmail(email.value)) {
//     showError(email, 'Email is not valid');
// } else {
//     showSuccess(email);
// }

// if(password.value === '') {
//     showError(password, 'Pasword is required');
// } else {
//     showSuccess(password);
// }

// if(password2.value === '') {
//     showError(password2, 'Password2 is required');
// } else {
//     showSuccess(password2);
// }
