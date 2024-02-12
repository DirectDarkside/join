let isImageLog = true;

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    fadeOutModal();
  }, 1000);

  function fadeOutModal() {
    let modal = document.getElementById("landing_page");
    modal.classList.add("fade-out");
    setTimeout(function () {
      modal.style.display = "none";
    }, 500);
  }
});

function toggleCheckboxLogin() {
  let image = document.getElementById("checkLogin");

  if (isImageLog) {
    image.src = "./assets/img/login/checked.png";
  } else {
    image.src = "./assets/img/login/unchecked.png";
  }

  isImageLog = !isImageLog;
}

async function checkUser() {
  let response = await getItem("users");
  let responseAsJson = JSON.parse(response);
  let loginEmail = document.getElementById("email").value;
  let loginPwd = document.getElementById("password").value;
  const filteredUser = responseAsJson.users.filter(user => user.userMail == loginEmail);
  console.log(filteredUser);
  if (
    loginEmail == filteredUser[0].userMail &&
    loginPwd == filteredUser[0].userPwd
  ) {
    alert("Eingabe sind =");
    window.location.href = `./summary.html?name=${filteredUser[0].userName}`;
  } else {
    alert("Eingabe sind !=");
  }
}