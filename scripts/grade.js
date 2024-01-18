var grade = localStorage.getItem("grade");
var text = document.getElementsByClassName("grade")[0];
var audio = new Audio();
if(grade == -1)
{
  $("img").attr("src", "../images/time out.webp");
  $("img").css("width", "200px")
  audio.src = "/audios/oops.m4a";
  audio.play();
  $("#displayText").text("");
  $("#displayText").append(`<span class="sorry">Sorry!  <br></span>${localStorage.getItem("fname")} 
  ${localStorage.getItem("lname")} <br> <span class="sorry"> time out</span>`);
  $(".sorry").css("color","red")
}
else if (grade >= 6) {
  $("img").attr("src", "../images/1705414423757-Standard.png");
  $("img").css("width","180px")
  audio.src = "/audios/videoplayback.m4a";
  audio.play();
  for (var i = 0; i < 15; i++) {
    confetti();
  }
  $("#displayText").prepend(`  ${localStorage.getItem("fname")} ${localStorage.getItem("lname")}  <br>`);
} else {
  $("img").attr("src", "../images/fail (2).png");
  text.style.color = "red";
  $(".g").css("color", "red");
  audio.src = "/audios/fail.m4a";
  audio.play();
  $("#displayText").prepend(`  ${localStorage.getItem("fname")} ${localStorage.getItem("lname")}  <br>`);
}
text.innerHTML = grade * 10;
