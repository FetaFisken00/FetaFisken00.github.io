(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
    "questions": [
        {
            "question": "We constantly review or systems and data to ensure the best possible service to our customers.",
            "key": true
        },
        {
            "question": "Wipers are a part of cars, on the windshield.",
            "key:": false
        },
        {
            "question": "We will investigate any such actions that break the terms and conditions with a view to prosecuting and/or taking civil proceedings to recover damages against those responsible.",
            "key:": false
        },
        {
            "question": "All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process  of our assistance to the Client in the most appropriate manner, whereby  formal meetings of a fixed duration, or any other means, for the express purpose of meeting the Client's needs in respect of provision of the  Company's stated services/products.",
            "key:": false
        },
        {
            "question": "We will not sell, share, or rent your personal information to any third party or use your e-mail address for unsolicited mail.",
            "key:": false
        },
        {
            "question": "We are registered under the Data Protection Act 1998 and as such, any information concerning the Client and their respective Client records may be passed to third parties.",
            "key:": false
        },
        {
            "question": "Both the Client and ourselves have the right to eliminate any services Agreement for any reason. including the  ending of services that are already underway",
            "key:": false
        },
        {
            "question": "The information on this web site is provided on an 'as is' basis",
            "key:": false
        },
        {
            "question": "We do not monitor or view the content of other party's websites which are linked from this website",
            "key:": false
        },
        {
            "question": "Cash or Personal Cheque with Bankers Card, all major Credit/Debit Cards. Bankers Draft or BACH Transfer are all acceptable methods of payment",
            "key:": false
        },
        {
            "question": "returned cheques will incur a 25€ charge to cover banking fees and administrative costs. In an instance of a second return cheque, we reserve the right to terminate the agreement and, if agreed to, we shall insist on future cash transactions only",
            "key:": false
        },
        {
            "question": "Copyright and other irrelevant intellectual property rights exists on all text relating the Company's services and the full context of this website",
            "key:": false
        },
        {
            "question": "Neither party shall be liable to the other for any failure to preform any obligation under any Agreement which is du to an event beyond control of such party including but not limited to any Act of god, terrorism, car, Political insurgence, insurrection, riot , either party's bed time, civil unrest, civil war, act of civil or military authority uprising, earthquake, flood, your mom or any other natural or man made eventually outside oru controls, which causes the termination of an agreement or contract entered into, nor which could have been reasonable forseen, excluding climate change but not limited to climate change.",
            "key:": false
        },
        {
            "question": "The laws of Kingdom of Sweden govern these terms and conditions. By accessing this website you consent to these terms and conditions and to the exclusive jurisdiction of the Swedish courts in all disputes arising out of such access. If any of these terms are deemed invalid or unforeseeable for any reason (including but not limited to the exclusions)",
            "key:": false
        },
        {
            "question": "The company reserves the right to change these conditions from time to time as it sees fit and your continued use of the site will signify your acceptance of any adjustments to these terms",
            "key:": false
        },
        {
            "question": "If there are any changes to our privacy policy, we will announce that these changes have been made on our home page and on other key pages on our site. If there are any changes in how we use our site customers' Personally identifiable information, notification by e-mail or postal mail will be made to those affected by this change.",
            "key:": false
        },
        {
            "question": "Agencies and/or through the Small Claims Court in the event that the outstanding balance does not exceeded 3000€. In such circumstances, you shall be liable for any and all additional administrative and/or court costs.",
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
const data = __importStar(require("../json/quiz copy.json"));
let minute = 0, second = 10;
let howLongIsASecondInMS = 100;
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
                    next.addEventListener("click", switchWindow);
                }, howLongIsASecondInMS);
            }
        }, howLongIsASecondInMS);
    }
}
// TODO: Split this function into two function for readability
function switchWindow() {
    let windowContentTerms = document.getElementById("windowContentTerms");
    let windowContentQuestions = document.getElementById("windowContentQuestions");
    let scrollBoxText = document.getElementById("scrollBoxText");
    let scrollBoxQuiz = document.getElementById("scrollBoxQuiz");
    let next = document.getElementById("next");
    switch ("hidden") {
        case windowContentTerms.className: // i.e switch to Terms
            console.log("terms");
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
        case windowContentQuestions.className: // i.e switch to questions
            document.getElementById("next").removeEventListener("click", switchWindow);
            let labels = document.querySelectorAll("label");
            let quizArray = getQuizQuestions();
            console.log(quizArray);
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
    let quizArray = [];
    data.questions.forEach((question) => {
        quizArray.push([question.question, question.key]);
    });
    let currentIndex = quizArray.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * quizArray.length);
        currentIndex--;
        [quizArray[currentIndex], quizArray[randomIndex]] = [
            quizArray[randomIndex],
            quizArray[currentIndex],
        ];
    }
    return quizArray;
}
document.getElementById("scrollBoxText").addEventListener("scroll", startCountdown);
document.getElementById("verifyButton").addEventListener("click", () => {
    let checkboxes = document.querySelectorAll('input[name="quiz"]');
    // TODO: Make it so that the all the questions in quiz.json also has a true/false attribute so that the for-loop below can check if the person answered correctly.
    for (let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes.item(i);
        //console.log(checkbox.id, checkbox.checked)
    }
    // TODO: As part of the above TODO change this if statement so its isn't just false
    if (true) {
        switchWindow();
    }
});
recenterWindow();

},{"../json/quiz copy.json":1}]},{},[2]);
