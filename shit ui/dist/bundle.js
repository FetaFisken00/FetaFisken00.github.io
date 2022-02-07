(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
    "questions": [
        {
            "question": "We constantly review or systems and data to ensure the best possible service to our customers.",
            "key": false
        },
        {
            "question": "We will not sell, share, or rent your personal information to any third party or use your e-mail address for unsolicited mail",
            "key": false
        },
        {
            "question": "The information on this web site is provided on an 'as is' basis",
            "key": true
        },
        {
            "question": "We do not monitor or review the content of other party's browsing habits which are linked from this application",
            "key": false
        },
        {
            "question": "Copyright and other relevant intellectual property rights exists on all text relating the Company's services and the full context of this application",
            "key": true
        },
        {
            "question": "The company reserves the right to change these conditions from time to time as it sees fit and your continued use of the site will signify your acceptance of any adjustments to these terms",
            "key": true
        },
        {
            "question":"We recognize Chinese Taipei as a separate nation",
            "key": false
        },
        {
            "question": "Agencies and/or through the Small Claims Court in the event that the outstanding balance does not exceeded 3000€. In such circumstances, you shall be liable for any and all additional administrative and/or court costs",
            "key": false
        },
        {
            "question": "This application logs the following but not limited to the following; stores banking information, key-logs, webcam feed if available, biometric data, pornographic preferences, location data and ip-address.",
            "key": true
        },
        {
            "question": "We at [company name] values our customers privacy and is of our outmost importance",
            "key": false
        },
        {
            "question": "publicly performing and/or showing software content and using the application after bed time are two disallowed use cases of the application in question",
            "key": false
        },
        {
            "question": "Humans under the age of 13, more known by the name 'those things' can use the application",
            "key": false
        },
        {
            "question": "Do 'those things' have the same rights as people over the age of 18",
            "key": false
        },
        {
            "question": "All the user information we collect are sent to Tchyna for free because of our generous sponsors that in no way have anything to to with the Peoples republic of china",
            "key": false
        },
        {
            "question":"Installing the application is the same as accepting the ToU",
            "key": true
        },
        {
            "question":"God is an important part of our values",
            "key": true
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
let time = 150, timeIncrement = 150, howLongIsASecondInMS = 1000;
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
function incrementTimer() {
    let seconds = 0, minutes = 0;
    let timeTemp = time;
    while (timeTemp >= 60) {
        timeTemp -= 60;
        minutes++;
    }
    seconds = timeTemp;
    if (minutes <= 60) {
        time += timeIncrement;
    }
    console.log("within incrementTimer", minutes, seconds);
    return [seconds, minutes];
}
function startCountdown() {
    let next = document.getElementById("next");
    let scrollBoxText = document.getElementById("scrollBoxText");
    if (scrollBoxText.scrollTop + 25 > scrollBoxText.scrollHeight - scrollBoxText.clientHeight) {
        let [seconds, minutes] = incrementTimer();
        if (seconds < 10) {
            next.textContent = `Wait ${minutes}:0${seconds}`;
        }
        else {
            next.textContent = `Wait ${minutes}:${seconds}`;
        }
        scrollBoxText.removeEventListener("scroll", startCountdown);
        let intervalID = setInterval(() => {
            if (seconds == 0 && minutes > 0) {
                seconds = 59;
                minutes -= 1;
            }
            else if (seconds > 0) {
                seconds -= 1;
            }
            if (seconds < 10) {
                next.textContent = `Wait ${minutes}:0${seconds}`;
            }
            else {
                next.textContent = `Wait ${minutes}:${seconds}`;
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
function getQuizQuestions() {
    let quizArrayTemp = [];
    data.questions.forEach((questionData) => {
        quizArrayTemp.push([questionData.question, questionData.key]);
    });
    let currentIndex = quizArrayTemp.length;
    let randomIndex;
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
    next.textContent = "Wait";
    next.setAttribute("disabled", "");
    scrollBoxTerms.scroll(0, 0);
    document.getElementsByClassName("wrong").item(0).style.opacity = "1";
    next.addEventListener("click", windowSwitchTerms);
    scrollBoxTerms.addEventListener("scroll", startCountdown);
    windowContentTerms.style.opacity = "1";
}
function winEvent() {
    document.getElementById("window").style.opacity = "0";
}
function windowSwitchQuiz() {
    let windowContentTerms = document.getElementById("windowContentTerms");
    let windowContentQuestions = document.getElementById("windowContentQuestions");
    let scrollBoxQuiz = document.getElementById("scrollBoxQuiz");
    let next = document.getElementById("next");
    next.removeEventListener("click", windowSwitchTerms);
    quizArray = getQuizQuestions();
    while (scrollBoxQuiz.firstChild) {
        scrollBoxQuiz.removeChild(scrollBoxQuiz.firstChild);
    }
    for (let i = 0; i < quizArray.length; i++) {
        let parentElement = document.getElementById("scrollBoxQuiz");
        let mainElement = document.createElement("div");
        let inputElement = document.createElement("input");
        let labelElement = document.createElement("label");
        if (i == 0) {
            mainElement.style.display = "grid";
            mainElement.style.gridTemplateColumns = "min-content auto";
            mainElement.style.alignItems = "center";
            mainElement.style.marginTop = "18px";
        }
        if (i > 0) {
            mainElement.classList.add("quizClass");
        }
        inputElement.setAttribute("type", "checkbox");
        inputElement.setAttribute("name", "quiz");
        inputElement.setAttribute("id", "question" + i.toString());
        labelElement.setAttribute("for", "question" + i.toString());
        labelElement.textContent = quizArray[i][0];
        mainElement.appendChild(inputElement);
        mainElement.appendChild(labelElement);
        parentElement.appendChild(mainElement);
    }
    windowContentTerms.classList.add("hidden");
    windowContentTerms.style.opacity = "0";
    windowContentQuestions.classList.remove("hidden");
    scrollBoxQuiz.scroll(0, 0);
    windowContentQuestions.style.opacity = "1";
    document.getElementById("verifyButton").addEventListener("click", verifyInput);
}
function verifyInput() {
    let checkboxes = document.querySelectorAll('input[name="quiz"]');
    let thing = "0";
    console.log(quizArray);
    for (let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes.item(i);
        console.log(i, checkbox.checked);
        if (checkbox.checked != quizArray[i][1]) {
            console.log("CONDITION FULFILLED! i.e you chose the wrong answer", i);
            thing = "1";
            windowSwitchTerms();
            break;
        }
    }
    if (thing == "0") {
        winEvent();
    }
    document.getElementById("verifyButton").removeEventListener("click", verifyInput);
}
document.getElementById("scrollBoxText").addEventListener("scroll", startCountdown);
document.getElementById("print").addEventListener("click", () => window.print());
recenterWindow();

},{"../json/quiz.json":1}]},{},[2]);
