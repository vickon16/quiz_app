
// getting all required elements
const  startBtn = document.querySelector(".start_btn button");
const  InfoBox = document.querySelector(".info_box");
const  exitBtn = InfoBox.querySelector(".buttons .quit");
const  continueBtn = InfoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz_box");
const timeCount = quizBox.querySelector(".timer_sec");
const timerLine = quizBox.querySelector(".timer_line");
const timerOff = quizBox.querySelector(".timer_text");


let optionList = document.querySelector(".option_list");
let timeValue = 15;
const timeLineConstant = 1/(timeValue + 1);


const correctScore = document.querySelector(".correct");
const wrongScore = document.querySelector(".wrong")


// if start quiz button is clicked
startBtn.addEventListener("click", () => {
  InfoBox.classList.add("activeInfo")
})

// if exitBtn is clicked
exitBtn.addEventListener("click", () => {
  InfoBox.classList.remove("activeInfo") 
})

// if continueBtn is clicked
continueBtn.addEventListener("click", () => {
  InfoBox.classList.remove("activeInfo");

  setTimeout(function(){
    quizBox.classList.add("activeQuiz");
    showQuestions(0);
    quesCounter(queNumber);
    startTimer(timeValue);
    startTimerLine(0);
  }, 1000)
})

let queCount = 0;
let queNumber = 1;
let counter;
let counterLine;
let widthValue = 0;
let correctCount = 0;
let wrongCount = 0;
const nextButton = quizBox.querySelector(".next_btn");
const skipButton = quizBox.querySelector(".skip_btn");

const resultBox = document.querySelector(".result_box")
const replayQuiz = resultBox.querySelector(".restart");
const quitQuiz = resultBox.querySelector(".quit");

quitQuiz.addEventListener('click', () => {
  window.location.reload();
})

replayQuiz.addEventListener("click", () => {
  resultBox.classList.remove("activeResult");
  setTimeout(function() {
    quizBox.classList.add("activeQuiz");
    queCount = 0;
    queNumber = 1;
    widthValue = 0;
    timeValue = 15;
    correctCount = 0;
    wrongCount = 0;
    wrapper()
    correctScore.textContent = correctCount;
    wrongScore.textContent = wrongCount;
  }, 2000)
    
})




// next button clicked
nextButton.addEventListener("click", () => {
  
  if (queCount < questions.length - 1) {
    queCount++; queNumber++;
    wrapper()
    skipButton.style.display = "inline-block";
  } else {
    clearInterval(counter);
    clearInterval(counterLine)
    showResultBox();
  }
})


// skip button clicked
skipButton.addEventListener("click", () => {
  
  if (queCount < questions.length - 1) {
    queCount++; queNumber++; wrongCount++;
    wrapper()
    skipButton.style.display  = "inline-block";
    wrongScore.textContent = wrongCount;
  } else {
    clearInterval(counter);
    clearInterval(counterLine)
    showResultBox();
  }
})

function wrapper() {
    showQuestions(queCount)
    quesCounter(queNumber);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine)
    startTimerLine(widthValue)
    timeCount.style.color = "white";
    nextButton.style.display = "none";
    timerOff.textContent = "Time Left"
}


function showQuestions(index) {
  const queText = document.querySelector(".que_text span");
  queText.innerHTML = questions[index].question[0];
  let optionTag = `
  <div class="option"><span>A</span><div class="option_div"><span>${questions[index].question[1]["A"]}</span></div></div>

  <div class="option"><span>B</span><div class="option_div"><span>${questions[index].question[1]["B"]}</span></div></div>

  <div class="option"><span>C</span><div class="option_div"><span>${questions[index].question[1]["C"]}</span></div></div>

  <div class="option"><span>D</span><div class="option_div"><span>${questions[index].question[1]["D"]}</span></div></div>
  `
  optionList.innerHTML = optionTag;

  const optionDiv = document.querySelectorAll(".option_div");

  // note that the queCount is also increamented in the loop
  optionDiv.forEach(option => {
    option.setAttribute("onclick", "optionSelected(this)")
  })

}


