(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
    "questions": [
        "We constantly review or systems and data to ensure the best possible service to our customers.",
        "Wipers are a part of cars, on the windshield.",
        "We will investigate any such actions that break the terms and conditions with a view to prosecuting and/or taking civil proceedings to recover damages against those responsible.",
        "All terms refer to the offer, accaptance and colnsideration of payment necessary to undertake the process  of our assistance to the Client in the most appropirate manner, whereby  fomal meetings of a fixed duration, or any other means, for the express purpose of meeting the Client's needs in respect of provision of the  Company's stated services/products.",
        "We will not sell, share, or rent your personal information to any third party or use your e-mail adress for unsoliciting mail.",
        "We are registerd under the Data Protection Act 1998 and as such, any infomration concerning the Client and their respective Client records may be passed to third parties.",
        "Both the Client and ourselves have the right to eliminate any services Agreement for any reason. including the  ending of services that are already underway",
        "The information on this web site is provided on an 'as is' basis",
        "We do not monitor or ewview the content of other party's websites which are linked from this website",
        "Cash or Personal Cheque with Bankers Card, all major Credit/Debit Cards. Bankers Draft or BACS Transfer are all accapteable methods of payment",
        "returned cheques will incur a 25€ charce to cover banking fees and administrative costs. In an instance of a second return cheque, we reserve the right to terminate the agreement and, if agreed to, we shall inist on future cash transactions only",
        "Copyright and other irrelevant intellectual property rights exists on all text relating the Company's services and the full context of this website",
        "Neither party shall be liable to the other for any faliure to preform any obligation under any Agreement which is du to an event beyond control of such party including but not limited to any Act of god, terrorism, car, Political insurgence, insurrection, riot , either partys bed time, civil unrest, civil war, act of civil or military authority uprising, earthquake, flood, your mom or any other natual or man made eventually outside oru controll, which causes the termination of an agreement or contract enterd into, nor which could have been reasonable forseen, excluding climate change but not limited to chlimate change.",
        "The laws of Kingdom of Sweden govern these terms and conditions. By acessing this website you consent to these terms and conditions and to the exclusive juristiction of the Swedish courts in all disputes arising out of such access. If any of these terms are deemed invalid or unenforeable for any reason (including but not limited to the exclusions)",
        "The company reserves the right to change these conditions from time to time as it sees fit and your continuted use of the site will signigy your acceptance of any adjustments to these terms",
        "If there are any changes to our privacy policy, we willa nnounce that these changes have been made on our home page and on other key pages on our site. If there are any changes in how we use our site customers' Åersonally identifiable information, notification by e-mail or postal mail will be made to those affected by this change.",
        "Agencies and/or through the Small Claims Court in the event that the outstanding balance does not exceeed 3000€. In such circumstances, you shall be liable for any and all aditional administrative and/or court costs."
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
let minute = 0, second = 5;
let quizQuestions = [];
dragElement(document.getElementById('window'));
function recenterWindow() {
    document.getElementById('window').style.left = (document.documentElement.clientWidth / 2) - document.getElementById('window').offsetWidth / 2 + "px";
    document.getElementById('window').style.top = (document.documentElement.clientHeight / 2) - document.getElementById('window').offsetHeight / 2 + "px";
}
function dragElement(elemt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elemt.id + "Header")) {
        /*
        if present, the header is where you move the DIV from:
        */
        document.getElementById(elemt.id + "Header").addEventListener('mousedown', dragMouseDown);
    }
    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.addEventListener('mouseup', closeDragElement);
        document.addEventListener('mousemove', elementDrag);
    }
    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        if (elemt.offsetTop - pos2 > 0 && elemt.offsetHeight + elemt.offsetTop - pos2 < document.documentElement.clientHeight) {
            elemt.style.top = (elemt.offsetTop - pos2) + "px";
        }
        if (elemt.offsetLeft - pos1 > 0 && elemt.offsetLeft + elemt.offsetWidth - pos1 < document.documentElement.clientWidth) {
            elemt.style.left = (elemt.offsetLeft - pos1) + "px";
        }
        if (elemt.offsetHeight + elemt.offsetTop - pos2 > document.documentElement.clientHeight + 100 || elemt.offsetLeft + elemt.offsetWidth - pos1 > document.documentElement.clientWidth + 100) {
            elemt.style.left = 0 + "px";
            elemt.style.top = 0 + "px";
        }
    }
    function closeDragElement() {
        document.removeEventListener('mouseup', closeDragElement);
        document.removeEventListener('mousemove', elementDrag);
    }
}
;
function startCountdown() {
    // TODO: Try to use Element.scrollTopMax 
    let next = document.getElementById('next');
    let scrollBoxText = document.getElementById('scrollBoxText');
    console.log('SROLLING :)');
    if (scrollBoxText.scrollTop + 25 > scrollBoxText.scrollHeight - scrollBoxText.clientHeight) {
        next.textContent = `Wait ${minute}:0${second}`;
        scrollBoxText.removeEventListener('scroll', startCountdown);
        let intervalID = setInterval(() => {
            if (second == 0 && minute > 0) {
                second = 59;
                minute -= 1;
            }
            else if (second > 0) {
                second -= 1;
            }
            if (second < 10) {
                (next.textContent = `Wait ${minute}:0${second}`);
            }
            else {
                (next.textContent = `Wait ${minute}:${second}`);
            }
            if (next.textContent == 'Wait 0:00') {
                clearInterval(intervalID);
                setTimeout(() => {
                    next.textContent = 'Next >';
                    next.removeAttribute('disabled');
                    next.addEventListener('click', switchWindow);
                }, 100);
            }
        }, 100);
    }
}
function switchWindow() {
    let windowContentTerms = document.getElementById('windowContentTerms');
    let windowContentQuestions = document.getElementById('windowContentQuestions');
    let scrollBoxText = document.getElementById('scrollBoxText');
    let scrollBoxQuiz = document.getElementById('scrollBoxQuiz');
    let next = document.getElementById('next');
    switch ('hidden') {
        case (windowContentTerms.className): // i.e switch to Terms
            console.log('terms');
            windowContentQuestions.classList.add('hidden');
            windowContentQuestions.style.opacity = "0";
            windowContentTerms.classList.remove('hidden');
            minute = 0, second = 5;
            next.textContent = 'Wait';
            next.setAttribute('disabled', '');
            scrollBoxText.scroll(0, 0);
            document.getElementsByClassName('wrong').item(0).style.opacity = "1";
            next.addEventListener('click', switchWindow);
            scrollBoxText.addEventListener('scroll', startCountdown);
            windowContentTerms.style.opacity = "1";
            break;
        case (windowContentQuestions.className): // i.e switch to questions
            console.log('questiozns');
            document.getElementById('next').removeEventListener('click', switchWindow);
            let labels = document.querySelectorAll('label');
            let quizQuestions = getQuizQuestions();
            for (let i = 0; i < labels.length; i++) {
                let label = labels.item(i);
                try {
                    label.innerText = quizQuestions.pop();
                }
                catch (error) {
                    console.log(error);
                }
            }
            windowContentTerms.classList.add('hidden');
            windowContentTerms.style.opacity = "0";
            windowContentQuestions.classList.remove('hidden');
            scrollBoxQuiz.scroll(0, 0);
            windowContentQuestions.style.opacity = "1";
            break;
        default:
            console.log('default');
            break;
    }
}
function getQuizQuestions() {
    let quizQuestions = [];
    data.questions.forEach(question => quizQuestions.push(question));
    let currentIndex = quizQuestions.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * quizQuestions.length);
        currentIndex--;
        [quizQuestions[currentIndex], quizQuestions[randomIndex]] = [quizQuestions[randomIndex], quizQuestions[currentIndex]];
    }
    return quizQuestions;
}
document.getElementById('scrollBoxText').addEventListener('scroll', startCountdown);
document.getElementById('verifyButton').addEventListener('click', () => {
    let checkboxes = document.querySelectorAll('input[name="quiz"]');
    // TODO: Make it so that the all the questions in quiz.json also has a true/false attribute so that the forloop below can check if the person answerd correctly. 
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

},{"../json/quiz.json":1}]},{},[2]);
