(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
    "questions": [
        {
            "question": "true",
            "key": true
        },
        {
            "question": "false",
            "key:": false
        },
        {
            "question": "false",
            "key:": false
        },
        {
            "question": "false",
            "key:": false
        },
        {
            "question": "false",
            "key:": false
        },
        {
            "question": "false",
            "key:": false
        },
        {
            "question": "false",
            "key:": false
        },
        {
            "question": "true",
            "key:": true
        },
        {
            "question": "false",
            "key:": false
        },
        {
            "question": "false",
            "key:": false
        },
        {
            "question": "false",
            "key:": false
        },
        {
            "question": "false",
            "key:": false
        },
        {
            "question": "false",
            "key:": false
        }
    ]
}

},{}],2:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const data = __importStar(require("../json/quiz.json"));
let minute = 0, second = 10;
let howLongIsASecondInMS = 100;
let quizArray = [];
dragElement(document.getElementById("window"));
function recenterWindow() {
    document.getElementById("window").style.left =
        document.documentElement.clientWidth / 2 -
            document.getElementById("window").offsetWidth / 2 +
            "px";
    document.getElementById("window").style.top =
        document.documentElement.clientHeight / 2 -
            document.getElementById("window").offsetHeight / 2 +
            "px";
}
function dragElement(windowElem) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(windowElem.id + "Header")) {
        /*
        if present, the header is where you move the DIV from:
        */
        document.getElementById(windowElem.id + "Header").addEventListener("mousedown", dragMouseDown);
    }
    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.addEventListener("mouseup", closeDragElement);
        document.addEventListener("mousemove", elementDrag);
    }
    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        if (windowElem.offsetTop - pos2 > 0 &&
            windowElem.offsetHeight + windowElem.offsetTop - pos2 < document.documentElement.clientHeight) {
            windowElem.style.top = windowElem.offsetTop - pos2 + "px";
        }
        if (windowElem.offsetLeft - pos1 > 0 &&
            windowElem.offsetLeft + windowElem.offsetWidth - pos1 < document.documentElement.clientWidth) {
            windowElem.style.left = windowElem.offsetLeft - pos1 + "px";
        }
        if (windowElem.offsetHeight + windowElem.offsetTop - pos2 > document.documentElement.clientHeight + 100 ||
            windowElem.offsetLeft + windowElem.offsetWidth - pos1 > document.documentElement.clientWidth + 100) {
            windowElem.style.left = 0 + "px";
            windowElem.style.top = 0 + "px";
        }
    }
    function closeDragElement() {
        document.removeEventListener("mouseup", closeDragElement);
        document.removeEventListener("mousemove", elementDrag);
    }
}
function startCountdown() {
    let next = document.getElementById("next");
    let scrollBoxText = document.getElementById("scrollBoxText");
    if (scrollBoxText.scrollTop + 25 > scrollBoxText.scrollHeight - scrollBoxText.clientHeight) {
        if (second < 10) {
            next.textContent = `Wait ${minute}:0${second}`;
        }
        else {
            next.textContent = `Wait ${minute}:${second}`;
        }
        scrollBoxText.removeEventListener("scroll", startCountdown);
        let intervalID = setInterval(() => {
            if (second == 0 && minute > 0) {
                second = 59;
                minute -= 1;
            }
            else if (second > 0) {
                second -= 1;
            }
            if (second < 10) {
                next.textContent = `Wait ${minute}:0${second}`;
            }
            else {
                next.textContent = `Wait ${minute}:${second}`;
            }
            if (next.textContent == "Wait 0:00") {
                clearInterval(intervalID);
                setTimeout(() => {
                    next.textContent = "Next >";
                    next.removeAttribute("disabled");
                    next.addEventListener("click", windowSwitchQuiz);
                }, howLongIsASecondInMS);
            }
        }, howLongIsASecondInMS);
    }
}
// TODO: Split this function into two function for readability, case windowContentTerms.className: // i.e switch to Terms should be moved to wrongAnswer()
function switchWindow() {
    let windowContentTerms = document.getElementById("windowContentTerms");
    let windowContentQuestions = document.getElementById("windowContentQuestions");
    let scrollBoxText = document.getElementById("scrollBoxText");
    let scrollBoxQuiz = document.getElementById("scrollBoxQuiz");
    let next = document.getElementById("next");
    switch ("hidden") {
        case windowContentTerms.className: // windowSwitchTerms()
            windowSwitchTerms();
            windowContentQuestions.classList.add("hidden");
            windowContentQuestions.style.opacity = "0";
            windowContentTerms.classList.remove("hidden");
            (minute = 0), (second = 10);
            next.textContent = "Wait";
            next.setAttribute("disabled", "");
            scrollBoxText.scroll(0, 0);
            document.getElementsByClassName("wrong").item(0).style.opacity = "1";
            next.addEventListener("click", switchWindow);
            scrollBoxText.addEventListener("scroll", startCountdown);
            windowContentTerms.style.opacity = "1";
            break;
        case windowContentQuestions.className: // windowSwitchQuiz()
            document.getElementById("next").removeEventListener("click", switchWindow);
            let labels = document.querySelectorAll("label");
            quizArray = getQuizQuestions();
            for (let i = 0; i < labels.length; i++) {
                let label = labels.item(i);
                try {
                    label.innerText = quizArray[i][0];
                }
                catch (error) {
                    console.log(error);
                }
            }
            windowContentTerms.classList.add("hidden");
            windowContentTerms.style.opacity = "0";
            windowContentQuestions.classList.remove("hidden");
            scrollBoxQuiz.scroll(0, 0);
            windowContentQuestions.style.opacity = "1";
            break;
        default:
            console.log("default");
            break;
    }
}
function getQuizQuestions() {
    let quizArrayTemp = [];
    data.questions.forEach((question) => {
        quizArrayTemp.push([question.question, question.key || false]);
    });
    let currentIndex = quizArrayTemp.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * quizArrayTemp.length);
        currentIndex--;
        [quizArrayTemp[currentIndex], quizArrayTemp[randomIndex]] = [
            quizArrayTemp[randomIndex],
            quizArrayTemp[currentIndex],
        ];
    }
    return quizArrayTemp;
}
function windowSwitchTerms() {
    let windowContentTerms = document.getElementById("windowContentTerms");
    let windowContentQuestions = document.getElementById("windowContentQuestions");
    let scrollBoxTerms = document.getElementById("scrollBoxText");
    let next = document.getElementById("next");
    windowContentQuestions.classList.add("hidden");
    windowContentQuestions.style.opacity = "0";
    windowContentTerms.classList.remove("hidden");
    (minute = 0), (second = 10);
    next.textContent = "Wait";
    next.setAttribute("disabled", "");
    scrollBoxTerms.scroll(0, 0);
    document.getElementsByClassName("wrong").item(0).style.opacity = "1";
    next.addEventListener("click", windowSwitchTerms);
    scrollBoxTerms.addEventListener("scroll", startCountdown);
    windowContentTerms.style.opacity = "1";
}
function windowSwitchQuiz() {
    let windowContentTerms = document.getElementById("windowContentTerms");
    let windowContentQuestions = document.getElementById("windowContentQuestions");
    let scrollBoxQuiz = document.getElementById("scrollBoxQuiz");
    let next = document.getElementById("next");
    next.removeEventListener("click", windowSwitchTerms);
    quizArray = getQuizQuestions();
    for (let i = 0; i < quizArray.length; i++) {
        let parentElement = document.getElementById('scrollBoxQuiz');
        let mainElement = document.createElement('div');
        let inputElement = document.createElement('input');
        let labelElement = document.createElement('label');
        if (i == 0) {
            mainElement.style.display = "grid";
            mainElement.style.gridTemplateColumns = "min-content auto";
            mainElement.style.alignItems = "center";
            mainElement.style.marginTop = "18px";
        }
        if (i > 0) {
            mainElement.classList.add('quizClass');
        }
        inputElement.setAttribute('type', 'checkbox');
        inputElement.setAttribute('name', 'quiz');
        inputElement.setAttribute('id', 'question' + i.toString());
        labelElement.setAttribute('for', 'question' + i.toString());
        labelElement.textContent = quizArray[i][0];
        mainElement.appendChild(inputElement);
        mainElement.appendChild(labelElement);
        parentElement.appendChild(mainElement);
        console.log(mainElement);
    }
    windowContentTerms.classList.add("hidden");
    windowContentTerms.style.opacity = "0";
    windowContentQuestions.classList.remove("hidden");
    scrollBoxQuiz.scroll(0, 0);
    windowContentQuestions.style.opacity = "1";
}
// TODO: make it so that the checkboxes are reset, and finnish it so that it actually works
document.getElementById("scrollBoxText").addEventListener("scroll", startCountdown);
document.getElementById("verifyButton").addEventListener("click", () => {
    let checkboxes = document.querySelectorAll('input[name="quiz"]');
    console.log('checking results');
    for (let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes.item(i);
        if (checkbox.checked != quizArray[i][1]) {
            console.log(checkbox.checked, quizArray[i][1]);
            windowSwitchTerms();
        }
    }
});
recenterWindow();

},{"../json/quiz.json":1}]},{},[2]);
