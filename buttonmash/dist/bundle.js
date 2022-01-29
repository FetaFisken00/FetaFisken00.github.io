(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
var txt_json_1 = __importDefault(require("../txt.json"));
var typingTest = document.getElementById('typingTest');
var result = document.getElementById('result');
var inputElement = document.getElementById('wordsInput');
var restartTestButton = document.getElementById('restartTestButton');
var wordCollection = document.getElementsByClassName('word');
var modes = (_a = document.getElementsByClassName("group mode").item(0)) === null || _a === void 0 ? void 0 : _a.children.item(0);
var times = (_b = document.getElementsByClassName("group time").item(0)) === null || _b === void 0 ? void 0 : _b.children.item(0);
var quotes = (_c = document.getElementsByClassName("group quoteLength").item(0)) === null || _c === void 0 ? void 0 : _c.children.item(0);
var myJSON = {
    "mode": "time",
    "time": "30",
    "quoteLength": "-1",
    "activeScene": "typingTestScene"
};
var Keys;
(function (Keys) {
    Keys["Backspace"] = "Backspace";
    Keys["Enter"] = "Enter";
    Keys["Spacebar"] = " ";
})(Keys || (Keys = {}));
// Redo button enter-button
//function helperRedoEnter(e: KeyboardEvent): void {
//  if (e.key == Keys.Enter) {
//    e.preventDefault();
//    typingTestReset();
//    setTimeout(typingTestReset, 180);
//  }
//}
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
var ButtonMash = /** @class */ (function () {
    function ButtonMash() {
        this.activeText = 0;
        this.wordDictionary = this.wordWrapper();
        this.counter = +myJSON.time;
        this.intervalId = setInterval(function () { });
        this.aditionalCheck = true;
        this.customText = [''];
        this.timeoutID = setTimeout(function () { });
    }
    ButtonMash.prototype.startTimer = function (time) {
        var _this = this;
        clearInterval(this.intervalId);
        this.counter = time;
        document.getElementById("time").textContent = this.counter.toString();
        this.intervalId = setInterval(function () {
            _this.counter -= 1;
            document.getElementById("time").textContent = _this.counter.toString();
            if (_this.counter === 0) {
                clearInterval(_this.intervalId);
                _this.switchResultsTypingTest();
            }
        }, 1000);
    };
    ButtonMash.prototype.CustomTestDurationPopup = function () {
        var customTestPopup = document.getElementById('customTestDurationPopupWrapper');
        var customTimeInput = document.getElementById('customTimeInput');
        if (customTestPopup.style.opacity == "0") {
            myJSON.activeScene = 'customTestDurationPopupScene';
            customTestPopup.classList.remove('hidden');
            customTestPopup.style.opacity = "1";
            customTimeInput.focus();
        }
    };
    ButtonMash.prototype.initializingTypingTest = function () {
        var words = document.getElementById('words');
        var time = document.getElementById('time');
        // -- Flashes typing test --
        typingTest.style.opacity = "0";
        //            Make sure that typing test does not have hidden atribute;
        clearInterval(this.intervalId);
        while (words.firstChild) {
            words.removeChild(words.firstChild);
        }
        setTimeout(function (e) {
            time.style.opacity = "0";
        }, 250);
        time.classList.add('hidden');
        this.aditionalCheck = true; // want to remove but idk what it does anymore
        this.counter = +myJSON.time;
        this.caretReset();
        this.wordDictionary = this.wordWrapper();
        if (typingTest.className == 'hidden') {
            typingTest.classList.remove('hidden');
            result.classList.add('hidden');
            typingTest.style.opacity = "1";
            result.style.opacity = "0";
        }
        inputElement.focus();
        myJSON.activeScene = 'typingTestScene';
        setTimeout(function (e) {
            typingTest.style.opacity = "1";
        }, 180);
    };
    ButtonMash.prototype.restartingTypingTest = function () {
        var words = document.getElementById('words');
        var time = document.getElementById('time');
        // -- Flashes typing test --
        typingTest.style.opacity = "0";
        //            Make sure that typing test does not have hidden atribute;
        clearInterval(this.intervalId);
        setTimeout(function (e) {
            time.style.opacity = "0";
        }, 250);
        time.classList.add('hidden');
        this.aditionalCheck = true; // want to remove but idk what it does anymore
        this.counter = +myJSON.time;
        this.caretReset();
        if (typingTest.className == 'hidden') {
            typingTest.classList.remove('hidden');
            result.classList.add('hidden');
            typingTest.style.opacity = "1";
            result.style.opacity = "0";
        }
        inputElement.focus();
        myJSON.activeScene = 'customTestDurationPopupScene';
        setTimeout(function (e) {
            typingTest.style.opacity = "1";
        }, 180);
    };
    /*
    toggleTabIndex() {
  
    }
    */
    ButtonMash.prototype.getWordList = function () {
        var _a;
        var mode = (_a = document.getElementsByClassName('group mode').item(0)) === null || _a === void 0 ? void 0 : _a.children.item(0);
        switch (mode.querySelectorAll('.text-button.active').item(0).getAttribute('mode')) {
            case "time":
                var wordArray = String(txt_json_1.default.words).split(' ');
                var currentIndex = wordArray.length, temporaryValue = void 0, randomIndex = void 0;
                while (0 != currentIndex) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    temporaryValue = wordArray[currentIndex];
                    wordArray[currentIndex] = wordArray[randomIndex];
                    wordArray[randomIndex] = temporaryValue;
                }
                return wordArray;
            case "quote":
                while (true) {
                    var index = Math.floor(Math.random() * txt_json_1.default.quotes.length);
                    if (index != this.activeText) {
                        this.caretReset();
                        this.activeText = index;
                        return txt_json_1.default.quotes[index].split(' ');
                    }
                }
            case "custom":
                if (this.customText.length > 0)
                    this.customText = prompt('Enter test').split(' ');
                return this.customText;
            default:
                alert('getWordList() defaulted');
                break;
        }
    };
    // Should be baked into initializingTypingTest
    ButtonMash.prototype.switchResultsTypingTest = function () {
        typingTest.style.opacity = "0";
        typingTest.classList.add("hidden");
        result.style.opacity = "1";
        result.classList.remove("hidden");
        myJSON.activeScene = 'resultScene';
        //console.log('Showing results');
    };
    ButtonMash.prototype.getTypedLetters = function (letterCollection) {
        var _a;
        var typedLetters = 0;
        for (var i = 0; i < letterCollection.length; i++) {
            if (((_a = letterCollection.item(i)) === null || _a === void 0 ? void 0 : _a.className) != '') {
                typedLetters++;
            }
        }
        return typedLetters;
    };
    ButtonMash.prototype.wordWrapper = function () {
        var _a;
        var wordList = this.getWordList();
        var wordDictionary = [[]];
        var letterDictionary;
        for (var wordIndex = 0; wordIndex < wordList.length; wordIndex++) {
            var wordsParent = document.getElementById('words');
            var newWord = document.createElement('div');
            newWord.classList.add('word');
            wordsParent.appendChild(newWord);
            letterDictionary = [];
            for (var letterIndex = 0; letterIndex < wordList[wordIndex].split("").length; letterIndex++) {
                var letterChild = wordCollection.item(wordIndex);
                var letter = document.createElement('letter');
                var letterValue = wordList[wordIndex].split("")[letterIndex];
                letterDictionary.push(letterValue);
                letter.textContent = letterValue;
                letterChild.appendChild(letter);
            }
            wordDictionary[wordIndex] = letterDictionary;
        }
        (_a = wordCollection.item(0)) === null || _a === void 0 ? void 0 : _a.classList.add('active');
        return wordDictionary;
    };
    ButtonMash.prototype.wordAdd = function (inputChar) {
        var _a, _b;
        var activeWordIndex = Number(this.findActiveWord(wordCollection)); // Index of the word with the active class within a HTMLCollection of word.
        var wordElement = wordCollection.item(activeWordIndex); // Word element with active class.
        var letterCollection = wordElement.children; // HTMLCollection with letter elements.
        var typedLetters = this.getTypedLetters(letterCollection); // number of the current number of letters with a valid class under the active word.
        var time = document.getElementById("time");
        if (this.counter == +myJSON.time && this.aditionalCheck == true) {
            this.startTimer(+myJSON.time);
            this.aditionalCheck = false;
            time.classList.remove("hidden");
            time.style.opacity = "1";
        }
        if (typedLetters < this.wordDictionary[activeWordIndex].length && typedLetters < this.wordDictionary[activeWordIndex].length + 10) {
            if (inputChar == ((_a = letterCollection.item(typedLetters)) === null || _a === void 0 ? void 0 : _a.textContent)) {
                letterCollection.item(typedLetters).className = 'correct';
            }
            else if (inputChar != ((_b = letterCollection.item(typedLetters)) === null || _b === void 0 ? void 0 : _b.textContent)) {
                letterCollection.item(typedLetters).className = 'incorrect';
            }
            this.caretLetter(letterCollection.item(typedLetters));
        }
        else if (typedLetters > this.wordDictionary[activeWordIndex].length - 1 && typedLetters < this.wordDictionary[activeWordIndex].length + 10) {
            var newLetter = document.createElement('letter');
            newLetter.textContent = inputChar;
            newLetter.classList.add('incorrect', 'extra');
            wordElement.appendChild(newLetter);
            this.caretLetter(letterCollection.item(typedLetters));
        }
        inputElement.value = '';
    };
    ButtonMash.prototype.wordDelete = function (alt) {
        var _a, _b, _c;
        if (alt === void 0) { alt = false; }
        var activeWordIndex = Number(this.findActiveWord(wordCollection)); // Index of the word with the active class within a HTMLCollection of word.
        var wordElement = wordCollection.item(activeWordIndex); // Word element with active class.
        var letterCollection = wordElement.children; // HTMLCollection with letter elements.
        var typedLetters = this.getTypedLetters(letterCollection); // number of the current number of letters with a valid class under the active word.
        var prevWordElement = wordCollection.item(activeWordIndex - 1); // Word element of previous word
        if (alt) {
            if (typedLetters == 0 && activeWordIndex != 0 && prevWordElement.classList[prevWordElement.classList.length - 1] == 'error') { //ctrl-backspace if at start of a word and deletes to the start of the previous word
                for (var i = this.getTypedLetters(prevWordElement.children); i >= 0; i--) {
                    if (i < this.wordDictionary[activeWordIndex - 1].length) {
                        prevWordElement.children.item(i).className = '';
                    }
                    else {
                        (_a = prevWordElement.children.item(i)) === null || _a === void 0 ? void 0 : _a.remove();
                    }
                }
                this.markWordError(prevWordElement);
                this.markWordActive(prevWordElement);
                this.caretWord(prevWordElement);
            }
            else if (typedLetters != 0) {
                for (var i = typedLetters; i >= 0; i--) {
                    if (i < this.wordDictionary[activeWordIndex].length) {
                        letterCollection.item(i).className = '';
                    }
                    else {
                        (_b = letterCollection.item(i)) === null || _b === void 0 ? void 0 : _b.remove();
                    }
                }
                this.caretWord(wordElement);
            }
        }
        else if (typedLetters == 0 && activeWordIndex != 0) { // Checks if caret(not the poisition itself) is at the start of the word and that the active word isnt the first word
            if (prevWordElement.classList[prevWordElement.classList.length - 1] == 'error') { // Checks if previous word has an error class
                this.markWordError(prevWordElement);
                this.markWordActive(prevWordElement);
                this.caretLetter(prevWordElement.children.item(this.getTypedLetters(prevWordElement.children) - 1)); // Moves the caret to the letter position of the last letter
            }
        }
        else if (typedLetters != 0) {
            if (typedLetters - 1 < this.wordDictionary[activeWordIndex].length) { // If within wanted word
                if (typedLetters == 1) { // If on the firstletter
                    letterCollection.item(typedLetters - 1).className = '';
                    this.caretWord(wordElement);
                }
                else { // Not on first letter
                    letterCollection.item(typedLetters - 1).className = '';
                    this.caretLetter(letterCollection.item(typedLetters - 2));
                }
            }
            else { // Not within wanted word, therefore can just remove last child
                (_c = wordElement.lastChild) === null || _c === void 0 ? void 0 : _c.remove();
                this.caretLetter(letterCollection.item(typedLetters - 2));
            }
        }
    };
    ButtonMash.prototype.wordNext = function () {
        var activeWordIndex = Number(this.findActiveWord(wordCollection)); // Index of the word with the active class within a HTMLCollection of word.
        var wordElement = wordCollection.item(activeWordIndex); // Word element with active class.
        var letterCollection = wordElement.children; // HTMLCollection with letter elements.
        var typedLetters = this.getTypedLetters(letterCollection); // number of the current number of letters with a valid class under the active word.
        if (typedLetters > 0) {
            try {
                this.markWordActive(wordCollection.item(activeWordIndex + 1));
                this.caretWord(wordCollection.item(activeWordIndex + 1));
                this.markWordError(wordElement);
                inputElement.value = '';
            }
            catch (error) {
                console.log('>>> Congratz you won :)');
            }
        }
    };
    ButtonMash.prototype.caretLetter = function (letter) {
        var caretStyle = document.getElementById("caret").style;
        var activeLetterBound = letter.getBoundingClientRect();
        var relativeBounds = typingTest.getBoundingClientRect();
        caretStyle.animationName = "none";
        caretStyle.left = (activeLetterBound.right - relativeBounds.left).toString() + "px";
        caretStyle.top = (activeLetterBound.top - relativeBounds.top - ((document.getElementById("caret").getBoundingClientRect().height) - activeLetterBound.height) / 2).toString() + "px";
    };
    ButtonMash.prototype.caretWord = function (word) {
        var caretStyle = document.getElementById("caret").style;
        var relativeBounds = typingTest.getBoundingClientRect();
        var activeWordBound = word.getBoundingClientRect();
        caretStyle.left = (activeWordBound.left - relativeBounds.left).toString() + "px";
        caretStyle.top = (activeWordBound.top - relativeBounds.top - ((document.getElementById("caret").getBoundingClientRect().height) - activeWordBound.height) / 2).toString() + "px";
        caretStyle.animationName = "none";
    };
    ButtonMash.prototype.caretReset = function () {
        var caretStyle = document.getElementById("caret").style;
        inputElement.value = '';
        caretStyle.left = "5px";
        caretStyle.top = "1px";
    };
    ButtonMash.prototype.findActiveWord = function (wordCollection) {
        for (var i = 0; i < wordCollection.length; i++) {
            try {
                for (var j = 0; j < wordCollection.item(i).classList.length; j++) {
                    if (wordCollection.item(i).classList[j] == 'active') {
                        return i;
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    };
    ButtonMash.prototype.markWordActive = function (newWordElem) {
        var _a;
        var activeWordIndex = Number(this.findActiveWord(wordCollection));
        (_a = wordCollection.item(activeWordIndex)) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
        newWordElem.classList.add('active');
    };
    /**
     * Loops through the letter elemends under under wordElem. If any has a 'incorrect' class, error class will be added to wordElem, it makes a red line under the word
     * @param wordElem
     */
    ButtonMash.prototype.markWordError = function (wordElem) {
        var _a, _b, _c;
        var letterCollection = wordElem.children;
        if ((wordElem === null || wordElem === void 0 ? void 0 : wordElem.className) == 'word error') {
            wordElem.classList.remove('error');
        }
        else {
            for (var i = 0; i < letterCollection.length; i++) {
                if (((_a = letterCollection.item(i)) === null || _a === void 0 ? void 0 : _a.className) == 'incorrect' || ((_b = letterCollection.item(i)) === null || _b === void 0 ? void 0 : _b.className) == '' || ((_c = letterCollection.item(i)) === null || _c === void 0 ? void 0 : _c.className) == 'incorrect extra') {
                    wordElem === null || wordElem === void 0 ? void 0 : wordElem.classList.add('error');
                }
            }
        }
    };
    return ButtonMash;
}());
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
var buttonMash = new ButtonMash();
document.addEventListener('mousemove', function (e) {
    if (document.getElementsByTagName('body').item(0).style.cursor == 'none') {
        document.getElementsByTagName('body').item(0).style.cursor = "default";
    }
});
document.addEventListener("click", function () {
    if (myJSON.activeScene == "typingTestScene") {
        //console.log('focus');
        inputElement.focus();
    }
});
document.addEventListener("keydown", function (e) {
    if (myJSON.activeScene == "typingTestScene" && e.key != Keys.Enter) {
        //console.log('focus');
        inputElement.focus();
    }
});
// Input, test, backspace, ctrl-backspace and space
inputElement.addEventListener("input", function (e) {
    var inputChar = e.target.value;
    if (document.getElementsByTagName('body').item(0).style.cursor == 'default') {
        document.getElementsByTagName('body').item(0).style.cursor = "none";
    }
    buttonMash.wordAdd(inputChar);
});
inputElement.addEventListener('keydown', function (e) {
    if (document.getElementsByTagName('body').item(0).style.cursor == 'default') {
        document.getElementsByTagName('body').item(0).style.cursor = "none";
    }
    switch (e.key) {
        case (Keys.Backspace): { // backspace
            e.preventDefault();
            if (e.ctrlKey) {
                buttonMash.wordDelete(true);
            }
            else {
                buttonMash.wordDelete();
            }
            break;
        }
        case (Keys.Spacebar): { // space
            e.preventDefault();
            buttonMash.wordNext();
            break;
        }
    }
});
// Restart button, click and enter
restartTestButton.addEventListener("click", function (e) {
    buttonMash.initializingTypingTest();
});
restartTestButton.addEventListener('keydown', function (e) {
    if (e.key == Keys.Enter) {
        e.preventDefault();
        buttonMash.initializingTypingTest();
    }
});
// Results scene buttons CLICK
(_e = (_d = document.getElementsByClassName('bottom').item(0)) === null || _d === void 0 ? void 0 : _d.children.item(0)) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function (e) {
    var _a;
    if (e.target.className != 'buttons') {
        //console.log((<HTMLInputElement>e.target).getAttribute('id'), (<HTMLInputElement>e.target).parentElement?.getAttribute('id'));
        switch (e.target.getAttribute('id') || ((_a = e.target.parentElement) === null || _a === void 0 ? void 0 : _a.getAttribute('id'))) {
            case 'nextTestButton':
                buttonMash.initializingTypingTest();
                break;
            case 'restartTestButtonWithSameWordset':
                buttonMash.restartingTypingTest();
                break;
            case 'showWordHistoryButton':
                break;
        }
    }
});
// Results scene buttons ENTER KEY
document.getElementsByClassName('bottom').item(0).children.item(0).addEventListener('keydown', function (e) {
    var _a;
    //console.log((<KeyboardEvent>e).key)
    if (e.target.className != 'buttons') {
        //console.log((<HTMLInputElement>e.target).getAttribute('id'), (<HTMLInputElement>e.target).parentElement?.getAttribute('id'));
        switch (e.target.getAttribute('id') || ((_a = e.target.parentElement) === null || _a === void 0 ? void 0 : _a.getAttribute('id'))) {
            case 'nextTestButton':
                if (e.key == Keys.Enter) {
                    buttonMash.initializingTypingTest();
                    break;
                }
            case 'restartTestButtonWithSameWordset':
                if (e.key == Keys.Enter) {
                    buttonMash.restartingTypingTest();
                    break;
                }
            case 'showWordHistoryButton':
                if (e.key == Keys.Enter) {
                    break;
                }
        }
    }
});
// Mode select
modes.addEventListener("click", function (e) {
    if (e.target.className != 'buttons' && modes.querySelectorAll('.text-button.active').item(0) != e.target) {
        modes.querySelectorAll('.text-button.active').item(0).classList.remove('active');
        e.target.classList.add('active');
        switch (e.target.getAttribute('mode')) {
            case 'time':
                Array.from(document.getElementsByClassName('group')).forEach(function (item) {
                    if (Array.from(item.classList).includes('hidden') || item.className == "group mode") {
                    }
                    else {
                        item.classList.add('hidden');
                        item.style.opacity = "0";
                    }
                });
                var groupTime = document.getElementsByClassName("group time hidden").item(0);
                groupTime.style.opacity = "1";
                groupTime.classList.remove('hidden');
                myJSON.mode = "time";
                buttonMash.initializingTypingTest();
                break;
            case 'quote':
                Array.from(document.getElementsByClassName('group')).forEach(function (item) {
                    if (Array.from(item.classList).includes('hidden') || item.className == "group mode") {
                    }
                    else {
                        item.classList.add('hidden');
                        item.style.opacity = "0";
                    }
                });
                var groupQuotes = document.getElementsByClassName("group quoteLength hidden").item(0);
                groupQuotes.style.opacity = "1";
                groupQuotes.classList.remove('hidden');
                myJSON.mode = "quote";
                buttonMash.initializingTypingTest();
                break;
            case 'custom':
                Array.from(document.getElementsByClassName('group')).forEach(function (item) {
                    if (Array.from(item.classList).includes('hidden') || item.className == "group mode") {
                    }
                    else {
                        item.classList.add('hidden');
                        item.style.opacity = "0";
                    }
                });
                var groupCustom = document.getElementsByClassName("group customText hidden").item(0);
                groupCustom.style.opacity = "1";
                groupCustom.classList.remove('hidden');
                myJSON.mode = "custom";
                break;
            default:
                console.log('Idk somthing went wrong in Mode select for switch-case');
                break;
        }
    }
});
// Time select [15, 30, 60, 120, custom]
times.addEventListener("click", function (e) {
    if (e.target.className != 'buttons') {
        if (times.querySelectorAll('.text-button.active').item(0) != e.target) {
            times.querySelectorAll('.text-button.active').item(0).classList.remove('active');
            e.target.classList.add('active');
            myJSON.time = e.target.getAttribute('timeconfig');
            buttonMash.initializingTypingTest();
        }
        if (e.target.getAttribute('timeconfig') == 'custom') {
            buttonMash.CustomTestDurationPopup();
        }
    }
});
// Custom time input
document.getElementById('customTimeInput').addEventListener('keydown', function (e) {
    var customTimeInput = document.getElementById('customTimeInput');
    var customTimePreview = document.getElementsByClassName('preview').item(0);
    setTimeout(function (e) {
        if (/^\d+$/.test(customTimeInput.value)) {
            customTimePreview.textContent = "".concat(customTimeInput.value, " seconds (No im not converting this time to 00:00:00)");
        }
        else {
            customTimePreview.textContent = 'Invalid input, please input time in seconds';
        }
    }, 10);
});
// Custom time input popup OK button
(_f = document.getElementsByClassName('button').item(0)) === null || _f === void 0 ? void 0 : _f.addEventListener('click', function (e) {
    var customTimeInput = document.getElementById('customTimeInput');
    var customTestPopup = document.getElementById('customTestDurationPopupWrapper');
    if (customTimeInput.value.length > 0 && /^\d+$/.test(customTimeInput.value)) {
        //console.log('It worked added number')
        myJSON.time = customTimeInput.value;
        myJSON.activeScene = 'typingTestScene';
        customTestPopup.classList.add('hidden');
        customTestPopup.style.opacity = "0";
        buttonMash.initializingTypingTest();
    }
    else {
        console.log("It didn't work");
    }
});
// Quote select [all, short, medium, long]
quotes.addEventListener("click", function (e) {
    if (e.target.className != 'buttons' && quotes.querySelectorAll('.text-button.active').item(0) != e.target) {
        quotes.querySelectorAll('.text-button.active').item(0).classList.remove('active');
        e.target.classList.add('active');
        myJSON.quoteLength = e.target.getAttribute('quotelength');
        buttonMash.initializingTypingTest();
    }
});
(_g = document.getElementsByClassName('logo').item(0)) === null || _g === void 0 ? void 0 : _g.addEventListener("click", function (e) {
    var _a;
    var activeWordIndex = Number(buttonMash.findActiveWord(wordCollection));
    var wordElement = wordCollection.item(activeWordIndex);
    var relativeBounds = typingTest.getBoundingClientRect();
    var letterCollection = wordElement.children;
    var typedLetters = buttonMash.getTypedLetters(letterCollection);
    var activeLetterBound = letterCollection.item(typedLetters).getBoundingClientRect();
    console.log("Letter element:", letterCollection.item(typedLetters), " \nactiveLetterBound:", activeLetterBound);
    console.log("Typingtest element:", typingTest, " \nrelativeBounds:", relativeBounds);
    console.log("Caret element:", document.getElementById("caret"), " \nCaret bounds:", (_a = document.getElementById("caret")) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect());
});
},{"../txt.json":2}],2:[function(require,module,exports){
module.exports={
    "words": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum" ,
    "quotes":
    [
        "och nu hör jag inte fläktarna längre så fort jag sätter en video i fullskärmsläge längre vilket är skönt",
        "jag gick in för att läsa skillnaden mellan vår nuvarande router och får nya isp router",
        "hur ska man annars uppdatera sin bios om man inte kan använda zen 3 och zen 2 inte kan göra en boot",
        "Gör en åtta kåt... för att det ska var grammatiskt rätt",   
        "Fet gubbe kastar heta saker på mig, Het gubbe kastar feta saker på mig",
        "I'm handling mourningwood. Are you trying to beat it? Yeah it's really hard",
        "Vad är den primitiva funktionen av hur mycket lemonad-ljus man får av en lémon?",
        "Det är lite svårt att räkna ut koncentrationen H2O i en vattenlösning",
        "Jag undrar om det finns en strippklubb i Stockholm, vi borde åka till Stockholm"
    ],
    "custom": ""
}
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi50cyIsInR4dC5qc29uIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQ0EseURBQWlDO0FBRWpDLElBQU0sVUFBVSxHQUFpQixRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3ZFLElBQU0sTUFBTSxHQUFpQixRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9ELElBQU0sWUFBWSxHQUFzQixRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzlFLElBQU0saUJBQWlCLEdBQWlCLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNyRixJQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDOUQsSUFBSSxLQUFLLEdBQXFCLE1BQUEsUUFBUSxDQUFDLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsMENBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0RyxJQUFJLEtBQUssR0FBcUIsTUFBQSxRQUFRLENBQUMsc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQywwQ0FBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RHLElBQUksTUFBTSxHQUFxQixNQUFBLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsMENBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUU5RyxJQUFJLE1BQU0sR0FBRztJQUNYLE1BQU0sRUFBRSxNQUFNO0lBQ2QsTUFBTSxFQUFFLElBQUk7SUFDWixhQUFhLEVBQUUsSUFBSTtJQUNuQixhQUFhLEVBQUUs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O0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgcmVzb3VyY2VMaW1pdHMgfSBmcm9tIFwid29ya2VyX3RocmVhZHNcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vdHh0Lmpzb25cIjtcclxuXHJcbmNvbnN0IHR5cGluZ1Rlc3QgPSA8SFRNTEVsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0eXBpbmdUZXN0Jyk7IFxyXG5jb25zdCByZXN1bHQgPSA8SFRNTEVsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQnKTsgXHJcbmNvbnN0IGlucHV0RWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd29yZHNJbnB1dCcpO1xyXG5jb25zdCByZXN0YXJ0VGVzdEJ1dHRvbiA9IDxIVE1MRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhcnRUZXN0QnV0dG9uJyk7XHJcbmNvbnN0IHdvcmRDb2xsZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnd29yZCcpXHJcbmxldCBtb2RlczogRWxlbWVudCA9IDxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJncm91cCBtb2RlXCIpLml0ZW0oMCk/LmNoaWxkcmVuLml0ZW0oMCk7XHJcbmxldCB0aW1lczogRWxlbWVudCA9IDxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJncm91cCB0aW1lXCIpLml0ZW0oMCk/LmNoaWxkcmVuLml0ZW0oMCk7XHJcbmxldCBxdW90ZXM6IEVsZW1lbnQgPSA8RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ3JvdXAgcXVvdGVMZW5ndGhcIikuaXRlbSgwKT8uY2hpbGRyZW4uaXRlbSgwKTtcclxuXHJcbmxldCBteUpTT04gPSB7XHJcbiAgXCJtb2RlXCI6IFwidGltZVwiLFxyXG4gIFwidGltZVwiOiBcIjMwXCIsXHJcbiAgXCJxdW90ZUxlbmd0aFwiOiBcIi0xXCIsXHJcbiAgXCJhY3RpdmVTY2VuZVwiOiBcInR5cGluZ1Rlc3RTY2VuZVwiXHJcbn1cclxuXHJcbmVudW0gS2V5cyB7XHJcbiAgQmFja3NwYWNlID0gXCJCYWNrc3BhY2VcIixcclxuICBFbnRlciA9IFwiRW50ZXJcIixcclxuICBTcGFjZWJhciA9IFwiIFwiXHJcbn1cclxuXHJcbi8vIFJlZG8gYnV0dG9uIGVudGVyLWJ1dHRvblxyXG4vL2Z1bmN0aW9uIGhlbHBlclJlZG9FbnRlcihlOiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbi8vICBpZiAoZS5rZXkgPT0gS2V5cy5FbnRlcikge1xyXG4vLyAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbi8vICAgIHR5cGluZ1Rlc3RSZXNldCgpO1xyXG4vLyAgICBzZXRUaW1lb3V0KHR5cGluZ1Rlc3RSZXNldCwgMTgwKTtcclxuLy8gIH1cclxuLy99XHJcblxyXG5cclxuXHJcblxyXG4vLyA6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6XHJcblxyXG5cclxuXHJcblxyXG5jbGFzcyBCdXR0b25NYXNoIHtcclxuICB3b3JkRGljdGlvbmFyeTogc3RyaW5nW11bXTtcclxuICBhY3RpdmVUZXh0OiBudW1iZXI7XHJcbiAgY291bnRlcjogbnVtYmVyO1xyXG4gIGludGVydmFsSWQ6IE5vZGVKUy5UaW1lcjtcclxuICBhZGl0aW9uYWxDaGVjazogYm9vbGVhbjtcclxuICBjdXN0b21UZXh0OiBzdHJpbmdbXTtcclxuICB0aW1lb3V0SUQ6IE5vZGVKUy5UaW1lcjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZVRleHQgPSAwO1xyXG4gICAgdGhpcy53b3JkRGljdGlvbmFyeSA9IHRoaXMud29yZFdyYXBwZXIoKTtcclxuICAgIHRoaXMuY291bnRlciA9ICtteUpTT04udGltZTtcclxuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHt9KVxyXG4gICAgdGhpcy5hZGl0aW9uYWxDaGVjayA9IHRydWU7XHJcbiAgICB0aGlzLmN1c3RvbVRleHQgPSBbJyddO1xyXG4gICAgdGhpcy50aW1lb3V0SUQgPSBzZXRUaW1lb3V0KCgpID0+IHt9KVxyXG4gIH1cclxuXHJcbiAgc3RhcnRUaW1lciAodGltZTogbnVtYmVyKSB7XHJcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJZClcclxuICAgIHRoaXMuY291bnRlciA9IHRpbWU7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVcIikhLnRleHRDb250ZW50ID0gdGhpcy5jb3VudGVyLnRvU3RyaW5nKCk7XHJcbiAgICB0aGlzLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuY291bnRlciAtPSAxO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVcIikhLnRleHRDb250ZW50ID0gdGhpcy5jb3VudGVyLnRvU3RyaW5nKCk7XHJcbiAgICAgIGlmICh0aGlzLmNvdW50ZXIgPT09IDApIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJZCk7XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hSZXN1bHRzVHlwaW5nVGVzdCgpO1xyXG4gICAgICB9XHJcbiAgICB9LCAxMDAwKVxyXG4gIH1cclxuXHJcbiAgQ3VzdG9tVGVzdER1cmF0aW9uUG9wdXAgKCkge1xyXG4gICAgbGV0IGN1c3RvbVRlc3RQb3B1cDpIVE1MRWxlbWVudCAgPSA8SFRNTEVsZW1lbnQgPmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b21UZXN0RHVyYXRpb25Qb3B1cFdyYXBwZXInKTtcclxuICAgIGxldCBjdXN0b21UaW1lSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1c3RvbVRpbWVJbnB1dCcpO1xyXG4gICAgaWYgKGN1c3RvbVRlc3RQb3B1cC5zdHlsZS5vcGFjaXR5ID09IFwiMFwiKSB7XHJcbiAgICAgIG15SlNPTi5hY3RpdmVTY2VuZSA9ICdjdXN0b21UZXN0RHVyYXRpb25Qb3B1cFNjZW5lJ1xyXG4gICAgICBjdXN0b21UZXN0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgIGN1c3RvbVRlc3RQb3B1cC5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcbiAgICAgIGN1c3RvbVRpbWVJbnB1dC5mb2N1cygpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXppbmdUeXBpbmdUZXN0ICgpIHtcclxuICAgIGxldCB3b3JkczogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3b3JkcycpO1xyXG4gICAgbGV0IHRpbWU6IEhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZScpO1xyXG5cclxuICAgIC8vIC0tIEZsYXNoZXMgdHlwaW5nIHRlc3QgLS1cclxuICAgIHR5cGluZ1Rlc3Quc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG4gICAgLy8gICAgICAgICAgICBNYWtlIHN1cmUgdGhhdCB0eXBpbmcgdGVzdCBkb2VzIG5vdCBoYXZlIGhpZGRlbiBhdHJpYnV0ZTtcclxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTtcclxuICAgIHdoaWxlICh3b3Jkcy5maXJzdENoaWxkKSB7XHJcbiAgICAgIHdvcmRzLnJlbW92ZUNoaWxkKHdvcmRzLmZpcnN0Q2hpbGQpO1xyXG4gICAgfVxyXG4gICAgc2V0VGltZW91dCgoZSkgPT4ge1xyXG4gICAgICB0aW1lLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxuICAgIH0sIDI1MClcclxuICAgIHRpbWUuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICB0aGlzLmFkaXRpb25hbENoZWNrID0gdHJ1ZTsgLy8gd2FudCB0byByZW1vdmUgYnV0IGlkayB3aGF0IGl0IGRvZXMgYW55bW9yZVxyXG4gICAgdGhpcy5jb3VudGVyID0gK215SlNPTi50aW1lO1xyXG4gICAgdGhpcy5jYXJldFJlc2V0KCk7XHJcbiAgICB0aGlzLndvcmREaWN0aW9uYXJ5ID0gdGhpcy53b3JkV3JhcHBlcigpXHJcbiAgICBpZiAodHlwaW5nVGVzdC5jbGFzc05hbWUgPT0gJ2hpZGRlbicpIHtcclxuICAgICAgdHlwaW5nVGVzdC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxyXG4gICAgICByZXN1bHQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcclxuICAgICAgdHlwaW5nVGVzdC5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcbiAgICAgIHJlc3VsdC5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcbiAgICB9XHJcbiAgICBpbnB1dEVsZW1lbnQuZm9jdXMoKVxyXG4gICAgbXlKU09OLmFjdGl2ZVNjZW5lID0gJ3R5cGluZ1Rlc3RTY2VuZSc7XHJcbiAgICBzZXRUaW1lb3V0KChlKSA9PiB7XHJcbiAgICAgIHR5cGluZ1Rlc3Quc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG4gICAgfSwgMTgwKVxyXG4gIH1cclxuXHJcbiAgXHJcbiAgcmVzdGFydGluZ1R5cGluZ1Rlc3QgKCkge1xyXG4gICAgbGV0IHdvcmRzOiBIVE1MRWxlbWVudCA9IDxIVE1MRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcmRzJyk7XHJcbiAgICBsZXQgdGltZTogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lJyk7XHJcblxyXG4gICAgLy8gLS0gRmxhc2hlcyB0eXBpbmcgdGVzdCAtLVxyXG4gICAgdHlwaW5nVGVzdC5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcbiAgICAvLyAgICAgICAgICAgIE1ha2Ugc3VyZSB0aGF0IHR5cGluZyB0ZXN0IGRvZXMgbm90IGhhdmUgaGlkZGVuIGF0cmlidXRlO1xyXG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpO1xyXG4gICAgc2V0VGltZW91dCgoZSkgPT4ge1xyXG4gICAgICB0aW1lLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxuICAgIH0sIDI1MClcclxuICAgIHRpbWUuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICB0aGlzLmFkaXRpb25hbENoZWNrID0gdHJ1ZTsgLy8gd2FudCB0byByZW1vdmUgYnV0IGlkayB3aGF0IGl0IGRvZXMgYW55bW9yZVxyXG4gICAgdGhpcy5jb3VudGVyID0gK215SlNPTi50aW1lO1xyXG4gICAgdGhpcy5jYXJldFJlc2V0KCk7XHJcbiAgICBpZiAodHlwaW5nVGVzdC5jbGFzc05hbWUgPT0gJ2hpZGRlbicpIHtcclxuICAgICAgdHlwaW5nVGVzdC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxyXG4gICAgICByZXN1bHQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcclxuICAgICAgdHlwaW5nVGVzdC5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcbiAgICAgIHJlc3VsdC5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcbiAgICB9XHJcbiAgICBpbnB1dEVsZW1lbnQuZm9jdXMoKVxyXG4gICAgbXlKU09OLmFjdGl2ZVNjZW5lID0gJ2N1c3RvbVRlc3REdXJhdGlvblBvcHVwU2NlbmUnO1xyXG4gICAgc2V0VGltZW91dCgoZSkgPT4ge1xyXG4gICAgICB0eXBpbmdUZXN0LnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgIH0sIDE4MClcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgdG9nZ2xlVGFiSW5kZXgoKSB7XHJcblxyXG4gIH1cclxuICAqL1xyXG5cclxuICBnZXRXb3JkTGlzdCAoKSB7XHJcbiAgICBsZXQgbW9kZSA9IDxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2dyb3VwIG1vZGUnKS5pdGVtKDApPy5jaGlsZHJlbi5pdGVtKDApO1xyXG4gICAgc3dpdGNoIChtb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZXh0LWJ1dHRvbi5hY3RpdmUnKS5pdGVtKDApLmdldEF0dHJpYnV0ZSgnbW9kZScpKSB7XHJcbiAgICAgIGNhc2UgXCJ0aW1lXCI6XHJcbiAgICAgICAgbGV0IHdvcmRBcnJheSA9IFN0cmluZyhjb25maWcud29yZHMpLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRJbmRleCA9IHdvcmRBcnJheS5sZW5ndGgsIHRlbXBvcmFyeVZhbHVlLCByYW5kb21JbmRleFxyXG4gICAgICAgIHdoaWxlICgwICE9IGN1cnJlbnRJbmRleCkge1xyXG4gICAgICAgICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xyXG4gICAgICAgICAgY3VycmVudEluZGV4IC09IDE7XHJcbiAgICAgICAgICB0ZW1wb3JhcnlWYWx1ZSA9IHdvcmRBcnJheVtjdXJyZW50SW5kZXhdO1xyXG4gICAgICAgICAgd29yZEFycmF5W2N1cnJlbnRJbmRleF0gPSB3b3JkQXJyYXlbcmFuZG9tSW5kZXhdO1xyXG4gICAgICAgICAgd29yZEFycmF5W3JhbmRvbUluZGV4XSA9IHRlbXBvcmFyeVZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gd29yZEFycmF5O1xyXG4gICAgICBjYXNlIFwicXVvdGVcIjpcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb25maWcucXVvdGVzLmxlbmd0aCk7XHJcbiAgICAgICAgICBpZiAoaW5kZXggIT0gdGhpcy5hY3RpdmVUZXh0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FyZXRSZXNldCgpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVRleHQgPSBpbmRleDtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5xdW90ZXNbaW5kZXhdLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICBjYXNlIFwiY3VzdG9tXCI6XHJcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tVGV4dC5sZW5ndGggPiAwKSB0aGlzLmN1c3RvbVRleHQgPSBwcm9tcHQoJ0VudGVyIHRlc3QnKSEuc3BsaXQoJyAnKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXN0b21UZXh0O1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGFsZXJ0KCdnZXRXb3JkTGlzdCgpIGRlZmF1bHRlZCcpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gU2hvdWxkIGJlIGJha2VkIGludG8gaW5pdGlhbGl6aW5nVHlwaW5nVGVzdFxyXG4gIHN3aXRjaFJlc3VsdHNUeXBpbmdUZXN0ICgpIHtcclxuICAgIHR5cGluZ1Rlc3Quc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG4gICAgdHlwaW5nVGVzdC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgcmVzdWx0LnN0eWxlLm9wYWNpdHkgPSBcIjFcIlxyXG4gICAgcmVzdWx0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICBteUpTT04uYWN0aXZlU2NlbmUgPSAncmVzdWx0U2NlbmUnO1xyXG4gICAgLy9jb25zb2xlLmxvZygnU2hvd2luZyByZXN1bHRzJyk7XHJcbiAgfVxyXG5cclxuICBnZXRUeXBlZExldHRlcnMobGV0dGVyQ29sbGVjdGlvbjogSFRNTENvbGxlY3Rpb24pOm51bWJlciB7XHJcbiAgICBsZXQgdHlwZWRMZXR0ZXJzOiBudW1iZXIgPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZXR0ZXJDb2xsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChsZXR0ZXJDb2xsZWN0aW9uLml0ZW0oaSk/LmNsYXNzTmFtZSAhPSAnJykge1xyXG4gICAgICAgIHR5cGVkTGV0dGVycysrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHlwZWRMZXR0ZXJzO1xyXG4gIH1cclxuXHJcbiAgd29yZFdyYXBwZXIoKTogc3RyaW5nW11bXSB7XHJcbiAgICBsZXQgd29yZExpc3Q6IHN0cmluZ1tdID0gPHN0cmluZ1tdPiB0aGlzLmdldFdvcmRMaXN0KCk7XHJcbiAgICBsZXQgd29yZERpY3Rpb25hcnk6IHN0cmluZ1tdW10gPSBbW11dO1xyXG4gICAgbGV0IGxldHRlckRpY3Rpb25hcnk6IHN0cmluZ1tdO1xyXG5cclxuICAgIGZvciAobGV0IHdvcmRJbmRleCA9IDA7IHdvcmRJbmRleCA8IHdvcmRMaXN0Lmxlbmd0aDsgd29yZEluZGV4KyspIHtcclxuICAgICAgbGV0IHdvcmRzUGFyZW50ID0gPEhUTUxFbGVtZW50ID4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcmRzJyk7XHJcbiAgICAgIGxldCBuZXdXb3JkID0gPEhUTUxFbGVtZW50PiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgIG5ld1dvcmQuY2xhc3NMaXN0LmFkZCgnd29yZCcpO1xyXG4gICAgICB3b3Jkc1BhcmVudC5hcHBlbmRDaGlsZChuZXdXb3JkKTtcclxuICAgICAgbGV0dGVyRGljdGlvbmFyeSA9IFtdO1xyXG5cclxuICAgICAgZm9yIChsZXQgbGV0dGVySW5kZXggPSAwOyBsZXR0ZXJJbmRleCA8IHdvcmRMaXN0W3dvcmRJbmRleF0uc3BsaXQoXCJcIikubGVuZ3RoOyBsZXR0ZXJJbmRleCsrKXtcclxuICAgICAgICBsZXQgbGV0dGVyQ2hpbGQgPSA8RWxlbWVudD4gd29yZENvbGxlY3Rpb24uaXRlbSh3b3JkSW5kZXgpO1xyXG5cclxuICAgICAgICBsZXQgbGV0dGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGV0dGVyJyk7XHJcbiAgICAgICAgbGV0IGxldHRlclZhbHVlID0gd29yZExpc3Rbd29yZEluZGV4XS5zcGxpdChcIlwiKVtsZXR0ZXJJbmRleF07XHJcbiAgICAgICAgbGV0dGVyRGljdGlvbmFyeS5wdXNoKGxldHRlclZhbHVlKTtcclxuICAgICAgICBsZXR0ZXIudGV4dENvbnRlbnQgPSBsZXR0ZXJWYWx1ZTtcclxuICAgICAgICBsZXR0ZXJDaGlsZC5hcHBlbmRDaGlsZChsZXR0ZXIpO1xyXG4gICAgICB9XHJcbiAgICAgIHdvcmREaWN0aW9uYXJ5W3dvcmRJbmRleF0gPSBsZXR0ZXJEaWN0aW9uYXJ5O1xyXG4gICAgfVxyXG4gICAgd29yZENvbGxlY3Rpb24uaXRlbSgwKT8uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICByZXR1cm4gd29yZERpY3Rpb25hcnlcclxuICB9XHJcblxyXG4gIHdvcmRBZGQoaW5wdXRDaGFyOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGxldCBhY3RpdmVXb3JkSW5kZXg6IG51bWJlciA9IE51bWJlcih0aGlzLmZpbmRBY3RpdmVXb3JkKHdvcmRDb2xsZWN0aW9uKSk7IC8vIEluZGV4IG9mIHRoZSB3b3JkIHdpdGggdGhlIGFjdGl2ZSBjbGFzcyB3aXRoaW4gYSBIVE1MQ29sbGVjdGlvbiBvZiB3b3JkLlxyXG4gICAgbGV0IHdvcmRFbGVtZW50OiBFbGVtZW50ID0gPEVsZW1lbnQ+IHdvcmRDb2xsZWN0aW9uLml0ZW0oYWN0aXZlV29yZEluZGV4KTsgLy8gV29yZCBlbGVtZW50IHdpdGggYWN0aXZlIGNsYXNzLlxyXG4gICAgbGV0IGxldHRlckNvbGxlY3Rpb24gPSA8SFRNTENvbGxlY3Rpb24+IHdvcmRFbGVtZW50LmNoaWxkcmVuOyAvLyBIVE1MQ29sbGVjdGlvbiB3aXRoIGxldHRlciBlbGVtZW50cy5cclxuICAgIGxldCB0eXBlZExldHRlcnM6IG51bWJlciA9IHRoaXMuZ2V0VHlwZWRMZXR0ZXJzKGxldHRlckNvbGxlY3Rpb24pOyAvLyBudW1iZXIgb2YgdGhlIGN1cnJlbnQgbnVtYmVyIG9mIGxldHRlcnMgd2l0aCBhIHZhbGlkIGNsYXNzIHVuZGVyIHRoZSBhY3RpdmUgd29yZC5cclxuICAgIGxldCB0aW1lOiBIVE1MRWxlbWVudCA9IDxIVE1MRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lXCIpXHJcblxyXG4gICAgaWYgKHRoaXMuY291bnRlciA9PSArbXlKU09OLnRpbWUgJiYgdGhpcy5hZGl0aW9uYWxDaGVjayA9PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuc3RhcnRUaW1lcigrbXlKU09OLnRpbWUpXHJcbiAgICAgIHRoaXMuYWRpdGlvbmFsQ2hlY2sgPSBmYWxzZTtcclxuICAgICAgdGltZS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgICB0aW1lLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZWRMZXR0ZXJzIDwgdGhpcy53b3JkRGljdGlvbmFyeVthY3RpdmVXb3JkSW5kZXhdLmxlbmd0aCAmJiB0eXBlZExldHRlcnMgPCB0aGlzLndvcmREaWN0aW9uYXJ5W2FjdGl2ZVdvcmRJbmRleF0ubGVuZ3RoICsgMTApIHtcclxuICAgICAgaWYgKGlucHV0Q2hhciA9PSBsZXR0ZXJDb2xsZWN0aW9uLml0ZW0odHlwZWRMZXR0ZXJzKT8udGV4dENvbnRlbnQpIHtcclxuICAgICAgICBsZXR0ZXJDb2xsZWN0aW9uLml0ZW0odHlwZWRMZXR0ZXJzKSEuY2xhc3NOYW1lID0gJ2NvcnJlY3QnO1xyXG4gICAgICB9IGVsc2UgaWYgKGlucHV0Q2hhciAhPSBsZXR0ZXJDb2xsZWN0aW9uLml0ZW0odHlwZWRMZXR0ZXJzKT8udGV4dENvbnRlbnQpIHtcclxuICAgICAgICBsZXR0ZXJDb2xsZWN0aW9uLml0ZW0odHlwZWRMZXR0ZXJzKSEuY2xhc3NOYW1lID0gJ2luY29ycmVjdCc7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jYXJldExldHRlcihsZXR0ZXJDb2xsZWN0aW9uLml0ZW0odHlwZWRMZXR0ZXJzKSk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVkTGV0dGVycyA+IHRoaXMud29yZERpY3Rpb25hcnlbYWN0aXZlV29yZEluZGV4XS5sZW5ndGggLSAxICYmIHR5cGVkTGV0dGVycyA8IHRoaXMud29yZERpY3Rpb25hcnlbYWN0aXZlV29yZEluZGV4XS5sZW5ndGggKyAxMCkge1xyXG4gICAgICBsZXQgbmV3TGV0dGVyOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xldHRlcicpXHJcbiAgICAgIG5ld0xldHRlci50ZXh0Q29udGVudCA9IGlucHV0Q2hhclxyXG4gICAgICBuZXdMZXR0ZXIuY2xhc3NMaXN0LmFkZCgnaW5jb3JyZWN0JywgJ2V4dHJhJylcclxuICAgICAgd29yZEVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3TGV0dGVyKVxyXG4gICAgICB0aGlzLmNhcmV0TGV0dGVyKGxldHRlckNvbGxlY3Rpb24uaXRlbSh0eXBlZExldHRlcnMpKTtcclxuICAgIH1cclxuICAgIGlucHV0RWxlbWVudC52YWx1ZSA9ICcnO1xyXG4gIH1cclxuXHJcbiAgd29yZERlbGV0ZShhbHQgPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgbGV0IGFjdGl2ZVdvcmRJbmRleDogbnVtYmVyID0gTnVtYmVyKHRoaXMuZmluZEFjdGl2ZVdvcmQod29yZENvbGxlY3Rpb24pKTsgLy8gSW5kZXggb2YgdGhlIHdvcmQgd2l0aCB0aGUgYWN0aXZlIGNsYXNzIHdpdGhpbiBhIEhUTUxDb2xsZWN0aW9uIG9mIHdvcmQuXHJcbiAgICBsZXQgd29yZEVsZW1lbnQ6IEVsZW1lbnQgPSA8RWxlbWVudD4gd29yZENvbGxlY3Rpb24uaXRlbShhY3RpdmVXb3JkSW5kZXgpOyAvLyBXb3JkIGVsZW1lbnQgd2l0aCBhY3RpdmUgY2xhc3MuXHJcbiAgICBsZXQgbGV0dGVyQ29sbGVjdGlvbiA9IDxIVE1MQ29sbGVjdGlvbj4gd29yZEVsZW1lbnQuY2hpbGRyZW47IC8vIEhUTUxDb2xsZWN0aW9uIHdpdGggbGV0dGVyIGVsZW1lbnRzLlxyXG4gICAgbGV0IHR5cGVkTGV0dGVyczogbnVtYmVyID0gdGhpcy5nZXRUeXBlZExldHRlcnMobGV0dGVyQ29sbGVjdGlvbik7IC8vIG51bWJlciBvZiB0aGUgY3VycmVudCBudW1iZXIgb2YgbGV0dGVycyB3aXRoIGEgdmFsaWQgY2xhc3MgdW5kZXIgdGhlIGFjdGl2ZSB3b3JkLlxyXG4gICAgbGV0IHByZXZXb3JkRWxlbWVudDogRWxlbWVudCA9IDxFbGVtZW50PiB3b3JkQ29sbGVjdGlvbi5pdGVtKGFjdGl2ZVdvcmRJbmRleCAtIDEpOyAvLyBXb3JkIGVsZW1lbnQgb2YgcHJldmlvdXMgd29yZFxyXG5cclxuICAgIGlmIChhbHQpIHtcclxuICAgICAgaWYgKHR5cGVkTGV0dGVycyA9PSAwICYmIGFjdGl2ZVdvcmRJbmRleCAhPSAwICYmIHByZXZXb3JkRWxlbWVudC5jbGFzc0xpc3RbcHJldldvcmRFbGVtZW50LmNsYXNzTGlzdC5sZW5ndGggLSAxXSA9PSAnZXJyb3InKSB7IC8vY3RybC1iYWNrc3BhY2UgaWYgYXQgc3RhcnQgb2YgYSB3b3JkIGFuZCBkZWxldGVzIHRvIHRoZSBzdGFydCBvZiB0aGUgcHJldmlvdXMgd29yZFxyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmdldFR5cGVkTGV0dGVycyhwcmV2V29yZEVsZW1lbnQuY2hpbGRyZW4pOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgaWYgKGkgPCB0aGlzLndvcmREaWN0aW9uYXJ5W2FjdGl2ZVdvcmRJbmRleCAtIDFdLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBwcmV2V29yZEVsZW1lbnQuY2hpbGRyZW4uaXRlbShpKSEuY2xhc3NOYW1lID0gJyc7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwcmV2V29yZEVsZW1lbnQuY2hpbGRyZW4uaXRlbShpKT8ucmVtb3ZlKClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYXJrV29yZEVycm9yKHByZXZXb3JkRWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5tYXJrV29yZEFjdGl2ZShwcmV2V29yZEVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuY2FyZXRXb3JkKHByZXZXb3JkRWxlbWVudCk7XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZWRMZXR0ZXJzICE9IDApIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gdHlwZWRMZXR0ZXJzOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgaWYgKGkgPCB0aGlzLndvcmREaWN0aW9uYXJ5W2FjdGl2ZVdvcmRJbmRleF0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldHRlckNvbGxlY3Rpb24uaXRlbShpKSEuY2xhc3NOYW1lID0gJyc7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXR0ZXJDb2xsZWN0aW9uLml0ZW0oaSk/LnJlbW92ZSgpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FyZXRXb3JkKHdvcmRFbGVtZW50KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlICBpZiAodHlwZWRMZXR0ZXJzID09IDAgJiYgYWN0aXZlV29yZEluZGV4ICE9IDApIHsgLy8gQ2hlY2tzIGlmIGNhcmV0KG5vdCB0aGUgcG9pc2l0aW9uIGl0c2VsZikgaXMgYXQgdGhlIHN0YXJ0IG9mIHRoZSB3b3JkIGFuZCB0aGF0IHRoZSBhY3RpdmUgd29yZCBpc250IHRoZSBmaXJzdCB3b3JkXHJcbiAgICAgIGlmIChwcmV2V29yZEVsZW1lbnQuY2xhc3NMaXN0W3ByZXZXb3JkRWxlbWVudC5jbGFzc0xpc3QubGVuZ3RoIC0gMV0gPT0gJ2Vycm9yJykgeyAvLyBDaGVja3MgaWYgcHJldmlvdXMgd29yZCBoYXMgYW4gZXJyb3IgY2xhc3NcclxuICAgICAgICB0aGlzLm1hcmtXb3JkRXJyb3IocHJldldvcmRFbGVtZW50KTtcclxuICAgICAgICB0aGlzLm1hcmtXb3JkQWN0aXZlKHByZXZXb3JkRWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5jYXJldExldHRlcihwcmV2V29yZEVsZW1lbnQuY2hpbGRyZW4uaXRlbSh0aGlzLmdldFR5cGVkTGV0dGVycyhwcmV2V29yZEVsZW1lbnQuY2hpbGRyZW4pIC0gMSkpOyAvLyBNb3ZlcyB0aGUgY2FyZXQgdG8gdGhlIGxldHRlciBwb3NpdGlvbiBvZiB0aGUgbGFzdCBsZXR0ZXJcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlZExldHRlcnMgIT0gMCkge1xyXG4gICAgICBpZiAodHlwZWRMZXR0ZXJzIC0gMSA8IHRoaXMud29yZERpY3Rpb25hcnlbYWN0aXZlV29yZEluZGV4XS5sZW5ndGgpIHsgLy8gSWYgd2l0aGluIHdhbnRlZCB3b3JkXHJcbiAgICAgICAgaWYgKHR5cGVkTGV0dGVycyA9PSAxKSB7IC8vIElmIG9uIHRoZSBmaXJzdGxldHRlclxyXG4gICAgICAgICAgbGV0dGVyQ29sbGVjdGlvbi5pdGVtKHR5cGVkTGV0dGVycyAtIDEpIS5jbGFzc05hbWUgPSAnJztcclxuICAgICAgICAgIHRoaXMuY2FyZXRXb3JkKHdvcmRFbGVtZW50KTtcclxuICAgICAgICB9IGVsc2UgeyAvLyBOb3Qgb24gZmlyc3QgbGV0dGVyXHJcbiAgICAgICAgICBsZXR0ZXJDb2xsZWN0aW9uLml0ZW0odHlwZWRMZXR0ZXJzIC0gMSkhLmNsYXNzTmFtZSA9ICcnO1xyXG4gICAgICAgICAgdGhpcy5jYXJldExldHRlcihsZXR0ZXJDb2xsZWN0aW9uLml0ZW0odHlwZWRMZXR0ZXJzIC0gMikpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHsgLy8gTm90IHdpdGhpbiB3YW50ZWQgd29yZCwgdGhlcmVmb3JlIGNhbiBqdXN0IHJlbW92ZSBsYXN0IGNoaWxkXHJcbiAgICAgICAgd29yZEVsZW1lbnQubGFzdENoaWxkPy5yZW1vdmUoKTtcclxuICAgICAgICB0aGlzLmNhcmV0TGV0dGVyKGxldHRlckNvbGxlY3Rpb24uaXRlbSh0eXBlZExldHRlcnMgLSAyKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHdvcmROZXh0KCk6IHZvaWQge1xyXG4gICAgbGV0IGFjdGl2ZVdvcmRJbmRleDogbnVtYmVyID0gTnVtYmVyKHRoaXMuZmluZEFjdGl2ZVdvcmQod29yZENvbGxlY3Rpb24pKTsgLy8gSW5kZXggb2YgdGhlIHdvcmQgd2l0aCB0aGUgYWN0aXZlIGNsYXNzIHdpdGhpbiBhIEhUTUxDb2xsZWN0aW9uIG9mIHdvcmQuXHJcbiAgICBsZXQgd29yZEVsZW1lbnQ6IEVsZW1lbnQgPSA8RWxlbWVudD4gd29yZENvbGxlY3Rpb24uaXRlbShhY3RpdmVXb3JkSW5kZXgpOyAvLyBXb3JkIGVsZW1lbnQgd2l0aCBhY3RpdmUgY2xhc3MuXHJcbiAgICBsZXQgbGV0dGVyQ29sbGVjdGlvbiA9IDxIVE1MQ29sbGVjdGlvbj4gd29yZEVsZW1lbnQuY2hpbGRyZW47IC8vIEhUTUxDb2xsZWN0aW9uIHdpdGggbGV0dGVyIGVsZW1lbnRzLlxyXG4gICAgbGV0IHR5cGVkTGV0dGVyczogbnVtYmVyID0gdGhpcy5nZXRUeXBlZExldHRlcnMobGV0dGVyQ29sbGVjdGlvbik7IC8vIG51bWJlciBvZiB0aGUgY3VycmVudCBudW1iZXIgb2YgbGV0dGVycyB3aXRoIGEgdmFsaWQgY2xhc3MgdW5kZXIgdGhlIGFjdGl2ZSB3b3JkLlxyXG5cclxuICAgIGlmICh0eXBlZExldHRlcnMgPiAwKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdGhpcy5tYXJrV29yZEFjdGl2ZSh3b3JkQ29sbGVjdGlvbi5pdGVtKGFjdGl2ZVdvcmRJbmRleCArIDEpKTtcclxuICAgICAgICB0aGlzLmNhcmV0V29yZCh3b3JkQ29sbGVjdGlvbi5pdGVtKGFjdGl2ZVdvcmRJbmRleCArIDEpKTtcclxuICAgICAgICB0aGlzLm1hcmtXb3JkRXJyb3Iod29yZEVsZW1lbnQpO1xyXG4gICAgICAgIGlucHV0RWxlbWVudC52YWx1ZSA9ICcnO1xyXG4gICAgICB9IFxyXG4gICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnPj4+IENvbmdyYXR6IHlvdSB3b24gOiknKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGNhcmV0TGV0dGVyIChsZXR0ZXI6IEVsZW1lbnQgfCBudWxsKTogdm9pZCB7XHJcbiAgICBsZXQgY2FyZXRTdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FyZXRcIikhLnN0eWxlO1xyXG4gICAgbGV0IGFjdGl2ZUxldHRlckJvdW5kOiBET01SZWN0ID0gbGV0dGVyIS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGxldCByZWxhdGl2ZUJvdW5kczogRE9NUmVjdCA9IHR5cGluZ1Rlc3QhLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgXHJcbiAgICBjYXJldFN0eWxlLmFuaW1hdGlvbk5hbWUgPSBcIm5vbmVcIjtcclxuICAgIGNhcmV0U3R5bGUubGVmdCA9IChhY3RpdmVMZXR0ZXJCb3VuZC5yaWdodCAtIHJlbGF0aXZlQm91bmRzLmxlZnQpLnRvU3RyaW5nKCkgKyBcInB4XCI7XHJcbiAgICBjYXJldFN0eWxlLnRvcCA9IChhY3RpdmVMZXR0ZXJCb3VuZC50b3AgLSByZWxhdGl2ZUJvdW5kcy50b3AgLSAoKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FyZXRcIikhLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCkgLSBhY3RpdmVMZXR0ZXJCb3VuZC5oZWlnaHQpLzIpLnRvU3RyaW5nKCkgKyBcInB4XCI7XHJcbiAgfVxyXG5cclxuICBjYXJldFdvcmQgKHdvcmQ6IEVsZW1lbnQgfCBudWxsKTogdm9pZCB7XHJcbiAgICBsZXQgY2FyZXRTdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FyZXRcIikhLnN0eWxlO1xyXG4gICAgbGV0IHJlbGF0aXZlQm91bmRzOiBET01SZWN0ID0gdHlwaW5nVGVzdCEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBsZXQgYWN0aXZlV29yZEJvdW5kOiBET01SZWN0ID0gd29yZCEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgY2FyZXRTdHlsZS5sZWZ0ID0gKGFjdGl2ZVdvcmRCb3VuZC5sZWZ0IC0gcmVsYXRpdmVCb3VuZHMubGVmdCkudG9TdHJpbmcoKSArIFwicHhcIjtcclxuICAgIGNhcmV0U3R5bGUudG9wID0gKGFjdGl2ZVdvcmRCb3VuZC50b3AgLSByZWxhdGl2ZUJvdW5kcy50b3AgLSAoKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FyZXRcIikhLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCkgLSBhY3RpdmVXb3JkQm91bmQuaGVpZ2h0KS8yKS50b1N0cmluZygpICsgXCJweFwiO1xyXG4gICAgY2FyZXRTdHlsZS5hbmltYXRpb25OYW1lID0gXCJub25lXCI7XHJcbiAgfVxyXG5cclxuICBjYXJldFJlc2V0ICgpOiB2b2lkIHtcclxuICAgIGxldCBjYXJldFN0eWxlOiBDU1NTdHlsZURlY2xhcmF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXJldFwiKSEuc3R5bGU7XHJcbiAgICBcclxuICAgIGlucHV0RWxlbWVudC52YWx1ZSA9ICcnO1xyXG4gICAgY2FyZXRTdHlsZS5sZWZ0ID0gXCI1cHhcIjtcclxuICAgIGNhcmV0U3R5bGUudG9wID0gXCIxcHhcIjtcclxuICB9XHJcbiAgXHJcbiAgZmluZEFjdGl2ZVdvcmQod29yZENvbGxlY3Rpb246IEhUTUxDb2xsZWN0aW9uT2Y8RWxlbWVudD4pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd29yZENvbGxlY3Rpb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgd29yZENvbGxlY3Rpb24uaXRlbShpKSEuY2xhc3NMaXN0Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICBpZiAod29yZENvbGxlY3Rpb24uaXRlbShpKSEuY2xhc3NMaXN0W2pdID09ICdhY3RpdmUnKXtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtYXJrV29yZEFjdGl2ZSAobmV3V29yZEVsZW06IEVsZW1lbnQgfCBudWxsKTogdm9pZCB7XHJcbiAgICBsZXQgYWN0aXZlV29yZEluZGV4ID0gTnVtYmVyKHRoaXMuZmluZEFjdGl2ZVdvcmQod29yZENvbGxlY3Rpb24pKVxyXG4gICAgd29yZENvbGxlY3Rpb24uaXRlbShhY3RpdmVXb3JkSW5kZXgpPy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgIG5ld1dvcmRFbGVtIS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExvb3BzIHRocm91Z2ggdGhlIGxldHRlciBlbGVtZW5kcyB1bmRlciB1bmRlciB3b3JkRWxlbS4gSWYgYW55IGhhcyBhICdpbmNvcnJlY3QnIGNsYXNzLCBlcnJvciBjbGFzcyB3aWxsIGJlIGFkZGVkIHRvIHdvcmRFbGVtLCBpdCBtYWtlcyBhIHJlZCBsaW5lIHVuZGVyIHRoZSB3b3JkXHJcbiAgICogQHBhcmFtIHdvcmRFbGVtIFxyXG4gICAqL1xyXG4gIG1hcmtXb3JkRXJyb3IgKHdvcmRFbGVtOiBFbGVtZW50IHwgbnVsbCkge1xyXG4gICAgbGV0IGxldHRlckNvbGxlY3Rpb246IEhUTUxDb2xsZWN0aW9uID0gd29yZEVsZW0hLmNoaWxkcmVuO1xyXG4gICAgaWYgKHdvcmRFbGVtPy5jbGFzc05hbWUgPT0gJ3dvcmQgZXJyb3InKSB7XHJcbiAgICAgIHdvcmRFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJylcclxuICAgIH0gXHJcbiAgICBlbHNlIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZXR0ZXJDb2xsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxldHRlckNvbGxlY3Rpb24uaXRlbShpKT8uY2xhc3NOYW1lID09ICdpbmNvcnJlY3QnIHx8IGxldHRlckNvbGxlY3Rpb24uaXRlbShpKT8uY2xhc3NOYW1lID09ICcnIHx8IGxldHRlckNvbGxlY3Rpb24uaXRlbShpKT8uY2xhc3NOYW1lID09ICdpbmNvcnJlY3QgZXh0cmEnKSB7XHJcbiAgICAgICAgICB3b3JkRWxlbT8uY2xhc3NMaXN0LmFkZCgnZXJyb3InKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4vLyA6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6XHJcblxyXG5cclxuXHJcblxyXG5sZXQgYnV0dG9uTWFzaDogQnV0dG9uTWFzaCA9IG5ldyBCdXR0b25NYXNoKClcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpIHtcclxuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKS5pdGVtKDApIS5zdHlsZS5jdXJzb3IgPT0gJ25vbmUnKXtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JykuaXRlbSgwKSEuc3R5bGUuY3Vyc29yID0gXCJkZWZhdWx0XCI7XHJcbiAgfVxyXG59KVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gIGlmIChteUpTT04uYWN0aXZlU2NlbmUgPT0gXCJ0eXBpbmdUZXN0U2NlbmVcIikge1xyXG4gICAgLy9jb25zb2xlLmxvZygnZm9jdXMnKTtcclxuICAgIGlucHV0RWxlbWVudC5mb2N1cygpO1xyXG4gIH1cclxufSlcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZnVuY3Rpb24oZSkge1xyXG4gIGlmIChteUpTT04uYWN0aXZlU2NlbmUgPT0gXCJ0eXBpbmdUZXN0U2NlbmVcIiAmJiBlLmtleSAhPSBLZXlzLkVudGVyKSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKCdmb2N1cycpO1xyXG4gICAgaW5wdXRFbGVtZW50LmZvY3VzKCk7XHJcbiAgfVxyXG59KVxyXG5cclxuXHJcbi8vIElucHV0LCB0ZXN0LCBiYWNrc3BhY2UsIGN0cmwtYmFja3NwYWNlIGFuZCBzcGFjZVxyXG5pbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGZ1bmN0aW9uKGUpIHtcclxuICBsZXQgaW5wdXRDaGFyOiBzdHJpbmcgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZS50YXJnZXQpLnZhbHVlO1xyXG4gIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpLml0ZW0oMCkhLnN0eWxlLmN1cnNvciA9PSAnZGVmYXVsdCcpe1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKS5pdGVtKDApIS5zdHlsZS5jdXJzb3IgPSBcIm5vbmVcIjtcclxuICB9XHJcbiAgYnV0dG9uTWFzaC53b3JkQWRkKGlucHV0Q2hhcik7XHJcbn0pO1xyXG5pbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKS5pdGVtKDApIS5zdHlsZS5jdXJzb3IgPT0gJ2RlZmF1bHQnKXtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JykuaXRlbSgwKSEuc3R5bGUuY3Vyc29yID0gXCJub25lXCI7XHJcbiAgfVxyXG4gIHN3aXRjaCAoZS5rZXkpIHtcclxuICAgIGNhc2UgKEtleXMuQmFja3NwYWNlKTp7IC8vIGJhY2tzcGFjZVxyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgaWYgKGUuY3RybEtleSkge1xyXG4gICAgICAgIGJ1dHRvbk1hc2gud29yZERlbGV0ZSh0cnVlKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGJ1dHRvbk1hc2gud29yZERlbGV0ZSgpXHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7fVxyXG4gICAgY2FzZSAoS2V5cy5TcGFjZWJhcik6eyAvLyBzcGFjZVxyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgYnV0dG9uTWFzaC53b3JkTmV4dCgpXHJcbiAgICAgIGJyZWFrO31cclxuICB9XHJcbn0pXHJcblxyXG4vLyBSZXN0YXJ0IGJ1dHRvbiwgY2xpY2sgYW5kIGVudGVyXHJcbnJlc3RhcnRUZXN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgYnV0dG9uTWFzaC5pbml0aWFsaXppbmdUeXBpbmdUZXN0KClcclxufSk7IFxyXG5yZXN0YXJ0VGVzdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZTogS2V5Ym9hcmRFdmVudCkge1xyXG4gIGlmIChlLmtleSA9PSBLZXlzLkVudGVyKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGJ1dHRvbk1hc2guaW5pdGlhbGl6aW5nVHlwaW5nVGVzdCgpXHJcbiAgfVxyXG59KVxyXG5cclxuLy8gUmVzdWx0cyBzY2VuZSBidXR0b25zIENMSUNLXHJcbmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvdHRvbScpLml0ZW0oMCk/LmNoaWxkcmVuLml0ZW0oMCk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gIGlmICgoPEhUTUxJbnB1dEVsZW1lbnQ+ZS50YXJnZXQpLmNsYXNzTmFtZSAhPSAnYnV0dG9ucycpIHtcclxuICAgIC8vY29uc29sZS5sb2coKDxIVE1MSW5wdXRFbGVtZW50PmUudGFyZ2V0KS5nZXRBdHRyaWJ1dGUoJ2lkJyksICg8SFRNTElucHV0RWxlbWVudD5lLnRhcmdldCkucGFyZW50RWxlbWVudD8uZ2V0QXR0cmlidXRlKCdpZCcpKTtcclxuICAgIHN3aXRjaCAoKDxIVE1MSW5wdXRFbGVtZW50PmUudGFyZ2V0KS5nZXRBdHRyaWJ1dGUoJ2lkJykgfHwgKDxIVE1MSW5wdXRFbGVtZW50PmUudGFyZ2V0KS5wYXJlbnRFbGVtZW50Py5nZXRBdHRyaWJ1dGUoJ2lkJykpIHtcclxuICAgICAgY2FzZSAnbmV4dFRlc3RCdXR0b24nOlxyXG4gICAgICAgIGJ1dHRvbk1hc2guaW5pdGlhbGl6aW5nVHlwaW5nVGVzdCgpXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3Jlc3RhcnRUZXN0QnV0dG9uV2l0aFNhbWVXb3Jkc2V0JzpcclxuICAgICAgICBidXR0b25NYXNoLnJlc3RhcnRpbmdUeXBpbmdUZXN0KClcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnc2hvd1dvcmRIaXN0b3J5QnV0dG9uJzpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbn0pXHJcbi8vIFJlc3VsdHMgc2NlbmUgYnV0dG9ucyBFTlRFUiBLRVlcclxuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm90dG9tJykuaXRlbSgwKSEuY2hpbGRyZW4uaXRlbSgwKSEuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAvL2NvbnNvbGUubG9nKCg8S2V5Ym9hcmRFdmVudD5lKS5rZXkpXHJcbiAgaWYgKCg8SFRNTElucHV0RWxlbWVudD5lLnRhcmdldCkuY2xhc3NOYW1lICE9ICdidXR0b25zJykge1xyXG4gICAgLy9jb25zb2xlLmxvZygoPEhUTUxJbnB1dEVsZW1lbnQ+ZS50YXJnZXQpLmdldEF0dHJpYnV0ZSgnaWQnKSwgKDxIVE1MSW5wdXRFbGVtZW50PmUudGFyZ2V0KS5wYXJlbnRFbGVtZW50Py5nZXRBdHRyaWJ1dGUoJ2lkJykpO1xyXG4gICAgc3dpdGNoICgoPEhUTUxJbnB1dEVsZW1lbnQ+ZS50YXJnZXQpLmdldEF0dHJpYnV0ZSgnaWQnKSB8fCAoPEhUTUxJbnB1dEVsZW1lbnQ+ZS50YXJnZXQpLnBhcmVudEVsZW1lbnQ/LmdldEF0dHJpYnV0ZSgnaWQnKSkge1xyXG4gICAgICBjYXNlICduZXh0VGVzdEJ1dHRvbic6XHJcbiAgICAgICAgaWYgKCg8S2V5Ym9hcmRFdmVudD5lKS5rZXkgPT0gS2V5cy5FbnRlcil7XHJcbiAgICAgICAgICBidXR0b25NYXNoLmluaXRpYWxpemluZ1R5cGluZ1Rlc3QoKVxyXG4gICAgICAgICAgYnJlYWs7fVxyXG4gICAgICBjYXNlICdyZXN0YXJ0VGVzdEJ1dHRvbldpdGhTYW1lV29yZHNldCc6XHJcbiAgICAgICAgaWYgKCg8S2V5Ym9hcmRFdmVudD5lKS5rZXkgPT0gS2V5cy5FbnRlcil7XHJcbiAgICAgICAgICBidXR0b25NYXNoLnJlc3RhcnRpbmdUeXBpbmdUZXN0KClcclxuICAgICAgICAgIGJyZWFrO31cclxuICAgICAgY2FzZSAnc2hvd1dvcmRIaXN0b3J5QnV0dG9uJzpcclxuICAgICAgICBpZiAoKDxLZXlib2FyZEV2ZW50PmUpLmtleSA9PSBLZXlzLkVudGVyKXtcclxuICAgICAgICAgIGJyZWFrO31cclxuICAgIH1cclxuICB9XHJcbn0pXHJcblxyXG5cclxuLy8gTW9kZSBzZWxlY3RcclxubW9kZXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuICBpZiAoKDxIVE1MSW5wdXRFbGVtZW50PmUudGFyZ2V0KS5jbGFzc05hbWUgIT0gJ2J1dHRvbnMnICYmIG1vZGVzLnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZXh0LWJ1dHRvbi5hY3RpdmUnKS5pdGVtKDApICE9ICg8SFRNTElucHV0RWxlbWVudD5lLnRhcmdldCkpIHtcclxuICAgIG1vZGVzLnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZXh0LWJ1dHRvbi5hY3RpdmUnKS5pdGVtKDApLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgKDxIVE1MSW5wdXRFbGVtZW50PmUudGFyZ2V0KS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgIHN3aXRjaCAoKDxIVE1MSW5wdXRFbGVtZW50PmUudGFyZ2V0KS5nZXRBdHRyaWJ1dGUoJ21vZGUnKSkge1xyXG4gICAgICBjYXNlICd0aW1lJzpcclxuICAgICAgICBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2dyb3VwJykpLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgaWYgKEFycmF5LmZyb20oaXRlbS5jbGFzc0xpc3QpLmluY2x1ZGVzKCdoaWRkZW4nKSB8fCBpdGVtLmNsYXNzTmFtZSA9PSBcImdyb3VwIG1vZGVcIikge1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgKDxIVE1MRWxlbWVudD5pdGVtKS5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBsZXQgZ3JvdXBUaW1lID0gPEhUTUxFbGVtZW50PiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ3JvdXAgdGltZSBoaWRkZW5cIikuaXRlbSgwKTtcclxuICAgICAgICBncm91cFRpbWUhLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgICAgICBncm91cFRpbWUhLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXHJcbiAgICAgICAgbXlKU09OLm1vZGUgPSBcInRpbWVcIjtcclxuICAgICAgICBidXR0b25NYXNoLmluaXRpYWxpemluZ1R5cGluZ1Rlc3QoKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdxdW90ZSc6XHJcbiAgICAgICAgQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdncm91cCcpKS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgIGlmIChBcnJheS5mcm9tKGl0ZW0uY2xhc3NMaXN0KS5pbmNsdWRlcygnaGlkZGVuJykgfHwgaXRlbS5jbGFzc05hbWUgPT0gXCJncm91cCBtb2RlXCIpIHtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICg8SFRNTEVsZW1lbnQ+aXRlbSkuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbGV0IGdyb3VwUXVvdGVzID0gPEhUTUxFbGVtZW50PiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ3JvdXAgcXVvdGVMZW5ndGggaGlkZGVuXCIpLml0ZW0oMCk7XHJcbiAgICAgICAgZ3JvdXBRdW90ZXMhLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgICAgICBncm91cFF1b3RlcyEuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcclxuICAgICAgICBteUpTT04ubW9kZSA9IFwicXVvdGVcIjtcclxuICAgICAgICBidXR0b25NYXNoLmluaXRpYWxpemluZ1R5cGluZ1Rlc3QoKVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdjdXN0b20nOlxyXG4gICAgICAgIEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ3JvdXAnKSkuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICBpZiAoQXJyYXkuZnJvbShpdGVtLmNsYXNzTGlzdCkuaW5jbHVkZXMoJ2hpZGRlbicpIHx8IGl0ZW0uY2xhc3NOYW1lID09IFwiZ3JvdXAgbW9kZVwiKSB7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAoPEhUTUxFbGVtZW50Pml0ZW0pLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGxldCBncm91cEN1c3RvbSA9IDxIVE1MRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImdyb3VwIGN1c3RvbVRleHQgaGlkZGVuXCIpLml0ZW0oMCk7XHJcbiAgICAgICAgZ3JvdXBDdXN0b20hLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgICAgICBncm91cEN1c3RvbSEuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcclxuICAgICAgICBteUpTT04ubW9kZSA9IFwiY3VzdG9tXCI7XHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLmxvZygnSWRrIHNvbXRoaW5nIHdlbnQgd3JvbmcgaW4gTW9kZSBzZWxlY3QgZm9yIHN3aXRjaC1jYXNlJyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cclxuLy8gVGltZSBzZWxlY3QgWzE1LCAzMCwgNjAsIDEyMCwgY3VzdG9tXVxyXG50aW1lcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xyXG4gIGlmICgoPEhUTUxJbnB1dEVsZW1lbnQ+ZS50YXJnZXQpLmNsYXNzTmFtZSAhPSAnYnV0dG9ucycpIHtcclxuICAgIGlmICh0aW1lcy5xdWVyeVNlbGVjdG9yQWxsKCcudGV4dC1idXR0b24uYWN0aXZlJykuaXRlbSgwKSAhPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZS50YXJnZXQpKSB7XHJcbiAgICAgIHRpbWVzLnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZXh0LWJ1dHRvbi5hY3RpdmUnKS5pdGVtKDApLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+ZS50YXJnZXQpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICBteUpTT04udGltZSA9ICg8c3RyaW5nPig8SFRNTElucHV0RWxlbWVudD5lLnRhcmdldCkuZ2V0QXR0cmlidXRlKCd0aW1lY29uZmlnJykpO1xyXG4gICAgICBidXR0b25NYXNoLmluaXRpYWxpemluZ1R5cGluZ1Rlc3QoKVxyXG4gICAgfSBcclxuICAgIGlmICgoPEhUTUxJbnB1dEVsZW1lbnQ+ZS50YXJnZXQpLmdldEF0dHJpYnV0ZSgndGltZWNvbmZpZycpID09ICdjdXN0b20nKXtcclxuICAgICAgYnV0dG9uTWFzaC5DdXN0b21UZXN0RHVyYXRpb25Qb3B1cCgpO1xyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXHJcbi8vIEN1c3RvbSB0aW1lIGlucHV0XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b21UaW1lSW5wdXQnKSEuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICBsZXQgY3VzdG9tVGltZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ICA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b21UaW1lSW5wdXQnKTtcclxuICBsZXQgY3VzdG9tVGltZVByZXZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcmV2aWV3JykuaXRlbSgwKTtcclxuICBzZXRUaW1lb3V0KChlKSA9PiB7XHJcbiAgICBpZiAoL15cXGQrJC8udGVzdChjdXN0b21UaW1lSW5wdXQudmFsdWUpKSB7XHJcbiAgICAgIGN1c3RvbVRpbWVQcmV2aWV3IS50ZXh0Q29udGVudCA9IGAke2N1c3RvbVRpbWVJbnB1dC52YWx1ZX0gc2Vjb25kcyAoTm8gaW0gbm90IGNvbnZlcnRpbmcgdGhpcyB0aW1lIHRvIDAwOjAwOjAwKWBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGN1c3RvbVRpbWVQcmV2aWV3IS50ZXh0Q29udGVudCA9ICdJbnZhbGlkIGlucHV0LCBwbGVhc2UgaW5wdXQgdGltZSBpbiBzZWNvbmRzJ1xyXG4gICAgfVxyXG4gIH0sIDEwKTtcclxufSlcclxuXHJcbi8vIEN1c3RvbSB0aW1lIGlucHV0IHBvcHVwIE9LIGJ1dHRvblxyXG5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdidXR0b24nKS5pdGVtKDApPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICBsZXQgY3VzdG9tVGltZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ICA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b21UaW1lSW5wdXQnKTtcclxuICBsZXQgY3VzdG9tVGVzdFBvcHVwOkhUTUxFbGVtZW50ICA9IDxIVE1MRWxlbWVudCA+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1c3RvbVRlc3REdXJhdGlvblBvcHVwV3JhcHBlcicpO1xyXG4gIGlmIChjdXN0b21UaW1lSW5wdXQudmFsdWUubGVuZ3RoID4gMCAmJiAvXlxcZCskLy50ZXN0KGN1c3RvbVRpbWVJbnB1dC52YWx1ZSkpIHtcclxuICAgIC8vY29uc29sZS5sb2coJ0l0IHdvcmtlZCBhZGRlZCBudW1iZXInKVxyXG4gICAgbXlKU09OLnRpbWUgPSBjdXN0b21UaW1lSW5wdXQudmFsdWU7XHJcbiAgICBteUpTT04uYWN0aXZlU2NlbmUgPSAndHlwaW5nVGVzdFNjZW5lJ1xyXG4gICAgY3VzdG9tVGVzdFBvcHVwLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgY3VzdG9tVGVzdFBvcHVwLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxuICAgIGJ1dHRvbk1hc2guaW5pdGlhbGl6aW5nVHlwaW5nVGVzdCgpXHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUubG9nKFwiSXQgZGlkbid0IHdvcmtcIilcclxuICB9XHJcbn0pXHJcblxyXG4vLyBRdW90ZSBzZWxlY3QgW2FsbCwgc2hvcnQsIG1lZGl1bSwgbG9uZ11cclxucXVvdGVzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgaWYgKCg8SFRNTElucHV0RWxlbWVudD5lLnRhcmdldCkuY2xhc3NOYW1lICE9ICdidXR0b25zJyAmJiBxdW90ZXMucXVlcnlTZWxlY3RvckFsbCgnLnRleHQtYnV0dG9uLmFjdGl2ZScpLml0ZW0oMCkgIT0gKDxIVE1MSW5wdXRFbGVtZW50PmUudGFyZ2V0KSkge1xyXG4gICAgcXVvdGVzLnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZXh0LWJ1dHRvbi5hY3RpdmUnKS5pdGVtKDApLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgKDxIVE1MSW5wdXRFbGVtZW50PmUudGFyZ2V0KS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgIG15SlNPTi5xdW90ZUxlbmd0aCA9ICg8c3RyaW5nPig8SFRNTElucHV0RWxlbWVudD5lLnRhcmdldCkuZ2V0QXR0cmlidXRlKCdxdW90ZWxlbmd0aCcpKTtcclxuICAgIGJ1dHRvbk1hc2guaW5pdGlhbGl6aW5nVHlwaW5nVGVzdCgpXHJcbiAgfVxyXG59KVxyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbG9nbycpLml0ZW0oMCk/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgbGV0IGFjdGl2ZVdvcmRJbmRleDogbnVtYmVyID0gTnVtYmVyKGJ1dHRvbk1hc2guZmluZEFjdGl2ZVdvcmQod29yZENvbGxlY3Rpb24pKTtcclxuICBsZXQgd29yZEVsZW1lbnQ6IEVsZW1lbnQgPSA8RWxlbWVudD4gd29yZENvbGxlY3Rpb24uaXRlbShhY3RpdmVXb3JkSW5kZXgpO1xyXG4gIGxldCByZWxhdGl2ZUJvdW5kczogRE9NUmVjdCA9IHR5cGluZ1Rlc3QhLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gIGxldCBsZXR0ZXJDb2xsZWN0aW9uID0gPEhUTUxDb2xsZWN0aW9uPiB3b3JkRWxlbWVudC5jaGlsZHJlbjtcclxuICBsZXQgdHlwZWRMZXR0ZXJzOiBudW1iZXIgPSBidXR0b25NYXNoLmdldFR5cGVkTGV0dGVycyhsZXR0ZXJDb2xsZWN0aW9uKTtcclxuICBsZXQgYWN0aXZlTGV0dGVyQm91bmQ6IERPTVJlY3QgPSBsZXR0ZXJDb2xsZWN0aW9uLml0ZW0odHlwZWRMZXR0ZXJzKSEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gIGNvbnNvbGUubG9nKFwiTGV0dGVyIGVsZW1lbnQ6XCIsIGxldHRlckNvbGxlY3Rpb24uaXRlbSh0eXBlZExldHRlcnMpLCAgIFwiIFxcbmFjdGl2ZUxldHRlckJvdW5kOlwiLCBhY3RpdmVMZXR0ZXJCb3VuZClcclxuICBjb25zb2xlLmxvZyhcIlR5cGluZ3Rlc3QgZWxlbWVudDpcIiwgdHlwaW5nVGVzdCwgICBcIiBcXG5yZWxhdGl2ZUJvdW5kczpcIiwgcmVsYXRpdmVCb3VuZHMpXHJcbiAgY29uc29sZS5sb2coXCJDYXJldCBlbGVtZW50OlwiLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhcmV0XCIpLCBcIiBcXG5DYXJldCBib3VuZHM6XCIsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FyZXRcIik/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKVxyXG59KSIsIm1vZHVsZS5leHBvcnRzPXtcclxuICAgIFwid29yZHNcIjogXCJMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LCBzZWQgZG8gZWl1c21vZCB0ZW1wb3IgaW5jaWRpZHVudCB1dCBsYWJvcmUgZXQgZG9sb3JlIG1hZ25hIGFsaXF1YS4gVXQgZW5pbSBhZCBtaW5pbSB2ZW5pYW0sIHF1aXMgbm9zdHJ1ZCBleGVyY2l0YXRpb24gdWxsYW1jbyBsYWJvcmlzIG5pc2kgdXQgYWxpcXVpcCBleCBlYSBjb21tb2RvIGNvbnNlcXVhdC4gRHVpcyBhdXRlIGlydXJlIGRvbG9yIGluIHJlcHJlaGVuZGVyaXQgaW4gdm9sdXB0YXRlIHZlbGl0IGVzc2UgY2lsbHVtIGRvbG9yZSBldSBmdWdpYXQgbnVsbGEgcGFyaWF0dXIuIEV4Y2VwdGV1ciBzaW50IG9jY2FlY2F0IGN1cGlkYXRhdCBub24gcHJvaWRlbnQsIHN1bnQgaW4gY3VscGEgcXVpIG9mZmljaWEgZGVzZXJ1bnQgbW9sbGl0IGFuaW0gaWQgZXN0IGxhYm9ydW1cIiAsXHJcbiAgICBcInF1b3Rlc1wiOlxyXG4gICAgW1xyXG4gICAgICAgIFwib2NoIG51IGjDtnIgamFnIGludGUgZmzDpGt0YXJuYSBsw6RuZ3JlIHPDpSBmb3J0IGphZyBzw6R0dGVyIGVuIHZpZGVvIGkgZnVsbHNrw6RybXNsw6RnZSBsw6RuZ3JlIHZpbGtldCDDpHIgc2vDtm50XCIsXHJcbiAgICAgICAgXCJqYWcgZ2ljayBpbiBmw7ZyIGF0dCBsw6RzYSBza2lsbG5hZGVuIG1lbGxhbiB2w6VyIG51dmFyYW5kZSByb3V0ZXIgb2NoIGbDpXIgbnlhIGlzcCByb3V0ZXJcIixcclxuICAgICAgICBcImh1ciBza2EgbWFuIGFubmFycyB1cHBkYXRlcmEgc2luIGJpb3Mgb20gbWFuIGludGUga2FuIGFudsOkbmRhIHplbiAzIG9jaCB6ZW4gMiBpbnRlIGthbiBnw7ZyYSBlbiBib290XCIsXHJcbiAgICAgICAgXCJHw7ZyIGVuIMOldHRhIGvDpXQuLi4gZsO2ciBhdHQgZGV0IHNrYSB2YXIgZ3JhbW1hdGlza3QgcsOkdHRcIiwgICBcclxuICAgICAgICBcIkZldCBndWJiZSBrYXN0YXIgaGV0YSBzYWtlciBww6UgbWlnLCBIZXQgZ3ViYmUga2FzdGFyIGZldGEgc2FrZXIgcMOlIG1pZ1wiLFxyXG4gICAgICAgIFwiSSdtIGhhbmRsaW5nIG1vdXJuaW5nd29vZC4gQXJlIHlvdSB0cnlpbmcgdG8gYmVhdCBpdD8gWWVhaCBpdCdzIHJlYWxseSBoYXJkXCIsXHJcbiAgICAgICAgXCJWYWQgw6RyIGRlbiBwcmltaXRpdmEgZnVua3Rpb25lbiBhdiBodXIgbXlja2V0IGxlbW9uYWQtbGp1cyBtYW4gZsOlciBhdiBlbiBsw6ltb24/XCIsXHJcbiAgICAgICAgXCJEZXQgw6RyIGxpdGUgc3bDpXJ0IGF0dCByw6RrbmEgdXQga29uY2VudHJhdGlvbmVuIEgyTyBpIGVuIHZhdHRlbmzDtnNuaW5nXCIsXHJcbiAgICAgICAgXCJKYWcgdW5kcmFyIG9tIGRldCBmaW5ucyBlbiBzdHJpcHBrbHViYiBpIFN0b2NraG9sbSwgdmkgYm9yZGUgw6VrYSB0aWxsIFN0b2NraG9sbVwiXHJcbiAgICBdLFxyXG4gICAgXCJjdXN0b21cIjogXCJcIlxyXG59Il19
