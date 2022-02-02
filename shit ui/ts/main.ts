import * as data from '../json/quiz.json'

let minute: number = 0, second: number = 10;
let howLongIsASecondInMS: number = 1000

dragElement(<HTMLElement>document.getElementById('window'));

function recenterWindow() {
    (<HTMLElement>document.getElementById('window')).style.left = (document.documentElement.clientWidth/2) - (<HTMLElement>document.getElementById('window')).offsetWidth/2 + "px";
    (<HTMLElement>document.getElementById('window')).style.top = (document.documentElement.clientHeight/2) - (<HTMLElement>document.getElementById('window')).offsetHeight/2 + "px";
}

function dragElement(elemt: HTMLElement) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elemt.id + "Header")) {
        /* 
        if present, the header is where you move the DIV from:
        */
        (<HTMLElement>document.getElementById(elemt.id + "Header")).addEventListener('mousedown', dragMouseDown);
    }
 
    function dragMouseDown(e: MouseEvent) {
        e.preventDefault()
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.addEventListener('mouseup', closeDragElement);
        document.addEventListener('mousemove', elementDrag);
    }

    function elementDrag(e: MouseEvent) {
        e.preventDefault()
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
};

function startCountdown() {
    // TODO: Try to use Element.scrollTopMax 
    let next = (<HTMLElement>document.getElementById('next'))
    let scrollBoxText = (<HTMLElement>document.getElementById('scrollBoxText'));
    console.log('SROLLING :)')

    if (scrollBoxText.scrollTop + 25 > scrollBoxText.scrollHeight - scrollBoxText.clientHeight){
        next.textContent = `Wait ${minute}:0${second}`;
        scrollBoxText.removeEventListener('scroll', startCountdown);
        let intervalID = setInterval(() => {
            if (second == 0 && minute > 0) {
                second = 59;
                minute -= 1;
            } else if (second > 0){
                second -= 1;
            }
            if (second < 10) {
                (next.textContent = `Wait ${minute}:0${second}`);
            } else {
                (next.textContent = `Wait ${minute}:${second}`);
            }
            if (next.textContent == 'Wait 0:00') {
                clearInterval(intervalID);
                setTimeout(() => {
                    next.textContent = 'Next >';
                    next.removeAttribute('disabled');
                    next.addEventListener('click', switchWindow)
                }, howLongIsASecondInMS);
            }
        }, howLongIsASecondInMS)
    }
}

function switchWindow() {
    let windowContentTerms = <HTMLElement>document.getElementById('windowContentTerms');
    let windowContentQuestions = <HTMLElement>document.getElementById('windowContentQuestions');
    let scrollBoxText = (<HTMLElement>document.getElementById('scrollBoxText'));
    let scrollBoxQuiz = (<HTMLElement>document.getElementById('scrollBoxQuiz'));
    let next = (<HTMLElement>document.getElementById('next'))

    switch ('hidden') {
        case (windowContentTerms.className): // i.e switch to Terms
            console.log('terms')
            windowContentQuestions.classList.add('hidden');
            windowContentQuestions.style.opacity = "0";
            
            windowContentTerms.classList.remove('hidden')

            minute = 0, second = 10;
            next.textContent = 'Wait'
            next.setAttribute('disabled', '');
            scrollBoxText.scroll(0, 0);
            (<HTMLElement>document.getElementsByClassName('wrong').item(0)).style.opacity = "1";
            

            next.addEventListener('click', switchWindow);
            scrollBoxText.addEventListener('scroll', startCountdown);

            windowContentTerms.style.opacity = "1"
            
            break;
        case (windowContentQuestions.className): // i.e switch to questions
            console.log('questiozns');
            (<HTMLElement>document.getElementById('next')).removeEventListener('click', switchWindow);
            let labels = document.querySelectorAll('label')

            let quizQuestions: string[] = getQuizQuestions();
            for (let i = 0; i < labels.length; i++) {
                let label = labels.item(i) as HTMLLabelElement;
                try {
                    label.innerText = <string>quizQuestions.pop();
                } catch (error) {
                    console.log(error)
                }
            }
        
            windowContentTerms.classList.add('hidden');
            windowContentTerms.style.opacity = "0";
        
            windowContentQuestions.classList.remove('hidden');

            scrollBoxQuiz.scroll(0, 0)

            windowContentQuestions.style.opacity = "1";
            break;
        default:
            console.log('default')
            break;
    }
    
}

function getQuizQuestions() {
    let quizQuestions: string[] = [];
    data.questions.forEach(question => quizQuestions.push(question));
    let currentIndex = quizQuestions.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * quizQuestions.length);
        currentIndex--;

        [quizQuestions[currentIndex], quizQuestions[randomIndex]] = [quizQuestions[randomIndex], quizQuestions[currentIndex]];
    }
    return quizQuestions
}

(<HTMLElement>document.getElementById('scrollBoxText')).addEventListener('scroll', startCountdown);
(<HTMLElement>document.getElementById('verifyButton')).addEventListener('click', () => {
    let checkboxes = document.querySelectorAll('input[name="quiz"]');
    // TODO: Make it so that the all the questions in quiz.json also has a true/false attribute so that the forloop below can check if the person answerd correctly. 
    for (let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes.item(i) as HTMLInputElement
        //console.log(checkbox.id, checkbox.checked)
    }
    // TODO: As part of the above TODO change this if statement so its isn't just false
    if (true) {
        switchWindow()
    }

})

recenterWindow()