let tickIcon = `<div class="icon tick"><i class="fas fa-check"></i></div>`
let crossIcon = `<div class="icon cross"><i class="fas fa-times"></i></div>`



function optionSelected(tag) {
  clearInterval(counter)
  clearInterval(counterLine)

  let userAns = tag.innerText;
  let correctAns = questions[queCount].question[2];
  let allOptions = optionList.children.length;
  if (userAns === correctAns) {
    tag.classList.add("correct")
    // this method insert elements to a specified position adjacently
    tag.insertAdjacentHTML("beforeend", tickIcon);
    correctCount++;
    correctScore.textContent = correctCount;
  } else {
    tag.classList.add("incorrect")
    tag.insertAdjacentHTML("beforeend", crossIcon);
    wrongCount++;
    wrongScore.textContent = wrongCount;

      for (let i = 0; i < allOptions; i++) {
        if (optionList.children[i].children[1].innerText === correctAns)
      {
        optionList.children[i].children[1].setAttribute("class", "option_div correct")
      }
    }
  }

  // disable all options once user has selected;
  for (let i = 0; i < allOptions; i++) {
    // select all the option_div tags
    optionList.children[i].children[1].classList.add("disabled");
  }

  nextButton.style.display = "inline-block";
  skipButton.style.display = "none";
}


function showResultBox() {
  quizBox.classList.remove("activeQuiz");

  setTimeout(function(){
    resultBox.classList.add("activeResult");
    const scoreText = resultBox.querySelector(".score_text");
    if(correctCount > 8) {
      let scoreTag = `<span>Congrats!!!. You got <p>${correctCount}</p> out of <p>${questions.length}</p> Questions</span>`;
      scoreText.innerHTML = scoreTag;
    } 
    else if(correctCount > 4) {
      let scoreTag = `<span>Not bad. You got <p>${correctCount}</p> out of <p>${questions.length}</p> Questions</span>`;
      scoreText.innerHTML = scoreTag;
    }
    else{
      let scoreTag = `<span>Sorry. You got only <p>${correctCount}</p> out of <p>${questions.length}</p> Questions</span>`;
      scoreText.innerHTML = scoreTag;
    }
  }, 1000)
}


function startTimer(time) {
  counter = setInterval(timer, 1000);

  function timer() {
    timeCount.innerText = time;
    time--;
    if (time < 9) {
      let content = timeCount.innerText;
      timeCount.textContent = "0" + content;
      timeCount.style.color = "red";
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.innerText = "00";
      timeCount.style.color = "white";
      timerOff.textContent = "Time OFF"

      let correctAns = questions[queCount].question[2];
      let allOptions = optionList.children.length;
      wrongCount++;
      wrongScore.textContent = wrongCount;

      for (let i = 0; i < allOptions; i++) {
        if (optionList.children[i].children[1].innerText === correctAns)
      {
        optionList.children[i].children[1].setAttribute("class", "option_div correct")
      }
    }

    for (let i = 0; i < allOptions; i++) {
      // select all the option_div tags
      optionList.children[i].children[1].classList.add("disabled");
    }
  
    nextButton.style.display = "inline-block";
    skipButton.style.display = "none";
    } 
    
  }
}


function startTimerLine(time) {
  counterLine = setInterval(timer, 10);

  function timer() {
    time += timeLineConstant; //this is gotten from 100% / 15(countdown)
    timerLine.style.width = time + "%";
    if (time >= 100) {
      clearInterval(counterLine);
    } 
    
  }
}


function quesCounter(index) {
  const buttonQuesCounter = quizBox.querySelector(".total_que");
  let totalQuestionCountTag = `<span><p>${index
  }</p>of<p>${questions.length}</p> Questions</span>`;
  buttonQuesCounter.innerHTML = totalQuestionCountTag;
}










