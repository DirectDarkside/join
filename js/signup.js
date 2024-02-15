/**
 * Function toggles acceptance of Privacy Policys checkbox
 */
function toggleCheckboxSignup() {
  let uncheckedBox = document.getElementById("unchecked");
  let checkedBox = document.getElementById("checked");

  if (uncheckedBox) {
    uncheckedBox.src = "assets/img/signUp/checked.png";
    uncheckedBox.id = "checked";
  } else if (checkedBox) {
    checkedBox.src = "assets/img/signUp/unchecked.png";
    checkedBox.id = "unchecked";
  }
}

/**
 * Toggles the visibility icon of the password input field based on its current type and value.
 */
let passwordInput = document.getElementById("passwordSignup");
let passwordImg = document.getElementById("signupPwImg");

function togglePwIcon() {
  if (passwordInput.type === "password") {
    if (passwordInput.value !== "") {
      passwordImg.src = "./assets/img/logIn/visibility_off.png";
    } else {
      passwordImg.src = "./assets/img/logIn/lock.png";
    }
  } else if (passwordInput.type === 'text') {
    passwordImg.src = './assets/img/logIn/visibility_on.png';
  }
}

/**
 * Toggles the visibility of the password input field and updates the visibility icon accordingly.
 * Only works if there is text present in the input field.
 */
function togglePwVisibility() {
  if (passwordInput.value !== "") {
    let currentSrc = passwordImg.src;

    if (currentSrc.includes("visibility_off.png")) {
      passwordImg.src = "./assets/img/logIn/visibility_on.png";
      passwordInput.type = "text";
    } else {
      passwordImg.src = "./assets/img/logIn/visibility_off.png";
      passwordInput.type = "password";
    }
  }
}

/**
 * Toggles the visibility icon of the password input confirm field based on its current type and value.
 */
let pwdConfirmInput = document.getElementById("passwordConfirm");
let pwdConfirmImg = document.getElementById("signupPwImgConfirm");

function toggleConfirmIcon() {
  if (pwdConfirmInput.type === "password") {
    if (pwdConfirmInput.value !== "") {
      pwdConfirmImg.src = "./assets/img/logIn/visibility_off.png";
    } else {
      pwdConfirmImg.src = "./assets/img/logIn/lock.png";
    }
  } else if (pwdConfirmInput.type === 'text') {
    pwdConfirmImg.src = './assets/img/logIn/visibility_on.png';
  }
}

/**
 * Toggles the visibility of the password input confirm field and updates the visibility icon accordingly.
 * Only works if there is text present in the input field.
 */
function toggleConfirmVisibility() {
  if (pwdConfirmInput.value !== "") {
    let currentSrc = pwdConfirmImg.src;

    if (currentSrc.includes("visibility_off.png")) {
      pwdConfirmImg.src = "./assets/img/logIn/visibility_on.png";
      pwdConfirmInput.type = "text";
    } else {
      pwdConfirmImg.src = "./assets/img/logIn/visibility_off.png";
      pwdConfirmInput.type = "password";
    }
  }
}

/**
 * Toggles img and password visibility
 */
function togglePwIconConfirm() {
  let passwordInput = document.getElementById("passwordConfirm");
  let passwordImg = document.getElementById("signupPwImgConfirm");
  let currentSrc = passwordImg.src;

  if (currentSrc.includes("visibility_off.png")) {
    passwordImg.src = "./assets/img/logIn/visibility_on.png";
    passwordInput.type = "text";
  } else {
    passwordImg.src = "./assets/img/logIn/visibility_off.png";
    passwordInput.type = "password";
  }
}

/**
 * This asynchronous function captures input values from a signup form and, based on checkbox
 * state, either displays an alert message or adds user data to a list,
 * though currently not storing it persistently.
 */
async function inputValue() {
  let signupName = document.getElementById("nameSignup").value;
  let signupMail = document.getElementById("emailSignup").value;
  let signupPwd = document.getElementById("passwordSignup").value;
  let checkBoxUnchecked = document.getElementById("unchecked");
  let checkBoxChecked = document.getElementById("checked");

  const data = await getItem("users");
  const dataAsJson = JSON.parse(data);
  const userList = dataAsJson.users;

  if (checkBoxUnchecked) {
    errorSignUpCheckbox();
  } else if (checkBoxChecked) {
    let user = {
      userName: signupName,
      userMail: signupMail,
      userPwd: signupPwd,
    };

    userList.push(user);
    console.log(dataAsJson);
    /* setItem("users", dataAsJson);*/
  }
}

/**
 * Auxiliary function who gives an error message if checkbox not checked.
 */
function errorSignUpCheckbox() {
  let errorMessage = document.getElementById("errorTxt");
  errorMessage.textContent = "Please read and accept our Privacy Policy first";
}

/**
 * Checks if the passwords entered in the signup form match.
 * Enables the signup button if they match, otherwise displays an error message and disables the button.
 */
function checkPasswords() {
  let password1 = document.getElementById("passwordSignup").value;
  let password2 = document.getElementById("passwordConfirm").value;

  if (password1 === password2) {
    document.getElementById("signUpBtn").disabled = false;
    removeRedOutline();
  } else {
    displayErrorMessage("The passwords do not match!");
    document.getElementById("signUpBtn").disabled = true;
    errorRedOutline();
  }
}

/**
 * Displays an error message on the web page.
 * @param {string} message - The error message to display.
 */
function displayErrorMessage(message) {
  let errorMessage = document.getElementById("errorTxt");
  errorMessage.textContent = message;
}

/**
 * Applies a red outline to the input div containers to indicate an error.
 */
function errorRedOutline() {
  let password1Outline = document.getElementById("passwordContainer");
  let password2Outline = document.getElementById("passwordConfirmContainer");
  password1Outline.classList.add("outline_red");
  password2Outline.classList.add("outline_red");
}

/**
 * Removes the red outline from input div containers.
 */
function removeRedOutline() {
  let password1Outline = document.getElementById("passwordContainer");
  let password2Outline = document.getElementById("passwordConfirmContainer");
  password1Outline.classList.remove("outline_red");
  password2Outline.classList.remove("outline_red");
}

//////////  //////////

// noch nicht löschen oder bearbeiten!

// let user = {
//   users: [

//   ],

//   tasks: [
//     {
//       "assigned to": ["Florian", "Daniel", "Roman"],
//       category: "User Story",
//       desription: "Denk an die Milch",
//       dueDate: "2024-02-08",
//       prio: "urgent",
//       subtasks: [
//         {
//           title: "Tanken fahren",
//           check: false,
//         },
//         {
//           title: "Kind abholen!",
//           check: false,
//         },
//       ],
//     }
//   ],

//   contacts: []
// };
