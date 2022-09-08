// We have a start button
// a timer will start(set interval)
// event handler on click,  presented with question
// as well as answer choices related to question
// when answer is clicked
    // If an answer is wrong, then decrement the variable timer
        // display that the user choice was incorrect, then move to the next question
    // if an answer is correct
        // display that the user choice was correct(text content)
        // we want to increment score ++
        // for loop to loop through the questions array to the next question
    // when timer hits 0 or no more questions
        // then clear interval
        // then allow user to input intitials
        // then link to highscores page
        // save data to local storage


let timeClock = document.getElementById("time");
let begin = document.getElementById("starting");
let startButton = document.getElementById("start");
let mainQuestions = document.getElementById("questions");
let quest = document.getElementById("q");
let ans = document.getElementById("a");
let scores = document.getElementById("savetopscore");
let retry = document.getElementById("startover");
let submit = document.getElementById("submit")
let HighScores = document.getElementById("HighScores");
let finalscore = document.getElementById("finalscore");

let highScoreList = document.getElementById("TPlist");

let scoreList = [];
let currentQ = 0;
let secondsLeft = 60;
let timerInterval;
let score;
let initials = document.getElementById("Initials"); 

const allQuestions = [{
    question: "What is an apple?",
    answers: [
        "A fruit",
        "A vegetable",
        "An animal",
        "A drink"
    ],
    correctAnswer: "A fruit"
},
{
    question: "How much are we spending on tuition?",
    answers: [
        "$5",
        "$1,000",
        "$5,000",
        "$12,500"
    ],
    correctAnswer: "$12,500"
},
{
    question: "Do pineapples belong on pizza?",
    answers: [
        "Yes",
        "Absolutely not",
        "Everytime",
        "Sometimes"
    ],
    correctAnswer: "Absolutely not",
},
{
    question: "How many chambers does a heart have?",
    answers: [
        "1",
        "2",
        "3",
        "4"
    ],
    correctAnswer: "4",
},
];    


function startGame(){
    mainQuestions.setAttribute("style", "display: flex");
    currentQ = 0;
    secondsLeft = 60;
    startTimer();
    game();
}

function game(){
    quest.innerHTML = "";
    ans.innerHTML = "";
    if (currentQ < allQuestions.length) {
    quest.textContent = allQuestions[currentQ].question;
        for (let index = 0; index < 4; index++) {
            let list = document.createElement("li");
            list.addEventListener("click", function() {
                if (this.textContent === allQuestions[currentQ].correctAnswer){
                    currentQ++;
                    game();

                } else {
                    currentQ++;
                    secondsLeft -= 15;
                    game();
                }
                ;
            })

            list.textContent = allQuestions[currentQ].answers[index];
            ans.append(list);
            list.setAttribute("style", "padding: 10px 0");
            list.setAttribute("style", "border-style: solid")
        }
    } else {
        endGame();
    }
}

function startTimer () {
    timerInterval = setInterval(function(){
        secondsLeft--;
        timeClock.textContent = "Time Remaining: " + secondsLeft;
        if(secondsLeft === 0){
            score = secondsLeft;
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000)
}

//endgame and save scores to local storage
 //pause timer
    //set score as time left
    //save to local storage time left and initials
function endGame(){
    if(secondsLeft != 0){
        clearInterval(timerInterval);
        score = secondsLeft;
    }
    mainQuestions.setAttribute("style", "display: none");
    scores.setAttribute("style", "display: flex");
    finalscore.textContent = ("Your Final Score is: " + score);
    timeClock.textContent = ("Total Time: 60 Secs");
}

submit.addEventListener("click", function(event){
    event.preventDefault();
    let highScore = {
        Initials: initials.value.trim(),
        score
    };

    let previousHighscores = JSON.parse(localStorage.getItem("HighScores"));
    
    if(previousHighscores != null) {
        for (let index = 0; index < previousHighscores.length; index++) {
            scoreList.push(previousHighscores[index]);
        }
    }
    
    scoreList.push(highScore);
    
    //sort by largest
    scoreList.sort((a,b) => b.score - a.score);
    
    //only keep the highest
    scoreList.splice(5);
   
    //store scorelist in local storage
    localStorage.setItem("HighScores", JSON.stringify(scoreList));
    scoreList = [];
    HighScores = {};
    initials.value = "";
});

startButton.addEventListener("click", function (){
    begin.setAttribute("style", "display: none");
    startGame();
});

retry.addEventListener("click", function (){
    scores.setAttribute("style", "display: none");
    startGame();
});