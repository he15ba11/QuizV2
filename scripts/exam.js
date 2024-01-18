import data from "./questions.json" assert { type: "json" };
var grade;
console.log(data);

var ansArr = [];
var CheckedArr = [];
var questionArr = [];
var idChecked = "";
var currentIndex = 0;
var totalQuestions = data.length;
let activeAns = null;

function Answer(c, n) {
  this.correct = c;
  this.content = n;
}

function Question(q) {
  this.question = q;
  this.answer = [];
}

Question.prototype.add = function (ans) {
  ansArr.push(ans);
  this.answer.push(ans);
};

function RandomQ(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion(index) {
  var currentQuestion = data[index];
  var questionObj = new Question(currentQuestion.question);
  Object.entries(currentQuestion.answers).forEach(function ([key, value]) {
    var answerObj = new Answer(value, key);
    questionObj.add(answerObj);
  });
  questionArr.push(questionObj);

  $("#ques").text(questionObj.question);
  $("#ans").empty();
  questionObj.answer.forEach(function (answer, i) {
    $("#ans").append(
      `<li> <label for="${i}">${answer.content}</label> <input type="checkbox" name="${i}" id="${i}"></li>`
    );
  });

  if (index === 0) {
    $("#prevButton").attr("class", "ShowBtn");
  } else {
    $("#prevButton").removeClass("ShowBtn");
  }
  if (index === totalQuestions - 1) {
    $("#nextButton").attr("class", "ShowBtn");
  } else {
    $("#nextButton").removeClass("ShowBtn");
  }
  $("input[type='checkbox']").on("click", function () {
    if ($(this).prop("checked")) {
      $("input[type='checkbox']").not(this).prop("checked", false);
      idChecked = $(this).attr("id");
      // $(this).parent().css({
      //   "background-color": "#548184",
      // });
      selectedAns($(this).parent());
    } else {
      CheckedArr = CheckedArr.filter((item) => item !== $(this).attr("id"));
    }
    CheckedArr[index] = idChecked;
  });
}

$("#nextButton").click(function () {
  currentIndex = (currentIndex + 1) % totalQuestions;
  displayQuestion(currentIndex);
  $($("input")[CheckedArr[currentIndex]]).prop("checked", true);
  $(".pageNum").text(currentIndex + 1);
  selectedAns($($("input")[CheckedArr[currentIndex]]).parent());
});

$("#prevButton").click(function () {
  currentIndex = (currentIndex - 1 + totalQuestions) % totalQuestions;
  displayQuestion(currentIndex);
  $($("input")[CheckedArr[currentIndex]]).prop("checked", true);
  $(".pageNum").text(currentIndex + 1);
  selectedAns($($("input")[CheckedArr[currentIndex]]).parent());
});

RandomQ(data);
displayQuestion(currentIndex);
$(".pageNum").text(currentIndex + 1);

$("#submitButton").click(function () {
  grade = 0;
  for (var i = 0; i < CheckedArr.length; i++) {
    for (var j = 0; j < questionArr[i].answer.length; j++) {
      var selectedAnswerIndex = Number(CheckedArr[i]);
      if (selectedAnswerIndex === j) {
        if (questionArr[i].answer[j].correct === true) {
          grade++;
        }
      }
    }
  }
  console.log(grade);
  localStorage.setItem("grade", grade);
  location.replace("grade.html");
});
// ///////////////// Mark button
var markIndx = [];
let Index = 0;
$("#mark").on("click", function () {
  if (!markIndx.includes(currentIndex + 1)) {
    $(".markList").append(
      `<li index=${currentIndex + 1}>Mark Question ${
        currentIndex + 1
      } &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp<span>✖</span></li>   `
    );
    markIndx.push(currentIndex + 1);
    markIndx = Array.from(new Set(markIndx));
  }
  Index = currentIndex + 1;
  $(".markList li")
    .off("click")
    .on("click", function () {
      currentIndex = Number($(this).attr("index")) - 1;
      displayQuestion(currentIndex);
      $($("input")[CheckedArr[currentIndex]]).prop("checked", true);
      $(".pageNum").text(currentIndex + 1);
      selectedAns($($("input")[CheckedArr[currentIndex]]).parent());
    });
  $(".markList li span")
    .off("click")
    .on("click", function (e) {
      e.stopPropagation();
      let delEl = Number($(this).parent().attr("index"));
      markIndx.splice(markIndx.indexOf(delEl), 1);
      $(this).parent().remove();
    });
});
//////////////////////////////
const progressFill = document.getElementById("progressFill");
let progress = 0;

function fillProgressBar() {
  if (progress <= 100) {
    progress += 1;
    progressFill.style.width = `${progress}%`;

    if (progress <= 70) {
      progressFill.style.backgroundColor = "green";
    } else if (progress > 70 && progress <= 90) {
      progressFill.style.backgroundColor = "orange";
      setTimeout(function () {
        $("#worng").css("display", "block");
      }, 500);
      $("#worng").css("display", "none");
    } else {
      progressFill.style.backgroundColor = "red";
      setTimeout(function () {
        $("#worng").css("display", "block");
      }, 500);
      $("#worng").css("display", "none");
    }
    setTimeout(fillProgressBar, 1000);
  }
  if (progress === 100) {
    location.replace("grade.html");
    var grade = -1;
    localStorage.setItem("grade", grade);
  }
}
fillProgressBar();
//////////////////////////////////
function selectedAns(elem) {
  if (activeAns) {
    activeAns.css({
      "background-color": "#225053",
    });
  }
  elem.css({
    "background-color": "#548184",
  });
  activeAns = elem;
}
