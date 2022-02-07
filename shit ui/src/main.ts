import * as data from "../json/quiz.json";

let time: number = 150,
    timeIncrement: number = 150,
    howLongIsASecondInMS: number = 1000;
let quizArray: any[] = [];
let intervalID: number
let skipKey: string = '';

dragElement(<HTMLElement>document.getElementById("window"));
window.addEventListener("resize", fitWindowToScreen);
document.getElementById("exit")?.addEventListener("click", fitWindowToScreen);
document.addEventListener("keypress", skipTimer)

function skipTimer(e: KeyboardEvent) {
    let next = <HTMLElement>document.getElementById("next");
    console.log("test".charAt(0))
    if ("idiot".charAt(skipKey.length) != e.key.toLowerCase()) {
        skipKey = '';
        return
    }
    skipKey += e.key.toLowerCase()
    console.log(skipKey)
    if (skipKey == "idiot") {
        console.log('SKIPÅ!!!!')
        skipKey = ''
        clearInterval(intervalID);
        next.textContent = "Next >";
        next.removeAttribute("disabled");
        next.addEventListener("click", windowSwitchQuiz);
    }
}

function recenterWindow() {
    (<HTMLElement>document.getElementById("window")).style.left =
        document.documentElement.clientWidth / 2 -
        (<HTMLElement>document.getElementById("window")).offsetWidth / 2 +
        "px";
    (<HTMLElement>document.getElementById("window")).style.top =
        document.documentElement.clientHeight / 2 -
        (<HTMLElement>document.getElementById("window")).offsetHeight / 2 +
        "px";
}

function dragElement(windowElem: HTMLElement) {
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    (<HTMLElement>document.getElementById(windowElem.id + "Header")).addEventListener("mousedown", dragMouseDown);

    function dragMouseDown(e: MouseEvent) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.addEventListener("mouseup", closeDragElement);
        document.addEventListener("mousemove", elementDrag);
    }

    function elementDrag(e: MouseEvent) {
       
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        (<HTMLElement>document.getElementById(windowElem.id + "Header")).onmouseup = function() {
            fitWindowToScreen()
            return
        };

        // If cursor is within the window, X-axis
        if (e.clientX < -1 || e.clientX > document.documentElement.clientWidth + 1) {
            console.log(document.documentElement.clientWidth)
            fitWindowToScreen()
            return
        }

        // If cursor is within window, Y-axis
        if (e.clientY < 0 || e.clientY > document.documentElement.clientHeight + 1) {
            fitWindowToScreen()
            return
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
    let windowElem = <HTMLElement>document.getElementById("window");

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

function incrementTimer(): [number, number] {
    let seconds: number = 0,
        minutes: number = 0;
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
    let next = <HTMLElement>document.getElementById("next");
    let scrollBoxText = <HTMLElement>document.getElementById("scrollBoxText");

    if (scrollBoxText.scrollTop + 25 > scrollBoxText.scrollHeight - scrollBoxText.clientHeight) {
        let [seconds, minutes] = incrementTimer();
        if (seconds < 10) {
            next.textContent = `Wait ${minutes}:0${seconds}`;
        } else {
            next.textContent = `Wait ${minutes}:${seconds}`;
        }
        scrollBoxText.removeEventListener("scroll", startCountdown);
        intervalID = setInterval(() => {
            if (seconds == 0 && minutes > 0) {
                seconds = 59;
                minutes -= 1;
            } else if (seconds > 0) {
                seconds -= 1;
            }
            if (seconds < 10) {
                next.textContent = `Wait ${minutes}:0${seconds}`;
            } else {
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
    let quizArrayTemp: any[] = [];

    data.questions.forEach((questionData) => {
        quizArrayTemp.push([questionData.question, questionData.key]);
    });

    let currentIndex: number = quizArrayTemp.length, randomIndex: number;

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
    let windowContentTerms = <HTMLElement>document.getElementById("windowContentTerms");
    let windowContentQuestions = <HTMLElement>document.getElementById("windowContentQuestions");
    let scrollBoxTerms = <HTMLElement>document.getElementById("scrollBoxText");
    let next = <HTMLElement>document.getElementById("next");

    windowContentQuestions.classList.add("hidden");
    windowContentQuestions.style.opacity = "0";

    windowContentTerms.classList.remove("hidden");

    next.textContent = "Wait";
    next.setAttribute("disabled", "");
    scrollBoxTerms.scroll(0, 0);
    (<HTMLElement>document.getElementsByClassName("wrong").item(0)).style.opacity = "1";

    next.addEventListener("click", windowSwitchTerms);
    scrollBoxTerms.addEventListener("scroll", startCountdown);

    windowContentTerms.style.opacity = "1";
}

function winEvent() {
    (<HTMLElement>document.getElementById("window")).style.opacity = "0";
}

function windowSwitchQuiz() {
    let windowContentTerms = <HTMLElement>document.getElementById("windowContentTerms");
    let windowContentQuestions = <HTMLElement>document.getElementById("windowContentQuestions");
    let verifyButton = <HTMLElement>document.getElementById("verifyButton")
    let scrollBoxQuiz = <HTMLElement>document.getElementById("scrollBoxQuiz");
    let next = <HTMLElement>document.getElementById("next");

    next.removeEventListener("click", windowSwitchTerms);

    quizArray = getQuizQuestions();

    while (scrollBoxQuiz.firstChild) {
        scrollBoxQuiz.removeChild(scrollBoxQuiz.firstChild);
    }

    for (let i = 0; i < quizArray.length; i++) {
        let parentElement = <HTMLElement>document.getElementById("scrollBoxQuiz");
        let mainElement = <HTMLElement>document.createElement("div");
        let inputElement = <HTMLInputElement>document.createElement("input");
        let labelElement = <HTMLLabelElement>document.createElement("label");

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
    let verifyButton = <HTMLElement>document.getElementById("verifyButton")
    for (let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes.item(i) as HTMLInputElement;
        console.log(checkbox.checked, quizArray[i][1])
        if (checkbox.checked != quizArray[i][1]) {
            windowSwitchTerms();
            return;
        }
        if (i == checkboxes.length - 1) {
            winEvent()
        }
    }
    verifyButton.removeEventListener("click", verifyInput);
}

(<HTMLElement>document.getElementById("scrollBoxText")).addEventListener("scroll", startCountdown);
(<HTMLElement>document.getElementById("print")).addEventListener("click", () => window.print());
recenterWindow();
