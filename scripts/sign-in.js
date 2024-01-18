var email = document.getElementById("email");
var password = document.getElementById("password");
var span = document.getElementById("error");
$("#form").on("submit", function (e) {
  if (
    email.value == localStorage.getItem("email") &&
    password.value == localStorage.getItem("password")
  ) {
    e.preventDefault();
    window.location.replace("../pages/rules.html");
  } else {
    e.preventDefault();
    span.innerHTML = "Email and password are not valid.";
    span.style.color = "red";
  }
});
