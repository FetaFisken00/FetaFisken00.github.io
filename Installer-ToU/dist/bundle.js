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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const data = __importStar(require("../json/quiz.json"));
let time = 150, timeIncrement = 150, howLongIsASecondInMS = 1000;
let quizArray = [];
let intervalID;
let skipKey = '';
dragElement(document.getElementById("window"));
window.addEventListener("resize", fitWindowToScreen);
(_a = document.getElementById("exit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", fitWindowToScreen);
document.addEventListener("keypress", skipTimer);
function skipTimer(e) {
    let next = document.getElementById("next");
    console.log("test".charAt(0));
    if ("idiot".charAt(skipKey.length) != e.key.toLowerCase()) {
        skipKey = '';
        return;
    }
    skipKey += e.key.toLowerCase();
    console.log(skipKey);
    if (skipKey == "idiot") {
        console.log('SKIPÅ!!!!');
        skipKey = '';
        clearInterval(intervalID);
        next.textContent = "Next >";
        next.removeAttribute("disabled");
        next.addEventListener("click", windowSwitchQuiz);
    }
}
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
    document.getElementById(windowElem.id + "Header").addEventListener("mousedown", dragMouseDown);
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
        document.getElementById(windowElem.id + "Header").onmouseup = function () {
            fitWindowToScreen();
            return;
        };
        // If cursor is within the window, X-axis
        if (e.clientX < -1 || e.clientX > document.documentElement.clientWidth + 1) {
            console.log(document.documentElement.clientWidth);
            fitWindowToScreen();
            return;
        }
        // If cursor is within window, Y-axis
        if (e.clientY < 0 || e.clientY > document.documentElement.clientHeight + 1) {
            fitWindowToScreen();
            return;
        }
        // Move y-axis and x-axis
        windowElem.style.top = windowElem.offsetTop - pos2 + "px";
        windowElem.style.left = windowElem.offsetLeft - pos1 + "px";
    }
    function closeDragElement() {
        document.removeEventListener("mouseup", closeDragElement);
        document.removeEventListener("mousemove", elementDrag);
    }
}
function fitWindowToScreen() {
    let windowElem = document.getElementById("window");
    // If its outside the window to the top
    if (1 > windowElem.offsetTop) {
        // console.log("1px")
        windowElem.style.top = "1px";
    }
    // If its outside the window to the right
    if (1 > document.documentElement.clientWidth - (windowElem.offsetLeft + windowElem.offsetWidth)) {
        // console.log(document.documentElement.clientWidth - windowElem.offsetWidth - 1 + "px")
        windowElem.style.left = document.documentElement.clientWidth - windowElem.offsetWidth - 1 + "px";
    }
    // If its outside the window to the bottom
    if (1 > document.documentElement.clientHeight - (windowElem.offsetTop + windowElem.offsetHeight)) {
        // console.log(document.documentElement.clientHeight - windowElem.offsetHeight - 1 + "px")
        windowElem.style.top = document.documentElement.clientHeight - windowElem.offsetHeight - 1 + "px";
    }
    // If its outside the window to the left
    if (1 > windowElem.offsetLeft) {
        // console.log("1px")
        windowElem.style.left = "1px";
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
        intervalID = setInterval(() => {
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
    let verifyButton = document.getElementById("verifyButton");
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
    verifyButton.addEventListener("click", verifyInput);
}
function verifyInput() {
    let checkboxes = document.querySelectorAll('input[name="quiz"]');
    let verifyButton = document.getElementById("verifyButton");
    for (let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes.item(i);
        console.log(checkbox.checked, quizArray[i][1]);
        if (checkbox.checked != quizArray[i][1]) {
            windowSwitchTerms();
            return;
        }
        if (i == checkboxes.length - 1) {
            winEvent();
        }
    }
    verifyButton.removeEventListener("click", verifyInput);
}
document.getElementById("scrollBoxText").addEventListener("scroll", startCountdown);
document.getElementById("print").addEventListener("click", () => window.print());
recenterWindow();
},{"../json/quiz.json":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc29uL3F1aXouanNvbiIsInNyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkVBLHdEQUEwQztBQUUxQyxJQUFJLElBQUksR0FBVyxHQUFHLEVBQ2xCLGFBQWEsR0FBVyxHQUFHLEVBQzNCLG9CQUFvQixHQUFXLElBQUksQ0FBQztBQUN4QyxJQUFJLFNBQVMsR0FBVSxFQUFFLENBQUM7QUFDMUIsSUFBSSxVQUFrQixDQUFBO0FBQ3RCLElBQUksT0FBTyxHQUFXLEVBQUUsQ0FBQztBQUV6QixXQUFXLENBQWMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQzVELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUNyRCxNQUFBLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLDBDQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQzlFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsU0FBUyxD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QUFFLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJtb2R1bGUuZXhwb3J0cz17XG4gICAgXCJxdWVzdGlvbnNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgICBcInF1ZXN0aW9uXCI6IFwiV2UgY29uc3RhbnRseSByZXZpZXcgb3Igc3lzdGVtcyBhbmQgZGF0YSB0byBlbnN1cmUgdGhlIGJlc3QgcG9zc2libGUgc2VydmljZSB0byBvdXIgY3VzdG9tZXJzLlwiLFxuICAgICAgICAgICAgXCJrZXlcIjogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJxdWVzdGlvblwiOiBcIldlIHdpbGwgbm90IHNlbGwsIHNoYXJlLCBvciByZW50IHlvdXIgcGVyc29uYWwgaW5mb3JtYXRpb24gdG8gYW55IHRoaXJkIHBhcnR5IG9yIHVzZSB5b3VyIGUtbWFpbCBhZGRyZXNzIGZvciB1bnNvbGljaXRlZCBtYWlsXCIsXG4gICAgICAgICAgICBcImtleVwiOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcInF1ZXN0aW9uXCI6IFwiVGhlIGluZm9ybWF0aW9uIG9uIHRoaXMgd2ViIHNpdGUgaXMgcHJvdmlkZWQgb24gYW4gJ2FzIGlzJyBiYXNpc1wiLFxuICAgICAgICAgICAgXCJrZXlcIjogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcInF1ZXN0aW9uXCI6IFwiV2UgZG8gbm90IG1vbml0b3Igb3IgcmV2aWV3IHRoZSBjb250ZW50IG9mIG90aGVyIHBhcnR5J3MgYnJvd3NpbmcgaGFiaXRzIHdoaWNoIGFyZSBsaW5rZWQgZnJvbSB0aGlzIGFwcGxpY2F0aW9uXCIsXG4gICAgICAgICAgICBcImtleVwiOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcInF1ZXN0aW9uXCI6IFwiQ29weXJpZ2h0IGFuZCBvdGhlciByZWxldmFudCBpbnRlbGxlY3R1YWwgcHJvcGVydHkgcmlnaHRzIGV4aXN0cyBvbiBhbGwgdGV4dCByZWxhdGluZyB0aGUgQ29tcGFueSdzIHNlcnZpY2VzIGFuZCB0aGUgZnVsbCBjb250ZXh0IG9mIHRoaXMgYXBwbGljYXRpb25cIixcbiAgICAgICAgICAgIFwia2V5XCI6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJxdWVzdGlvblwiOiBcIlRoZSBjb21wYW55IHJlc2VydmVzIHRoZSByaWdodCB0byBjaGFuZ2UgdGhlc2UgY29uZGl0aW9ucyBmcm9tIHRpbWUgdG8gdGltZSBhcyBpdCBzZWVzIGZpdCBhbmQgeW91ciBjb250aW51ZWQgdXNlIG9mIHRoZSBzaXRlIHdpbGwgc2lnbmlmeSB5b3VyIGFjY2VwdGFuY2Ugb2YgYW55IGFkanVzdG1lbnRzIHRvIHRoZXNlIHRlcm1zXCIsXG4gICAgICAgICAgICBcImtleVwiOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwicXVlc3Rpb25cIjpcIldlIHJlY29nbml6ZSBDaGluZXNlIFRhaXBlaSBhcyBhIHNlcGFyYXRlIG5hdGlvblwiLFxuICAgICAgICAgICAgXCJrZXlcIjogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJxdWVzdGlvblwiOiBcIkFnZW5jaWVzIGFuZC9vciB0aHJvdWdoIHRoZSBTbWFsbCBDbGFpbXMgQ291cnQgaW4gdGhlIGV2ZW50IHRoYXQgdGhlIG91dHN0YW5kaW5nIGJhbGFuY2UgZG9lcyBub3QgZXhjZWVkZWQgMzAwMOKCrC4gSW4gc3VjaCBjaXJjdW1zdGFuY2VzLCB5b3Ugc2hhbGwgYmUgbGlhYmxlIGZvciBhbnkgYW5kIGFsbCBhZGRpdGlvbmFsIGFkbWluaXN0cmF0aXZlIGFuZC9vciBjb3VydCBjb3N0c1wiLFxuICAgICAgICAgICAgXCJrZXlcIjogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJxdWVzdGlvblwiOiBcIlRoaXMgYXBwbGljYXRpb24gbG9ncyB0aGUgZm9sbG93aW5nIGJ1dCBub3QgbGltaXRlZCB0byB0aGUgZm9sbG93aW5nOyBzdG9yZXMgYmFua2luZyBpbmZvcm1hdGlvbiwga2V5LWxvZ3MsIHdlYmNhbSBmZWVkIGlmIGF2YWlsYWJsZSwgYmlvbWV0cmljIGRhdGEsIHBvcm5vZ3JhcGhpYyBwcmVmZXJlbmNlcywgbG9jYXRpb24gZGF0YSBhbmQgaXAtYWRkcmVzcy5cIixcbiAgICAgICAgICAgIFwia2V5XCI6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJxdWVzdGlvblwiOiBcIldlIGF0IFtjb21wYW55IG5hbWVdIHZhbHVlcyBvdXIgY3VzdG9tZXJzIHByaXZhY3kgYW5kIGlzIG9mIG91ciBvdXRtb3N0IGltcG9ydGFuY2VcIixcbiAgICAgICAgICAgIFwia2V5XCI6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwicXVlc3Rpb25cIjogXCJwdWJsaWNseSBwZXJmb3JtaW5nIGFuZC9vciBzaG93aW5nIHNvZnR3YXJlIGNvbnRlbnQgYW5kIHVzaW5nIHRoZSBhcHBsaWNhdGlvbiBhZnRlciBiZWQgdGltZSBhcmUgdHdvIGRpc2FsbG93ZWQgdXNlIGNhc2VzIG9mIHRoZSBhcHBsaWNhdGlvbiBpbiBxdWVzdGlvblwiLFxuICAgICAgICAgICAgXCJrZXlcIjogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJxdWVzdGlvblwiOiBcIkh1bWFucyB1bmRlciB0aGUgYWdlIG9mIDEzLCBtb3JlIGtub3duIGJ5IHRoZSBuYW1lICd0aG9zZSB0aGluZ3MnIGNhbiB1c2UgdGhlIGFwcGxpY2F0aW9uXCIsXG4gICAgICAgICAgICBcImtleVwiOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcInF1ZXN0aW9uXCI6IFwiRG8gJ3Rob3NlIHRoaW5ncycgaGF2ZSB0aGUgc2FtZSByaWdodHMgYXMgcGVvcGxlIG92ZXIgdGhlIGFnZSBvZiAxOFwiLFxuICAgICAgICAgICAgXCJrZXlcIjogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJxdWVzdGlvblwiOiBcIkFsbCB0aGUgdXNlciBpbmZvcm1hdGlvbiB3ZSBjb2xsZWN0IGFyZSBzZW50IHRvIFRjaHluYSBmb3IgZnJlZSBiZWNhdXNlIG9mIG91ciBnZW5lcm91cyBzcG9uc29ycyB0aGF0IGluIG5vIHdheSBoYXZlIGFueXRoaW5nIHRvIHRvIHdpdGggdGhlIFBlb3BsZXMgcmVwdWJsaWMgb2YgY2hpbmFcIixcbiAgICAgICAgICAgIFwia2V5XCI6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwicXVlc3Rpb25cIjpcIkluc3RhbGxpbmcgdGhlIGFwcGxpY2F0aW9uIGlzIHRoZSBzYW1lIGFzIGFjY2VwdGluZyB0aGUgVG9VXCIsXG4gICAgICAgICAgICBcImtleVwiOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwicXVlc3Rpb25cIjpcIkdvZCBpcyBhbiBpbXBvcnRhbnQgcGFydCBvZiBvdXIgdmFsdWVzXCIsXG4gICAgICAgICAgICBcImtleVwiOiB0cnVlXG4gICAgICAgIH1cbiAgICBdXG59IiwiaW1wb3J0ICogYXMgZGF0YSBmcm9tIFwiLi4vanNvbi9xdWl6Lmpzb25cIjtcblxubGV0IHRpbWU6IG51bWJlciA9IDE1MCxcbiAgICB0aW1lSW5jcmVtZW50OiBudW1iZXIgPSAxNTAsXG4gICAgaG93TG9uZ0lzQVNlY29uZEluTVM6IG51bWJlciA9IDEwMDA7XG5sZXQgcXVpekFycmF5OiBhbnlbXSA9IFtdO1xubGV0IGludGVydmFsSUQ6IG51bWJlclxubGV0IHNraXBLZXk6IHN0cmluZyA9ICcnO1xuXG5kcmFnRWxlbWVudCg8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5kb3dcIikpO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZml0V2luZG93VG9TY3JlZW4pO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleGl0XCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZml0V2luZG93VG9TY3JlZW4pO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIHNraXBUaW1lcilcblxuZnVuY3Rpb24gc2tpcFRpbWVyKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBsZXQgbmV4dCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5leHRcIik7XG4gICAgY29uc29sZS5sb2coXCJ0ZXN0XCIuY2hhckF0KDApKVxuICAgIGlmIChcImlkaW90XCIuY2hhckF0KHNraXBLZXkubGVuZ3RoKSAhPSBlLmtleS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgIHNraXBLZXkgPSAnJztcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHNraXBLZXkgKz0gZS5rZXkudG9Mb3dlckNhc2UoKVxuICAgIGNvbnNvbGUubG9nKHNraXBLZXkpXG4gICAgaWYgKHNraXBLZXkgPT0gXCJpZGlvdFwiKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTS0lQw4UhISEhJylcbiAgICAgICAgc2tpcEtleSA9ICcnXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJRCk7XG4gICAgICAgIG5leHQudGV4dENvbnRlbnQgPSBcIk5leHQgPlwiO1xuICAgICAgICBuZXh0LnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICBuZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB3aW5kb3dTd2l0Y2hRdWl6KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlY2VudGVyV2luZG93KCkge1xuICAgICg8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5kb3dcIikpLnN0eWxlLmxlZnQgPVxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggLyAyIC1cbiAgICAgICAgKDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbmRvd1wiKSkub2Zmc2V0V2lkdGggLyAyICtcbiAgICAgICAgXCJweFwiO1xuICAgICg8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5kb3dcIikpLnN0eWxlLnRvcCA9XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLyAyIC1cbiAgICAgICAgKDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbmRvd1wiKSkub2Zmc2V0SGVpZ2h0IC8gMiArXG4gICAgICAgIFwicHhcIjtcbn1cblxuZnVuY3Rpb24gZHJhZ0VsZW1lbnQod2luZG93RWxlbTogSFRNTEVsZW1lbnQpIHtcbiAgICBsZXQgcG9zMSA9IDAsXG4gICAgICAgIHBvczIgPSAwLFxuICAgICAgICBwb3MzID0gMCxcbiAgICAgICAgcG9zNCA9IDA7XG4gICAgKDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh3aW5kb3dFbGVtLmlkICsgXCJIZWFkZXJcIikpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZHJhZ01vdXNlRG93bik7XG5cbiAgICBmdW5jdGlvbiBkcmFnTW91c2VEb3duKGU6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBwb3MzID0gZS5jbGllbnRYO1xuICAgICAgICBwb3M0ID0gZS5jbGllbnRZO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBjbG9zZURyYWdFbGVtZW50KTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBlbGVtZW50RHJhZyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZWxlbWVudERyYWcoZTogTW91c2VFdmVudCkge1xuICAgICAgIFxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHBvczEgPSBwb3MzIC0gZS5jbGllbnRYO1xuICAgICAgICBwb3MyID0gcG9zNCAtIGUuY2xpZW50WTtcbiAgICAgICAgcG9zMyA9IGUuY2xpZW50WDtcbiAgICAgICAgcG9zNCA9IGUuY2xpZW50WTtcbiAgICAgICAgXG4gICAgICAgICg8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQod2luZG93RWxlbS5pZCArIFwiSGVhZGVyXCIpKS5vbm1vdXNldXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZpdFdpbmRvd1RvU2NyZWVuKClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIElmIGN1cnNvciBpcyB3aXRoaW4gdGhlIHdpbmRvdywgWC1heGlzXG4gICAgICAgIGlmIChlLmNsaWVudFggPCAtMSB8fCBlLmNsaWVudFggPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggKyAxKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpXG4gICAgICAgICAgICBmaXRXaW5kb3dUb1NjcmVlbigpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIGN1cnNvciBpcyB3aXRoaW4gd2luZG93LCBZLWF4aXNcbiAgICAgICAgaWYgKGUuY2xpZW50WSA8IDAgfHwgZS5jbGllbnRZID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCArIDEpIHtcbiAgICAgICAgICAgIGZpdFdpbmRvd1RvU2NyZWVuKClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cblxuICAgICAgICAvLyBNb3ZlIHktYXhpcyBhbmQgeC1heGlzXG4gICAgICAgIHdpbmRvd0VsZW0uc3R5bGUudG9wID0gd2luZG93RWxlbS5vZmZzZXRUb3AgLSBwb3MyICsgXCJweFwiO1xuICAgICAgICB3aW5kb3dFbGVtLnN0eWxlLmxlZnQgPSB3aW5kb3dFbGVtLm9mZnNldExlZnQgLSBwb3MxICsgXCJweFwiO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlRHJhZ0VsZW1lbnQoKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGNsb3NlRHJhZ0VsZW1lbnQpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGVsZW1lbnREcmFnKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZpdFdpbmRvd1RvU2NyZWVuKCkge1xuICAgIGxldCB3aW5kb3dFbGVtID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZG93XCIpO1xuXG4gICAgLy8gSWYgaXRzIG91dHNpZGUgdGhlIHdpbmRvdyB0byB0aGUgdG9wXG4gICAgaWYgKDEgPiB3aW5kb3dFbGVtLm9mZnNldFRvcCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIjFweFwiKVxuICAgICAgICB3aW5kb3dFbGVtLnN0eWxlLnRvcCA9IFwiMXB4XCI7XG4gICAgfVxuXG4gICAgLy8gSWYgaXRzIG91dHNpZGUgdGhlIHdpbmRvdyB0byB0aGUgcmlnaHRcbiAgICBpZiAoMSA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAtICh3aW5kb3dFbGVtLm9mZnNldExlZnQgKyB3aW5kb3dFbGVtLm9mZnNldFdpZHRoKSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggLSB3aW5kb3dFbGVtLm9mZnNldFdpZHRoIC0gMSArIFwicHhcIilcbiAgICAgICAgd2luZG93RWxlbS5zdHlsZS5sZWZ0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIC0gd2luZG93RWxlbS5vZmZzZXRXaWR0aCAtIDEgKyBcInB4XCI7XG4gICAgfVxuXG4gICAgLy8gSWYgaXRzIG91dHNpZGUgdGhlIHdpbmRvdyB0byB0aGUgYm90dG9tXG4gICAgaWYgKDEgPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gKHdpbmRvd0VsZW0ub2Zmc2V0VG9wICsgd2luZG93RWxlbS5vZmZzZXRIZWlnaHQpKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLSB3aW5kb3dFbGVtLm9mZnNldEhlaWdodCAtIDEgKyBcInB4XCIpXG4gICAgICAgIHdpbmRvd0VsZW0uc3R5bGUudG9wID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtIHdpbmRvd0VsZW0ub2Zmc2V0SGVpZ2h0IC0gMSArIFwicHhcIjtcbiAgICB9XG5cbiAgICAvLyBJZiBpdHMgb3V0c2lkZSB0aGUgd2luZG93IHRvIHRoZSBsZWZ0XG4gICAgaWYgKDEgPiB3aW5kb3dFbGVtLm9mZnNldExlZnQpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIxcHhcIilcbiAgICAgICAgd2luZG93RWxlbS5zdHlsZS5sZWZ0ID0gXCIxcHhcIjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluY3JlbWVudFRpbWVyKCk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgIGxldCBzZWNvbmRzOiBudW1iZXIgPSAwLFxuICAgICAgICBtaW51dGVzOiBudW1iZXIgPSAwO1xuICAgIGxldCB0aW1lVGVtcCA9IHRpbWU7XG4gICAgd2hpbGUgKHRpbWVUZW1wID49IDYwKSB7XG4gICAgICAgIHRpbWVUZW1wIC09IDYwO1xuICAgICAgICBtaW51dGVzKys7XG4gICAgfVxuICAgIHNlY29uZHMgPSB0aW1lVGVtcDtcbiAgICBpZiAobWludXRlcyA8PSA2MCkge1xuICAgICAgICB0aW1lICs9IHRpbWVJbmNyZW1lbnQ7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwid2l0aGluIGluY3JlbWVudFRpbWVyXCIsIG1pbnV0ZXMsIHNlY29uZHMpO1xuICAgIHJldHVybiBbc2Vjb25kcywgbWludXRlc107XG59XG5cbmZ1bmN0aW9uIHN0YXJ0Q291bnRkb3duKCkge1xuICAgIGxldCBuZXh0ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV4dFwiKTtcbiAgICBsZXQgc2Nyb2xsQm94VGV4dCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjcm9sbEJveFRleHRcIik7XG5cbiAgICBpZiAoc2Nyb2xsQm94VGV4dC5zY3JvbGxUb3AgKyAyNSA+IHNjcm9sbEJveFRleHQuc2Nyb2xsSGVpZ2h0IC0gc2Nyb2xsQm94VGV4dC5jbGllbnRIZWlnaHQpIHtcbiAgICAgICAgbGV0IFtzZWNvbmRzLCBtaW51dGVzXSA9IGluY3JlbWVudFRpbWVyKCk7XG4gICAgICAgIGlmIChzZWNvbmRzIDwgMTApIHtcbiAgICAgICAgICAgIG5leHQudGV4dENvbnRlbnQgPSBgV2FpdCAke21pbnV0ZXN9OjAke3NlY29uZHN9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHQudGV4dENvbnRlbnQgPSBgV2FpdCAke21pbnV0ZXN9OiR7c2Vjb25kc31gO1xuICAgICAgICB9XG4gICAgICAgIHNjcm9sbEJveFRleHQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBzdGFydENvdW50ZG93bik7XG4gICAgICAgIGludGVydmFsSUQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2Vjb25kcyA9PSAwICYmIG1pbnV0ZXMgPiAwKSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kcyA9IDU5O1xuICAgICAgICAgICAgICAgIG1pbnV0ZXMgLT0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2Vjb25kcyA+IDApIHtcbiAgICAgICAgICAgICAgICBzZWNvbmRzIC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2Vjb25kcyA8IDEwKSB7XG4gICAgICAgICAgICAgICAgbmV4dC50ZXh0Q29udGVudCA9IGBXYWl0ICR7bWludXRlc306MCR7c2Vjb25kc31gO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXh0LnRleHRDb250ZW50ID0gYFdhaXQgJHttaW51dGVzfToke3NlY29uZHN9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXh0LnRleHRDb250ZW50ID09IFwiV2FpdCAwOjAwXCIpIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSUQpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBuZXh0LnRleHRDb250ZW50ID0gXCJOZXh0ID5cIjtcbiAgICAgICAgICAgICAgICAgICAgbmV4dC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgd2luZG93U3dpdGNoUXVpeik7XG4gICAgICAgICAgICAgICAgfSwgaG93TG9uZ0lzQVNlY29uZEluTVMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBob3dMb25nSXNBU2Vjb25kSW5NUyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRRdWl6UXVlc3Rpb25zKCkge1xuICAgIGxldCBxdWl6QXJyYXlUZW1wOiBhbnlbXSA9IFtdO1xuXG4gICAgZGF0YS5xdWVzdGlvbnMuZm9yRWFjaCgocXVlc3Rpb25EYXRhKSA9PiB7XG4gICAgICAgIHF1aXpBcnJheVRlbXAucHVzaChbcXVlc3Rpb25EYXRhLnF1ZXN0aW9uLCBxdWVzdGlvbkRhdGEua2V5XSk7XG4gICAgfSk7XG5cbiAgICBsZXQgY3VycmVudEluZGV4OiBudW1iZXIgPSBxdWl6QXJyYXlUZW1wLmxlbmd0aCwgcmFuZG9tSW5kZXg6IG51bWJlcjtcblxuICAgIHdoaWxlIChjdXJyZW50SW5kZXggIT0gMCkge1xuICAgICAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHF1aXpBcnJheVRlbXAubGVuZ3RoKTtcbiAgICAgICAgY3VycmVudEluZGV4LS07XG5cbiAgICAgICAgW3F1aXpBcnJheVRlbXBbY3VycmVudEluZGV4XSwgcXVpekFycmF5VGVtcFtyYW5kb21JbmRleF1dID0gW1xuICAgICAgICAgICAgcXVpekFycmF5VGVtcFtyYW5kb21JbmRleF0sXG4gICAgICAgICAgICBxdWl6QXJyYXlUZW1wW2N1cnJlbnRJbmRleF0sXG4gICAgICAgIF07XG4gICAgfVxuICAgIHJldHVybiBxdWl6QXJyYXlUZW1wO1xufVxuXG5mdW5jdGlvbiB3aW5kb3dTd2l0Y2hUZXJtcygpIHtcbiAgICBsZXQgd2luZG93Q29udGVudFRlcm1zID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZG93Q29udGVudFRlcm1zXCIpO1xuICAgIGxldCB3aW5kb3dDb250ZW50UXVlc3Rpb25zID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZG93Q29udGVudFF1ZXN0aW9uc1wiKTtcbiAgICBsZXQgc2Nyb2xsQm94VGVybXMgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzY3JvbGxCb3hUZXh0XCIpO1xuICAgIGxldCBuZXh0ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV4dFwiKTtcblxuICAgIHdpbmRvd0NvbnRlbnRRdWVzdGlvbnMuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICB3aW5kb3dDb250ZW50UXVlc3Rpb25zLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcblxuICAgIHdpbmRvd0NvbnRlbnRUZXJtcy5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuXG4gICAgbmV4dC50ZXh0Q29udGVudCA9IFwiV2FpdFwiO1xuICAgIG5leHQuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJcIik7XG4gICAgc2Nyb2xsQm94VGVybXMuc2Nyb2xsKDAsIDApO1xuICAgICg8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIndyb25nXCIpLml0ZW0oMCkpLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcblxuICAgIG5leHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHdpbmRvd1N3aXRjaFRlcm1zKTtcbiAgICBzY3JvbGxCb3hUZXJtcy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHN0YXJ0Q291bnRkb3duKTtcblxuICAgIHdpbmRvd0NvbnRlbnRUZXJtcy5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG59XG5cbmZ1bmN0aW9uIHdpbkV2ZW50KCkge1xuICAgICg8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5kb3dcIikpLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcbn1cblxuZnVuY3Rpb24gd2luZG93U3dpdGNoUXVpeigpIHtcbiAgICBsZXQgd2luZG93Q29udGVudFRlcm1zID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZG93Q29udGVudFRlcm1zXCIpO1xuICAgIGxldCB3aW5kb3dDb250ZW50UXVlc3Rpb25zID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZG93Q29udGVudFF1ZXN0aW9uc1wiKTtcbiAgICBsZXQgdmVyaWZ5QnV0dG9uID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmVyaWZ5QnV0dG9uXCIpXG4gICAgbGV0IHNjcm9sbEJveFF1aXogPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzY3JvbGxCb3hRdWl6XCIpO1xuICAgIGxldCBuZXh0ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV4dFwiKTtcblxuICAgIG5leHQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHdpbmRvd1N3aXRjaFRlcm1zKTtcblxuICAgIHF1aXpBcnJheSA9IGdldFF1aXpRdWVzdGlvbnMoKTtcblxuICAgIHdoaWxlIChzY3JvbGxCb3hRdWl6LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgc2Nyb2xsQm94UXVpei5yZW1vdmVDaGlsZChzY3JvbGxCb3hRdWl6LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVpekFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBwYXJlbnRFbGVtZW50ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2Nyb2xsQm94UXVpelwiKTtcbiAgICAgICAgbGV0IG1haW5FbGVtZW50ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGxldCBpbnB1dEVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGxldCBsYWJlbEVsZW1lbnQgPSA8SFRNTExhYmVsRWxlbWVudD5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG5cbiAgICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICAgICAgbWFpbkVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiZ3JpZFwiO1xuICAgICAgICAgICAgbWFpbkVsZW1lbnQuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IFwibWluLWNvbnRlbnQgYXV0b1wiO1xuICAgICAgICAgICAgbWFpbkVsZW1lbnQuc3R5bGUuYWxpZ25JdGVtcyA9IFwiY2VudGVyXCI7XG4gICAgICAgICAgICBtYWluRWxlbWVudC5zdHlsZS5tYXJnaW5Ub3AgPSBcIjE4cHhcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgIG1haW5FbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJxdWl6Q2xhc3NcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xuICAgICAgICBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcInF1aXpcIik7XG4gICAgICAgIGlucHV0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInF1ZXN0aW9uXCIgKyBpLnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIGxhYmVsRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgXCJxdWVzdGlvblwiICsgaS50b1N0cmluZygpKTtcbiAgICAgICAgbGFiZWxFbGVtZW50LnRleHRDb250ZW50ID0gcXVpekFycmF5W2ldWzBdO1xuXG4gICAgICAgIG1haW5FbGVtZW50LmFwcGVuZENoaWxkKGlucHV0RWxlbWVudCk7XG4gICAgICAgIG1haW5FbGVtZW50LmFwcGVuZENoaWxkKGxhYmVsRWxlbWVudCk7XG5cbiAgICAgICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChtYWluRWxlbWVudCk7XG4gICAgfVxuICAgIHdpbmRvd0NvbnRlbnRUZXJtcy5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIHdpbmRvd0NvbnRlbnRUZXJtcy5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XG5cbiAgICB3aW5kb3dDb250ZW50UXVlc3Rpb25zLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG5cbiAgICBzY3JvbGxCb3hRdWl6LnNjcm9sbCgwLCAwKTtcblxuICAgIHdpbmRvd0NvbnRlbnRRdWVzdGlvbnMuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuXG4gICAgdmVyaWZ5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB2ZXJpZnlJbnB1dCk7XG59XG5cbmZ1bmN0aW9uIHZlcmlmeUlucHV0KCkge1xuICAgIGxldCBjaGVja2JveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cInF1aXpcIl0nKTtcbiAgICBsZXQgdmVyaWZ5QnV0dG9uID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmVyaWZ5QnV0dG9uXCIpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGVja2JveGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBjaGVja2JveCA9IGNoZWNrYm94ZXMuaXRlbShpKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgICBjb25zb2xlLmxvZyhjaGVja2JveC5jaGVja2VkLCBxdWl6QXJyYXlbaV1bMV0pXG4gICAgICAgIGlmIChjaGVja2JveC5jaGVja2VkICE9IHF1aXpBcnJheVtpXVsxXSkge1xuICAgICAgICAgICAgd2luZG93U3dpdGNoVGVybXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PSBjaGVja2JveGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHdpbkV2ZW50KClcbiAgICAgICAgfVxuICAgIH1cbiAgICB2ZXJpZnlCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHZlcmlmeUlucHV0KTtcbn1cblxuKDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjcm9sbEJveFRleHRcIikpLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgc3RhcnRDb3VudGRvd24pO1xuKDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW50XCIpKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gd2luZG93LnByaW50KCkpO1xucmVjZW50ZXJXaW5kb3coKTtcbiJdfQ==
