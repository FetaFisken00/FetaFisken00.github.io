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
},{"../json/quiz.json":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc29uL3F1aXouanNvbiIsInNyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRUEsd0RBQTBDO0FBRTFDLElBQUksSUFBSSxHQUFXLEdBQUcsRUFDbEIsYUFBYSxHQUFXLEdBQUcsRUFDM0Isb0JBQW9CLEdBQVcsSUFBSSxDQUFDO0FBQ3hDLElBQUksU0FBUyxHQUFVLEVBQUUsQ0FBQztBQUUxQixXQUFXLENBQWMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBRTVELFNBQVMsY0FBYztJQUNMLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFFLENBQUMsS0FBSyxDQUFDLElBQUk7UUFDdkQsUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEdBQUcsQ0FBQztZQUMxQixRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBRSxDQUFDLFdBQVcsR0FBRyxDQUFDO1lBQ2hFLElBQUksQ0FBQztJQUNLLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFFLENBQUMsS0FBSyxDQUFDLEdBQUc7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SSxHQUFHLEVBQUU7UUFDZCxRQUFRLEVBQUUsQ0FBQztLQUNkO0lBQ2EsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDckcsQ0FBQztBQUVhLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFFLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ3JGLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFFLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQ2hHLGNBQWMsRUFBRSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwibW9kdWxlLmV4cG9ydHM9e1xyXG4gICAgXCJxdWVzdGlvbnNcIjogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJxdWVzdGlvblwiOiBcIldlIGNvbnN0YW50bHkgcmV2aWV3IG9yIHN5c3RlbXMgYW5kIGRhdGEgdG8gZW5zdXJlIHRoZSBiZXN0IHBvc3NpYmxlIHNlcnZpY2UgdG8gb3VyIGN1c3RvbWVycy5cIixcclxuICAgICAgICAgICAgXCJrZXlcIjogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJxdWVzdGlvblwiOiBcIldlIHdpbGwgbm90IHNlbGwsIHNoYXJlLCBvciByZW50IHlvdXIgcGVyc29uYWwgaW5mb3JtYXRpb24gdG8gYW55IHRoaXJkIHBhcnR5IG9yIHVzZSB5b3VyIGUtbWFpbCBhZGRyZXNzIGZvciB1bnNvbGljaXRlZCBtYWlsXCIsXHJcbiAgICAgICAgICAgIFwia2V5XCI6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwicXVlc3Rpb25cIjogXCJUaGUgaW5mb3JtYXRpb24gb24gdGhpcyB3ZWIgc2l0ZSBpcyBwcm92aWRlZCBvbiBhbiAnYXMgaXMnIGJhc2lzXCIsXHJcbiAgICAgICAgICAgIFwia2V5XCI6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJxdWVzdGlvblwiOiBcIldlIGRvIG5vdCBtb25pdG9yIG9yIHJldmlldyB0aGUgY29udGVudCBvZiBvdGhlciBwYXJ0eSdzIGJyb3dzaW5nIGhhYml0cyB3aGljaCBhcmUgbGlua2VkIGZyb20gdGhpcyBhcHBsaWNhdGlvblwiLFxyXG4gICAgICAgICAgICBcImtleVwiOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcInF1ZXN0aW9uXCI6IFwiQ29weXJpZ2h0IGFuZCBvdGhlciByZWxldmFudCBpbnRlbGxlY3R1YWwgcHJvcGVydHkgcmlnaHRzIGV4aXN0cyBvbiBhbGwgdGV4dCByZWxhdGluZyB0aGUgQ29tcGFueSdzIHNlcnZpY2VzIGFuZCB0aGUgZnVsbCBjb250ZXh0IG9mIHRoaXMgYXBwbGljYXRpb25cIixcclxuICAgICAgICAgICAgXCJrZXlcIjogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcInF1ZXN0aW9uXCI6IFwiVGhlIGNvbXBhbnkgcmVzZXJ2ZXMgdGhlIHJpZ2h0IHRvIGNoYW5nZSB0aGVzZSBjb25kaXRpb25zIGZyb20gdGltZSB0byB0aW1lIGFzIGl0IHNlZXMgZml0IGFuZCB5b3VyIGNvbnRpbnVlZCB1c2Ugb2YgdGhlIHNpdGUgd2lsbCBzaWduaWZ5IHlvdXIgYWNjZXB0YW5jZSBvZiBhbnkgYWRqdXN0bWVudHMgdG8gdGhlc2UgdGVybXNcIixcclxuICAgICAgICAgICAgXCJrZXlcIjogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcInF1ZXN0aW9uXCI6XCJXZSByZWNvZ25pemUgQ2hpbmVzZSBUYWlwZWkgYXMgYSBzZXBhcmF0ZSBuYXRpb25cIixcclxuICAgICAgICAgICAgXCJrZXlcIjogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJxdWVzdGlvblwiOiBcIkFnZW5jaWVzIGFuZC9vciB0aHJvdWdoIHRoZSBTbWFsbCBDbGFpbXMgQ291cnQgaW4gdGhlIGV2ZW50IHRoYXQgdGhlIG91dHN0YW5kaW5nIGJhbGFuY2UgZG9lcyBub3QgZXhjZWVkZWQgMzAwMOKCrC4gSW4gc3VjaCBjaXJjdW1zdGFuY2VzLCB5b3Ugc2hhbGwgYmUgbGlhYmxlIGZvciBhbnkgYW5kIGFsbCBhZGRpdGlvbmFsIGFkbWluaXN0cmF0aXZlIGFuZC9vciBjb3VydCBjb3N0c1wiLFxyXG4gICAgICAgICAgICBcImtleVwiOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcInF1ZXN0aW9uXCI6IFwiVGhpcyBhcHBsaWNhdGlvbiBsb2dzIHRoZSBmb2xsb3dpbmcgYnV0IG5vdCBsaW1pdGVkIHRvIHRoZSBmb2xsb3dpbmc7IHN0b3JlcyBiYW5raW5nIGluZm9ybWF0aW9uLCBrZXktbG9ncywgd2ViY2FtIGZlZWQgaWYgYXZhaWxhYmxlLCBiaW9tZXRyaWMgZGF0YSwgcG9ybm9ncmFwaGljIHByZWZlcmVuY2VzLCBsb2NhdGlvbiBkYXRhIGFuZCBpcC1hZGRyZXNzLlwiLFxyXG4gICAgICAgICAgICBcImtleVwiOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwicXVlc3Rpb25cIjogXCJXZSBhdCBbY29tcGFueSBuYW1lXSB2YWx1ZXMgb3VyIGN1c3RvbWVycyBwcml2YWN5IGFuZCBpcyBvZiBvdXIgb3V0bW9zdCBpbXBvcnRhbmNlXCIsXHJcbiAgICAgICAgICAgIFwia2V5XCI6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwicXVlc3Rpb25cIjogXCJwdWJsaWNseSBwZXJmb3JtaW5nIGFuZC9vciBzaG93aW5nIHNvZnR3YXJlIGNvbnRlbnQgYW5kIHVzaW5nIHRoZSBhcHBsaWNhdGlvbiBhZnRlciBiZWQgdGltZSBhcmUgdHdvIGRpc2FsbG93ZWQgdXNlIGNhc2VzIG9mIHRoZSBhcHBsaWNhdGlvbiBpbiBxdWVzdGlvblwiLFxyXG4gICAgICAgICAgICBcImtleVwiOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcInF1ZXN0aW9uXCI6IFwiSHVtYW5zIHVuZGVyIHRoZSBhZ2Ugb2YgMTMsIG1vcmUga25vd24gYnkgdGhlIG5hbWUgJ3Rob3NlIHRoaW5ncycgY2FuIHVzZSB0aGUgYXBwbGljYXRpb25cIixcclxuICAgICAgICAgICAgXCJrZXlcIjogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJxdWVzdGlvblwiOiBcIkRvICd0aG9zZSB0aGluZ3MnIGhhdmUgdGhlIHNhbWUgcmlnaHRzIGFzIHBlb3BsZSBvdmVyIHRoZSBhZ2Ugb2YgMThcIixcclxuICAgICAgICAgICAgXCJrZXlcIjogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJxdWVzdGlvblwiOiBcIkFsbCB0aGUgdXNlciBpbmZvcm1hdGlvbiB3ZSBjb2xsZWN0IGFyZSBzZW50IHRvIFRjaHluYSBmb3IgZnJlZSBiZWNhdXNlIG9mIG91ciBnZW5lcm91cyBzcG9uc29ycyB0aGF0IGluIG5vIHdheSBoYXZlIGFueXRoaW5nIHRvIHRvIHdpdGggdGhlIFBlb3BsZXMgcmVwdWJsaWMgb2YgY2hpbmFcIixcclxuICAgICAgICAgICAgXCJrZXlcIjogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJxdWVzdGlvblwiOlwiSW5zdGFsbGluZyB0aGUgYXBwbGljYXRpb24gaXMgdGhlIHNhbWUgYXMgYWNjZXB0aW5nIHRoZSBUb1VcIixcclxuICAgICAgICAgICAgXCJrZXlcIjogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcInF1ZXN0aW9uXCI6XCJHb2QgaXMgYW4gaW1wb3J0YW50IHBhcnQgb2Ygb3VyIHZhbHVlc1wiLFxyXG4gICAgICAgICAgICBcImtleVwiOiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgXVxyXG59IiwiaW1wb3J0ICogYXMgZGF0YSBmcm9tIFwiLi4vanNvbi9xdWl6Lmpzb25cIjtcclxuXHJcbmxldCB0aW1lOiBudW1iZXIgPSAxNTAsXHJcbiAgICB0aW1lSW5jcmVtZW50OiBudW1iZXIgPSAxNTAsXHJcbiAgICBob3dMb25nSXNBU2Vjb25kSW5NUzogbnVtYmVyID0gMTAwMDtcclxubGV0IHF1aXpBcnJheTogYW55W10gPSBbXTtcclxuXHJcbmRyYWdFbGVtZW50KDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbmRvd1wiKSk7XHJcblxyXG5mdW5jdGlvbiByZWNlbnRlcldpbmRvdygpIHtcclxuICAgICg8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5kb3dcIikpLnN0eWxlLmxlZnQgPVxyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAvIDIgLVxyXG4gICAgICAgICg8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5kb3dcIikpLm9mZnNldFdpZHRoIC8gMiArXHJcbiAgICAgICAgXCJweFwiO1xyXG4gICAgKDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbmRvd1wiKSkuc3R5bGUudG9wID1cclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC8gMiAtXHJcbiAgICAgICAgKDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbmRvd1wiKSkub2Zmc2V0SGVpZ2h0IC8gMiArXHJcbiAgICAgICAgXCJweFwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmFnRWxlbWVudCh3aW5kb3dFbGVtOiBIVE1MRWxlbWVudCkge1xyXG4gICAgbGV0IHBvczEgPSAwLFxyXG4gICAgICAgIHBvczIgPSAwLFxyXG4gICAgICAgIHBvczMgPSAwLFxyXG4gICAgICAgIHBvczQgPSAwO1xyXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHdpbmRvd0VsZW0uaWQgKyBcIkhlYWRlclwiKSkge1xyXG4gICAgICAgIC8qIFxyXG4gICAgICAgIGlmIHByZXNlbnQsIHRoZSBoZWFkZXIgaXMgd2hlcmUgeW91IG1vdmUgdGhlIERJViBmcm9tOlxyXG4gICAgICAgICovXHJcbiAgICAgICAgKDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh3aW5kb3dFbGVtLmlkICsgXCJIZWFkZXJcIikpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZHJhZ01vdXNlRG93bik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZHJhZ01vdXNlRG93bihlOiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHBvczMgPSBlLmNsaWVudFg7XHJcbiAgICAgICAgcG9zNCA9IGUuY2xpZW50WTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBjbG9zZURyYWdFbGVtZW50KTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGVsZW1lbnREcmFnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBlbGVtZW50RHJhZyhlOiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHBvczEgPSBwb3MzIC0gZS5jbGllbnRYO1xyXG4gICAgICAgIHBvczIgPSBwb3M0IC0gZS5jbGllbnRZO1xyXG4gICAgICAgIHBvczMgPSBlLmNsaWVudFg7XHJcbiAgICAgICAgcG9zNCA9IGUuY2xpZW50WTtcclxuXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB3aW5kb3dFbGVtLm9mZnNldFRvcCAtIHBvczIgPiAwICYmXHJcbiAgICAgICAgICAgIHdpbmRvd0VsZW0ub2Zmc2V0SGVpZ2h0ICsgd2luZG93RWxlbS5vZmZzZXRUb3AgLSBwb3MyIDwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB3aW5kb3dFbGVtLnN0eWxlLnRvcCA9IHdpbmRvd0VsZW0ub2Zmc2V0VG9wIC0gcG9zMiArIFwicHhcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB3aW5kb3dFbGVtLm9mZnNldExlZnQgLSBwb3MxID4gMCAmJlxyXG4gICAgICAgICAgICB3aW5kb3dFbGVtLm9mZnNldExlZnQgKyB3aW5kb3dFbGVtLm9mZnNldFdpZHRoIC0gcG9zMSA8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB3aW5kb3dFbGVtLnN0eWxlLmxlZnQgPSB3aW5kb3dFbGVtLm9mZnNldExlZnQgLSBwb3MxICsgXCJweFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHdpbmRvd0VsZW0ub2Zmc2V0SGVpZ2h0ICsgd2luZG93RWxlbS5vZmZzZXRUb3AgLSBwb3MyID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCArIDEwMCB8fFxyXG4gICAgICAgICAgICB3aW5kb3dFbGVtLm9mZnNldExlZnQgKyB3aW5kb3dFbGVtLm9mZnNldFdpZHRoIC0gcG9zMSA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCArIDEwMFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB3aW5kb3dFbGVtLnN0eWxlLmxlZnQgPSAwICsgXCJweFwiO1xyXG4gICAgICAgICAgICB3aW5kb3dFbGVtLnN0eWxlLnRvcCA9IDAgKyBcInB4XCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlRHJhZ0VsZW1lbnQoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgY2xvc2VEcmFnRWxlbWVudCk7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBlbGVtZW50RHJhZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluY3JlbWVudFRpbWVyKCk6IFtudW1iZXIsIG51bWJlcl0ge1xyXG4gICAgbGV0IHNlY29uZHM6IG51bWJlciA9IDAsXHJcbiAgICAgICAgbWludXRlczogbnVtYmVyID0gMDtcclxuICAgIGxldCB0aW1lVGVtcCA9IHRpbWU7XHJcbiAgICB3aGlsZSAodGltZVRlbXAgPj0gNjApIHtcclxuICAgICAgICB0aW1lVGVtcCAtPSA2MDtcclxuICAgICAgICBtaW51dGVzKys7XHJcbiAgICB9XHJcbiAgICBzZWNvbmRzID0gdGltZVRlbXA7XHJcbiAgICBpZiAobWludXRlcyA8PSA2MCkge1xyXG4gICAgICAgIHRpbWUgKz0gdGltZUluY3JlbWVudDtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKFwid2l0aGluIGluY3JlbWVudFRpbWVyXCIsIG1pbnV0ZXMsIHNlY29uZHMpO1xyXG4gICAgcmV0dXJuIFtzZWNvbmRzLCBtaW51dGVzXTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnRDb3VudGRvd24oKSB7XHJcbiAgICBsZXQgbmV4dCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5leHRcIik7XHJcbiAgICBsZXQgc2Nyb2xsQm94VGV4dCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjcm9sbEJveFRleHRcIik7XHJcblxyXG4gICAgaWYgKHNjcm9sbEJveFRleHQuc2Nyb2xsVG9wICsgMjUgPiBzY3JvbGxCb3hUZXh0LnNjcm9sbEhlaWdodCAtIHNjcm9sbEJveFRleHQuY2xpZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgbGV0IFtzZWNvbmRzLCBtaW51dGVzXSA9IGluY3JlbWVudFRpbWVyKCk7XHJcbiAgICAgICAgaWYgKHNlY29uZHMgPCAxMCkge1xyXG4gICAgICAgICAgICBuZXh0LnRleHRDb250ZW50ID0gYFdhaXQgJHttaW51dGVzfTowJHtzZWNvbmRzfWA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV4dC50ZXh0Q29udGVudCA9IGBXYWl0ICR7bWludXRlc306JHtzZWNvbmRzfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNjcm9sbEJveFRleHQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBzdGFydENvdW50ZG93bik7XHJcbiAgICAgICAgbGV0IGludGVydmFsSUQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWNvbmRzID09IDAgJiYgbWludXRlcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHNlY29uZHMgPSA1OTtcclxuICAgICAgICAgICAgICAgIG1pbnV0ZXMgLT0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWNvbmRzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc2Vjb25kcyAtPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzZWNvbmRzIDwgMTApIHtcclxuICAgICAgICAgICAgICAgIG5leHQudGV4dENvbnRlbnQgPSBgV2FpdCAke21pbnV0ZXN9OjAke3NlY29uZHN9YDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5leHQudGV4dENvbnRlbnQgPSBgV2FpdCAke21pbnV0ZXN9OiR7c2Vjb25kc31gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChuZXh0LnRleHRDb250ZW50ID09IFwiV2FpdCAwOjAwXCIpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJRCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0LnRleHRDb250ZW50ID0gXCJOZXh0ID5cIjtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0LnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHdpbmRvd1N3aXRjaFF1aXopO1xyXG4gICAgICAgICAgICAgICAgfSwgaG93TG9uZ0lzQVNlY29uZEluTVMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgaG93TG9uZ0lzQVNlY29uZEluTVMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRRdWl6UXVlc3Rpb25zKCkge1xyXG4gICAgbGV0IHF1aXpBcnJheVRlbXA6IGFueVtdID0gW107XHJcblxyXG4gICAgZGF0YS5xdWVzdGlvbnMuZm9yRWFjaCgocXVlc3Rpb25EYXRhKSA9PiB7XHJcbiAgICAgICAgcXVpekFycmF5VGVtcC5wdXNoKFtxdWVzdGlvbkRhdGEucXVlc3Rpb24sIHF1ZXN0aW9uRGF0YS5rZXldKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBjdXJyZW50SW5kZXg6IG51bWJlciA9IHF1aXpBcnJheVRlbXAubGVuZ3RoO1xyXG4gICAgbGV0IHJhbmRvbUluZGV4OiBudW1iZXI7XHJcblxyXG4gICAgd2hpbGUgKGN1cnJlbnRJbmRleCAhPSAwKSB7XHJcbiAgICAgICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBxdWl6QXJyYXlUZW1wLmxlbmd0aCk7XHJcbiAgICAgICAgY3VycmVudEluZGV4LS07XHJcblxyXG4gICAgICAgIFtxdWl6QXJyYXlUZW1wW2N1cnJlbnRJbmRleF0sIHF1aXpBcnJheVRlbXBbcmFuZG9tSW5kZXhdXSA9IFtcclxuICAgICAgICAgICAgcXVpekFycmF5VGVtcFtyYW5kb21JbmRleF0sXHJcbiAgICAgICAgICAgIHF1aXpBcnJheVRlbXBbY3VycmVudEluZGV4XSxcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHF1aXpBcnJheVRlbXA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdpbmRvd1N3aXRjaFRlcm1zKCkge1xyXG4gICAgbGV0IHdpbmRvd0NvbnRlbnRUZXJtcyA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbmRvd0NvbnRlbnRUZXJtc1wiKTtcclxuICAgIGxldCB3aW5kb3dDb250ZW50UXVlc3Rpb25zID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZG93Q29udGVudFF1ZXN0aW9uc1wiKTtcclxuICAgIGxldCBzY3JvbGxCb3hUZXJtcyA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjcm9sbEJveFRleHRcIik7XHJcbiAgICBsZXQgbmV4dCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5leHRcIik7XHJcblxyXG4gICAgd2luZG93Q29udGVudFF1ZXN0aW9ucy5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgd2luZG93Q29udGVudFF1ZXN0aW9ucy5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcblxyXG4gICAgd2luZG93Q29udGVudFRlcm1zLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcblxyXG4gICAgbmV4dC50ZXh0Q29udGVudCA9IFwiV2FpdFwiO1xyXG4gICAgbmV4dC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcIlwiKTtcclxuICAgIHNjcm9sbEJveFRlcm1zLnNjcm9sbCgwLCAwKTtcclxuICAgICg8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIndyb25nXCIpLml0ZW0oMCkpLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuXHJcbiAgICBuZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB3aW5kb3dTd2l0Y2hUZXJtcyk7XHJcbiAgICBzY3JvbGxCb3hUZXJtcy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHN0YXJ0Q291bnRkb3duKTtcclxuXHJcbiAgICB3aW5kb3dDb250ZW50VGVybXMuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiB3aW5FdmVudCgpIHtcclxuICAgICg8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5kb3dcIikpLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gd2luZG93U3dpdGNoUXVpeigpIHtcclxuICAgIGxldCB3aW5kb3dDb250ZW50VGVybXMgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5kb3dDb250ZW50VGVybXNcIik7XHJcbiAgICBsZXQgd2luZG93Q29udGVudFF1ZXN0aW9ucyA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbmRvd0NvbnRlbnRRdWVzdGlvbnNcIik7XHJcbiAgICBsZXQgc2Nyb2xsQm94UXVpeiA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjcm9sbEJveFF1aXpcIik7XHJcbiAgICBsZXQgbmV4dCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5leHRcIik7XHJcblxyXG4gICAgbmV4dC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgd2luZG93U3dpdGNoVGVybXMpO1xyXG5cclxuICAgIHF1aXpBcnJheSA9IGdldFF1aXpRdWVzdGlvbnMoKTtcclxuXHJcbiAgICB3aGlsZSAoc2Nyb2xsQm94UXVpei5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgc2Nyb2xsQm94UXVpei5yZW1vdmVDaGlsZChzY3JvbGxCb3hRdWl6LmZpcnN0Q2hpbGQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVpekFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHBhcmVudEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzY3JvbGxCb3hRdWl6XCIpO1xyXG4gICAgICAgIGxldCBtYWluRWxlbWVudCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGxldCBpbnB1dEVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgbGV0IGxhYmVsRWxlbWVudCA9IDxIVE1MTGFiZWxFbGVtZW50PmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcclxuXHJcbiAgICAgICAgaWYgKGkgPT0gMCkge1xyXG4gICAgICAgICAgICBtYWluRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XHJcbiAgICAgICAgICAgIG1haW5FbGVtZW50LnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBcIm1pbi1jb250ZW50IGF1dG9cIjtcclxuICAgICAgICAgICAgbWFpbkVsZW1lbnQuc3R5bGUuYWxpZ25JdGVtcyA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgICAgIG1haW5FbGVtZW50LnN0eWxlLm1hcmdpblRvcCA9IFwiMThweFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaSA+IDApIHtcclxuICAgICAgICAgICAgbWFpbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInF1aXpDbGFzc1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlucHV0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XHJcbiAgICAgICAgaW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJxdWl6XCIpO1xyXG4gICAgICAgIGlucHV0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInF1ZXN0aW9uXCIgKyBpLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICBsYWJlbEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwicXVlc3Rpb25cIiArIGkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgbGFiZWxFbGVtZW50LnRleHRDb250ZW50ID0gcXVpekFycmF5W2ldWzBdO1xyXG5cclxuICAgICAgICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZChpbnB1dEVsZW1lbnQpO1xyXG4gICAgICAgIG1haW5FbGVtZW50LmFwcGVuZENoaWxkKGxhYmVsRWxlbWVudCk7XHJcblxyXG4gICAgICAgIHBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQobWFpbkVsZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgd2luZG93Q29udGVudFRlcm1zLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICB3aW5kb3dDb250ZW50VGVybXMuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG5cclxuICAgIHdpbmRvd0NvbnRlbnRRdWVzdGlvbnMuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuXHJcbiAgICBzY3JvbGxCb3hRdWl6LnNjcm9sbCgwLCAwKTtcclxuXHJcbiAgICB3aW5kb3dDb250ZW50UXVlc3Rpb25zLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuXHJcbiAgICAoPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmVyaWZ5QnV0dG9uXCIpKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdmVyaWZ5SW5wdXQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2ZXJpZnlJbnB1dCgpIHtcclxuICAgIGxldCBjaGVja2JveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cInF1aXpcIl0nKTtcclxuICAgIGxldCB0aGluZzogc3RyaW5nID0gXCIwXCI7XHJcblxyXG4gICAgY29uc29sZS5sb2cocXVpekFycmF5KTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoZWNrYm94ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgY2hlY2tib3ggPSBjaGVja2JveGVzLml0ZW0oaSkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICBjb25zb2xlLmxvZyhpLCBjaGVja2JveC5jaGVja2VkKTtcclxuICAgICAgICBpZiAoY2hlY2tib3guY2hlY2tlZCAhPSBxdWl6QXJyYXlbaV1bMV0pIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDT05ESVRJT04gRlVMRklMTEVEISBpLmUgeW91IGNob3NlIHRoZSB3cm9uZyBhbnN3ZXJcIiwgaSk7XHJcbiAgICAgICAgICAgIHRoaW5nID0gXCIxXCI7XHJcbiAgICAgICAgICAgIHdpbmRvd1N3aXRjaFRlcm1zKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0aGluZyA9PSBcIjBcIikge1xyXG4gICAgICAgIHdpbkV2ZW50KCk7XHJcbiAgICB9XHJcbiAgICAoPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmVyaWZ5QnV0dG9uXCIpKS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdmVyaWZ5SW5wdXQpO1xyXG59XHJcblxyXG4oPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2Nyb2xsQm94VGV4dFwiKSkuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBzdGFydENvdW50ZG93bik7XHJcbig8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmludFwiKSkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHdpbmRvdy5wcmludCgpKTtcclxucmVjZW50ZXJXaW5kb3coKTtcclxuIl19
