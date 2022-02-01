
let second: number = 5;
let minute: number = 0;

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
    let next = (<HTMLElement>document.getElementById('next'))
    let scrollBoxText = (<HTMLElement>document.getElementById('scrollBoxText'));

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
                }, 100);
            }
        }, 100)
    }
}

function switchWindow() {
    (<HTMLElement>document.getElementById('next')).removeEventListener('click', switchWindow);
    let windowContentTerms = <HTMLElement>document.getElementById('windowContentTerms');
    let windowContentQuestions = <HTMLElement>document.getElementById('windowContentQuestions');

    windowContentTerms.classList.add('hidden');
    windowContentTerms.style.opacity = "0";

    windowContentQuestions.classList.remove('hidden');
    windowContentQuestions.style.opacity = "1";


}

(<HTMLElement>document.getElementById('scrollBoxText')).addEventListener('scroll', startCountdown);
(<HTMLElement>document.getElementById('verifyButton')).addEventListener('click', () => {
    let checkboxes = document.querySelectorAll('input[name="quiz"]');
    for (let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes.item(i) as HTMLInputElement
        console.log(checkbox.id, checkbox.checked)
    }
})

recenterWindow()








