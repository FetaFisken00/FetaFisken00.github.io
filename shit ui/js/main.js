"use strict";
let second = 0;
let minute = 5;
dragElement(document.getElementById('window'));
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
    }
    function closeDragElement() {
        document.removeEventListener('mouseup', closeDragElement);
        document.removeEventListener('mousemove', elementDrag);
    }
}
;
let intervalID = setInterval(() => {
    if (second == 0 && minute > 0) {
        second = 60;
        minute -= 1;
    }
    else if (second > 0) {
        second -= 1;
    }
    if (second < 10) {
        document.getElementById('next').textContent = `Wait: ${minute}:0${second}`;
    }
    else {
        document.getElementById('next').textContent = `Wait: ${minute}:${second}`;
    }
    if (document.getElementById('next').textContent == 'Wait: 0:00') {
        clearInterval(intervalID);
        setTimeout(() => {
            document.getElementById('next').textContent = 'Next >';
            document.getElementById('next').removeAttribute('disabled');
        }, 1000);
    }
}, 1000);
//# sourceMappingURL=main.js.map