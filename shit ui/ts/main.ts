import * as data from "../json/quiz.json";

let time: number = 150,
    timeIncrement: number = 150,
    howLongIsASecondInMS: number = 150;
let quizArray: any[] = [];

dragElement(<HTMLElement>document.getElementById("window"));

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
    if (document.getElementById(windowElem.id + "Header")) {
        /* 
        if present, the header is where you move the DIV from:
        */
        (<HTMLElement>document.getElementById(windowElem.id + "Header")).addEventListener("mousedown", dragMouseDown);
    }

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

        if (
            windowElem.offsetTop - pos2 > 0 &&
            windowElem.offsetHeight + windowElem.offsetTop - pos2 < document.documentElement.clientHeight
        ) {
            windowElem.style.top = windowElem.offsetTop - pos2 + "px";
        }
        if (
            windowElem.offsetLeft - pos1 > 0 &&
            windowElem.offsetLeft + windowElem.offsetWidth - pos1 < document.documentElement.clientWidth
        ) {
            windowElem.style.left = windowElem.offsetLeft - pos1 + "px";
        }
        if (
            windowElem.offsetHeight + windowElem.offsetTop - pos2 > document.documentElement.clientHeight + 100 ||
            windowElem.offsetLeft + windowElem.offsetWidth - pos1 > document.documentElement.clientWidth + 100
        ) {
            windowElem.style.left = 0 + "px";
            windowElem.style.top = 0 + "px";
        }
    }

    function closeDragElement() {
        document.removeEventListener("mouseup", closeDragElement);
        document.removeEventListener("mousemove", elementDrag);
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
        let intervalID = setInterval(() => {
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

    let currentIndex: number = quizArrayTemp.length;
    let randomIndex: number;

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

    (<HTMLElement>document.getElementById("verifyButton")).addEventListener("click", verifyInput);
}

function verifyInput() {
    let checkboxes = document.querySelectorAll('input[name="quiz"]');
    let thing: string = "0";

    console.log(quizArray);

    for (let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes.item(i) as HTMLInputElement;
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
    (<HTMLElement>document.getElementById("verifyButton")).removeEventListener("click", verifyInput);
}

(<HTMLElement>document.getElementById("scrollBoxText")).addEventListener("scroll", startCountdown);
(<HTMLElement>document.getElementById("print")).addEventListener("click", () => window.print());
recenterWindow();
