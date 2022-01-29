import { resourceLimits } from "worker_threads";
import config from "../txt.json";

const typingTest = <HTMLElement> document.getElementById('typingTest'); 
const result = <HTMLElement> document.getElementById('result'); 
const inputElement = <HTMLInputElement> document.getElementById('wordsInput');
const restartTestButton = <HTMLElement> document.getElementById('restartTestButton');
const wordCollection = document.getElementsByClassName('word')
let modes: Element = <Element>document.getElementsByClassName("group mode").item(0)?.children.item(0);
let times: Element = <Element>document.getElementsByClassName("group time").item(0)?.children.item(0);
let quotes: Element = <Element>document.getElementsByClassName("group quoteLength").item(0)?.children.item(0);

let myJSON = {
  "mode": "time",
  "time": "30",
  "quoteLength": "-1",
  "activeScene": "typingTestScene"
}

enum Keys {
  Backspace = "Backspace",
  Enter = "Enter",
  Spacebar = " "
}

// Redo button enter-button
//function helperRedoEnter(e: KeyboardEvent): void {
//  if (e.key == Keys.Enter) {
//    e.preventDefault();
//    typingTestReset();
//    setTimeout(typingTestReset, 180);
//  }
//}




// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::




class ButtonMash {
  wordDictionary: string[][];
  activeText: number;
  counter: number;
  intervalId: NodeJS.Timer;
  aditionalCheck: boolean;
  customText: string[];
  timeoutID: NodeJS.Timer;

  constructor() {
    this.activeText = 0;
    this.wordDictionary = this.wordWrapper();
    this.counter = +myJSON.time;
    this.intervalId = setInterval(() => {})
    this.aditionalCheck = true;
    this.customText = [''];
    this.timeoutID = setTimeout(() => {})
  }

  startTimer (time: number) {
    clearInterval(this.intervalId)
    this.counter = time;
    document.getElementById("time")!.textContent = this.counter.toString();
    this.intervalId = setInterval(() => {
      this.counter -= 1;
      document.getElementById("time")!.textContent = this.counter.toString();
      if (this.counter === 0) {
        clearInterval(this.intervalId);
        this.switchResultsTypingTest();
      }
    }, 1000)
  }

  CustomTestDurationPopup () {
    let customTestPopup:HTMLElement  = <HTMLElement >document.getElementById('customTestDurationPopupWrapper');
    let customTimeInput: HTMLInputElement  = <HTMLInputElement>document.getElementById('customTimeInput');
    if (customTestPopup.style.opacity == "0") {
      myJSON.activeScene = 'customTestDurationPopupScene'
      customTestPopup.classList.remove('hidden');
      customTestPopup.style.opacity = "1";
      customTimeInput.focus()
    }
  }

  initializingTypingTest () {
    let words: HTMLElement = <HTMLElement> document.getElementById('words');
    let time: HTMLElement = <HTMLElement> document.getElementById('time');

    // -- Flashes typing test --
    typingTest.style.opacity = "0";
    //            Make sure that typing test does not have hidden atribute;
    clearInterval(this.intervalId);
    while (words.firstChild) {
      words.removeChild(words.firstChild);
    }
    setTimeout((e) => {
      time.style.opacity = "0";
    }, 250)
    time.classList.add('hidden');
    this.aditionalCheck = true; // want to remove but idk what it does anymore
    this.counter = +myJSON.time;
    this.caretReset();
    this.wordDictionary = this.wordWrapper()
    if (typingTest.className == 'hidden') {
      typingTest.classList.remove('hidden')
      result.classList.add('hidden')
      typingTest.style.opacity = "1";
      result.style.opacity = "0";
    }
    inputElement.focus()
    myJSON.activeScene = 'typingTestScene';
    setTimeout((e) => {
      typingTest.style.opacity = "1";
    }, 180)
  }

  
  restartingTypingTest () {
    let words: HTMLElement = <HTMLElement> document.getElementById('words');
    let time: HTMLElement = <HTMLElement> document.getElementById('time');

    // -- Flashes typing test --
    typingTest.style.opacity = "0";
    //            Make sure that typing test does not have hidden atribute;
    clearInterval(this.intervalId);
    setTimeout((e) => {
      time.style.opacity = "0";
    }, 250)
    time.classList.add('hidden');
    this.aditionalCheck = true; // want to remove but idk what it does anymore
    this.counter = +myJSON.time;
    this.caretReset();
    if (typingTest.className == 'hidden') {
      typingTest.classList.remove('hidden')
      result.classList.add('hidden')
      typingTest.style.opacity = "1";
      result.style.opacity = "0";
    }
    inputElement.focus()
    myJSON.activeScene = 'customTestDurationPopupScene';
    setTimeout((e) => {
      typingTest.style.opacity = "1";
    }, 180)
  }

  /*
  toggleTabIndex() {

  }
  */

  getWordList () {
    let mode = <Element>document.getElementsByClassName('group mode').item(0)?.children.item(0);
    switch (mode.querySelectorAll('.text-button.active').item(0).getAttribute('mode')) {
      case "time":
        let wordArray = String(config.words).split(' ');
        let currentIndex = wordArray.length, temporaryValue, randomIndex
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
          let index: number = Math.floor(Math.random() * config.quotes.length);
          if (index != this.activeText) {
            this.caretReset();
            this.activeText = index;
            return config.quotes[index].split(' ');
          }
        }
      case "custom":
        if (this.customText.length > 0) this.customText = prompt('Enter test')!.split(' ');
        return this.customText;
      default:
        alert('getWordList() defaulted');
        break;
    }
  }

  // Should be baked into initializingTypingTest
  switchResultsTypingTest () {
    typingTest.style.opacity = "0";
    typingTest.classList.add("hidden");
    result.style.opacity = "1"
    result.classList.remove("hidden");
    myJSON.activeScene = 'resultScene';
    //console.log('Showing results');
  }

  getTypedLetters(letterCollection: HTMLCollection):number {
    let typedLetters: number = 0;
    for (let i = 0; i < letterCollection.length; i++) {
      if (letterCollection.item(i)?.className != '') {
        typedLetters++;
      }
    }
    return typedLetters;
  }

  wordWrapper(): string[][] {
    let wordList: string[] = <string[]> this.getWordList();
    let wordDictionary: string[][] = [[]];
    let letterDictionary: string[];

    for (let wordIndex = 0; wordIndex < wordList.length; wordIndex++) {
      let wordsParent = <HTMLElement > document.getElementById('words');
      let newWord = <HTMLElement> document.createElement('div');

      newWord.classList.add('word');
      wordsParent.appendChild(newWord);
      letterDictionary = [];

      for (let letterIndex = 0; letterIndex < wordList[wordIndex].split("").length; letterIndex++){
        let letterChild = <Element> wordCollection.item(wordIndex);

        let letter = document.createElement('letter');
        let letterValue = wordList[wordIndex].split("")[letterIndex];
        letterDictionary.push(letterValue);
        letter.textContent = letterValue;
        letterChild.appendChild(letter);
      }
      wordDictionary[wordIndex] = letterDictionary;
    }
    wordCollection.item(0)?.classList.add('active');
    return wordDictionary
  }

  wordAdd(inputChar: string): void {
    let activeWordIndex: number = Number(this.findActiveWord(wordCollection)); // Index of the word with the active class within a HTMLCollection of word.
    let wordElement: Element = <Element> wordCollection.item(activeWordIndex); // Word element with active class.
    let letterCollection = <HTMLCollection> wordElement.children; // HTMLCollection with letter elements.
    let typedLetters: number = this.getTypedLetters(letterCollection); // number of the current number of letters with a valid class under the active word.
    let time: HTMLElement = <HTMLElement> document.getElementById("time")

    if (this.counter == +myJSON.time && this.aditionalCheck == true) {
      this.startTimer(+myJSON.time)
      this.aditionalCheck = false;
      time.classList.remove("hidden");
      time.style.opacity = "1";
    }

    if (typedLetters < this.wordDictionary[activeWordIndex].length && typedLetters < this.wordDictionary[activeWordIndex].length + 10) {
      if (inputChar == letterCollection.item(typedLetters)?.textContent) {
        letterCollection.item(typedLetters)!.className = 'correct';
      } else if (inputChar != letterCollection.item(typedLetters)?.textContent) {
        letterCollection.item(typedLetters)!.className = 'incorrect';
      }
      this.caretLetter(letterCollection.item(typedLetters));
    } else if (typedLetters > this.wordDictionary[activeWordIndex].length - 1 && typedLetters < this.wordDictionary[activeWordIndex].length + 10) {
      let newLetter: HTMLElement = document.createElement('letter')
      newLetter.textContent = inputChar
      newLetter.classList.add('incorrect', 'extra')
      wordElement.appendChild(newLetter)
      this.caretLetter(letterCollection.item(typedLetters));
    }
    inputElement.value = '';
  }

  wordDelete(alt = false): void {
    let activeWordIndex: number = Number(this.findActiveWord(wordCollection)); // Index of the word with the active class within a HTMLCollection of word.
    let wordElement: Element = <Element> wordCollection.item(activeWordIndex); // Word element with active class.
    let letterCollection = <HTMLCollection> wordElement.children; // HTMLCollection with letter elements.
    let typedLetters: number = this.getTypedLetters(letterCollection); // number of the current number of letters with a valid class under the active word.
    let prevWordElement: Element = <Element> wordCollection.item(activeWordIndex - 1); // Word element of previous word

    if (alt) {
      if (typedLetters == 0 && activeWordIndex != 0 && prevWordElement.classList[prevWordElement.classList.length - 1] == 'error') { //ctrl-backspace if at start of a word and deletes to the start of the previous word
        for (let i = this.getTypedLetters(prevWordElement.children); i >= 0; i--) {
          if (i < this.wordDictionary[activeWordIndex - 1].length) {
            prevWordElement.children.item(i)!.className = '';
          } else {
            prevWordElement.children.item(i)?.remove()
          }
        }
        this.markWordError(prevWordElement);
        this.markWordActive(prevWordElement);
        this.caretWord(prevWordElement);
      } else if (typedLetters != 0) {
        for (let i = typedLetters; i >= 0; i--) {
          if (i < this.wordDictionary[activeWordIndex].length) {
            letterCollection.item(i)!.className = '';
          } else {
            letterCollection.item(i)?.remove()
          }
        }
        this.caretWord(wordElement);
      }
    } else  if (typedLetters == 0 && activeWordIndex != 0) { // Checks if caret(not the poisition itself) is at the start of the word and that the active word isnt the first word
      if (prevWordElement.classList[prevWordElement.classList.length - 1] == 'error') { // Checks if previous word has an error class
        this.markWordError(prevWordElement);
        this.markWordActive(prevWordElement);
        this.caretLetter(prevWordElement.children.item(this.getTypedLetters(prevWordElement.children) - 1)); // Moves the caret to the letter position of the last letter
      }
    } else if (typedLetters != 0) {
      if (typedLetters - 1 < this.wordDictionary[activeWordIndex].length) { // If within wanted word
        if (typedLetters == 1) { // If on the firstletter
          letterCollection.item(typedLetters - 1)!.className = '';
          this.caretWord(wordElement);
        } else { // Not on first letter
          letterCollection.item(typedLetters - 1)!.className = '';
          this.caretLetter(letterCollection.item(typedLetters - 2));
        }
      } else { // Not within wanted word, therefore can just remove last child
        wordElement.lastChild?.remove();
        this.caretLetter(letterCollection.item(typedLetters - 2));
      }
    }
  }

  wordNext(): void {
    let activeWordIndex: number = Number(this.findActiveWord(wordCollection)); // Index of the word with the active class within a HTMLCollection of word.
    let wordElement: Element = <Element> wordCollection.item(activeWordIndex); // Word element with active class.
    let letterCollection = <HTMLCollection> wordElement.children; // HTMLCollection with letter elements.
    let typedLetters: number = this.getTypedLetters(letterCollection); // number of the current number of letters with a valid class under the active word.

    if (typedLetters > 0) {
      try {
        this.markWordActive(wordCollection.item(activeWordIndex + 1));
        this.caretWord(wordCollection.item(activeWordIndex + 1));
        this.markWordError(wordElement);
        inputElement.value = '';
      } 
      catch (error) {
        console.log('>>> Congratz you won :)')
      }
    }
  }
  
  caretLetter (letter: Element | null): void {
    let caretStyle: CSSStyleDeclaration = document.getElementById("caret")!.style;
    let activeLetterBound: DOMRect = letter!.getBoundingClientRect();
    let relativeBounds: DOMRect = typingTest!.getBoundingClientRect();
    
    caretStyle.animationName = "none";
    caretStyle.left = (activeLetterBound.right - relativeBounds.left).toString() + "px";
    caretStyle.top = (activeLetterBound.top - relativeBounds.top - ((document.getElementById("caret")!.getBoundingClientRect().height) - activeLetterBound.height)/2).toString() + "px";
  }

  caretWord (word: Element | null): void {
    let caretStyle: CSSStyleDeclaration = document.getElementById("caret")!.style;
    let relativeBounds: DOMRect = typingTest!.getBoundingClientRect();
    let activeWordBound: DOMRect = word!.getBoundingClientRect();

    caretStyle.left = (activeWordBound.left - relativeBounds.left).toString() + "px";
    caretStyle.top = (activeWordBound.top - relativeBounds.top - ((document.getElementById("caret")!.getBoundingClientRect().height) - activeWordBound.height)/2).toString() + "px";
    caretStyle.animationName = "none";
  }

  caretReset (): void {
    let caretStyle: CSSStyleDeclaration = document.getElementById("caret")!.style;
    
    inputElement.value = '';
    caretStyle.left = "5px";
    caretStyle.top = "1px";
  }
  
  findActiveWord(wordCollection: HTMLCollectionOf<Element>) {
    for (let i = 0; i < wordCollection.length; i++){
      try {
        for (let j = 0; j < wordCollection.item(i)!.classList.length; j++) {
          if (wordCollection.item(i)!.classList[j] == 'active'){
            return i;
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  markWordActive (newWordElem: Element | null): void {
    let activeWordIndex = Number(this.findActiveWord(wordCollection))
    wordCollection.item(activeWordIndex)?.classList.remove('active');
    newWordElem!.classList.add('active');
  }

  /**
   * Loops through the letter elemends under under wordElem. If any has a 'incorrect' class, error class will be added to wordElem, it makes a red line under the word
   * @param wordElem 
   */
  markWordError (wordElem: Element | null) {
    let letterCollection: HTMLCollection = wordElem!.children;
    if (wordElem?.className == 'word error') {
      wordElem.classList.remove('error')
    } 
    else {
      for (let i = 0; i < letterCollection.length; i++) {
        if (letterCollection.item(i)?.className == 'incorrect' || letterCollection.item(i)?.className == '' || letterCollection.item(i)?.className == 'incorrect extra') {
          wordElem?.classList.add('error');
        }

      }
    }
  }
}




// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::




let buttonMash: ButtonMash = new ButtonMash()

document.addEventListener('mousemove', function(e) {
  if (document.getElementsByTagName('body').item(0)!.style.cursor == 'none'){
    document.getElementsByTagName('body').item(0)!.style.cursor = "default";
  }
})

document.addEventListener("click", function() {
  if (myJSON.activeScene == "typingTestScene") {
    //console.log('focus');
    inputElement.focus();
  }
})
document.addEventListener("keydown", function(e) {
  if (myJSON.activeScene == "typingTestScene" && e.key != Keys.Enter) {
    //console.log('focus');
    inputElement.focus();
  }
})


// Input, test, backspace, ctrl-backspace and space
inputElement.addEventListener("input", function(e) {
  let inputChar: string = (<HTMLInputElement>e.target).value;
  if (document.getElementsByTagName('body').item(0)!.style.cursor == 'default'){
    document.getElementsByTagName('body').item(0)!.style.cursor = "none";
  }
  buttonMash.wordAdd(inputChar);
});
inputElement.addEventListener('keydown', function(e) {
  if (document.getElementsByTagName('body').item(0)!.style.cursor == 'default'){
    document.getElementsByTagName('body').item(0)!.style.cursor = "none";
  }
  switch (e.key) {
    case (Keys.Backspace):{ // backspace
      e.preventDefault()
      if (e.ctrlKey) {
        buttonMash.wordDelete(true)
      } else {
        buttonMash.wordDelete()
      }
      break;}
    case (Keys.Spacebar):{ // space
      e.preventDefault()
      buttonMash.wordNext()
      break;}
  }
})

// Restart button, click and enter
restartTestButton.addEventListener("click", function(e) {
  buttonMash.initializingTypingTest()
}); 
restartTestButton.addEventListener('keydown', function(e: KeyboardEvent) {
  if (e.key == Keys.Enter) {
    e.preventDefault()
    buttonMash.initializingTypingTest()
  }
})

// Results scene buttons CLICK
document.getElementsByClassName('bottom').item(0)?.children.item(0)?.addEventListener('click', function(e) {
  if ((<HTMLInputElement>e.target).className != 'buttons') {
    //console.log((<HTMLInputElement>e.target).getAttribute('id'), (<HTMLInputElement>e.target).parentElement?.getAttribute('id'));
    switch ((<HTMLInputElement>e.target).getAttribute('id') || (<HTMLInputElement>e.target).parentElement?.getAttribute('id')) {
      case 'nextTestButton':
        buttonMash.initializingTypingTest()
        break;
      case 'restartTestButtonWithSameWordset':
        buttonMash.restartingTypingTest()
        break;
      case 'showWordHistoryButton':
        break;
    }
  }
})
// Results scene buttons ENTER KEY
document.getElementsByClassName('bottom').item(0)!.children.item(0)!.addEventListener('keydown', function(e) {
  //console.log((<KeyboardEvent>e).key)
  if ((<HTMLInputElement>e.target).className != 'buttons') {
    //console.log((<HTMLInputElement>e.target).getAttribute('id'), (<HTMLInputElement>e.target).parentElement?.getAttribute('id'));
    switch ((<HTMLInputElement>e.target).getAttribute('id') || (<HTMLInputElement>e.target).parentElement?.getAttribute('id')) {
      case 'nextTestButton':
        if ((<KeyboardEvent>e).key == Keys.Enter){
          buttonMash.initializingTypingTest()
          break;}
      case 'restartTestButtonWithSameWordset':
        if ((<KeyboardEvent>e).key == Keys.Enter){
          buttonMash.restartingTypingTest()
          break;}
      case 'showWordHistoryButton':
        if ((<KeyboardEvent>e).key == Keys.Enter){
          break;}
    }
  }
})


// Mode select
modes.addEventListener("click", function(e) {
  if ((<HTMLInputElement>e.target).className != 'buttons' && modes.querySelectorAll('.text-button.active').item(0) != (<HTMLInputElement>e.target)) {
    modes.querySelectorAll('.text-button.active').item(0).classList.remove('active');
    (<HTMLInputElement>e.target).classList.add('active');
    switch ((<HTMLInputElement>e.target).getAttribute('mode')) {
      case 'time':
        Array.from(document.getElementsByClassName('group')).forEach(function(item) {
          if (Array.from(item.classList).includes('hidden') || item.className == "group mode") {
          } else {
            item.classList.add('hidden');
            (<HTMLElement>item).style.opacity = "0";
          }
        })
        let groupTime = <HTMLElement> document.getElementsByClassName("group time hidden").item(0);
        groupTime!.style.opacity = "1";
        groupTime!.classList.remove('hidden')
        myJSON.mode = "time";
        buttonMash.initializingTypingTest()
        break;
      case 'quote':
        Array.from(document.getElementsByClassName('group')).forEach(function(item) {
          if (Array.from(item.classList).includes('hidden') || item.className == "group mode") {
          } else {
            item.classList.add('hidden');
            (<HTMLElement>item).style.opacity = "0";
          }
        })
        let groupQuotes = <HTMLElement> document.getElementsByClassName("group quoteLength hidden").item(0);
        groupQuotes!.style.opacity = "1";
        groupQuotes!.classList.remove('hidden')
        myJSON.mode = "quote";
        buttonMash.initializingTypingTest()
        break;
      case 'custom':
        Array.from(document.getElementsByClassName('group')).forEach(function(item) {
          if (Array.from(item.classList).includes('hidden') || item.className == "group mode") {
          } else {
            item.classList.add('hidden');
            (<HTMLElement>item).style.opacity = "0";
          }
        })
        let groupCustom = <HTMLElement> document.getElementsByClassName("group customText hidden").item(0);
        groupCustom!.style.opacity = "1";
        groupCustom!.classList.remove('hidden')
        myJSON.mode = "custom";
        break
      default:
        console.log('Idk somthing went wrong in Mode select for switch-case');
        break;
    }
  }
})

// Time select [15, 30, 60, 120, custom]
times.addEventListener("click", function(e) {
  if ((<HTMLInputElement>e.target).className != 'buttons') {
    if (times.querySelectorAll('.text-button.active').item(0) != (<HTMLInputElement>e.target)) {
      times.querySelectorAll('.text-button.active').item(0).classList.remove('active');
      (<HTMLInputElement>e.target).classList.add('active');
      myJSON.time = (<string>(<HTMLInputElement>e.target).getAttribute('timeconfig'));
      buttonMash.initializingTypingTest()
    } 
    if ((<HTMLInputElement>e.target).getAttribute('timeconfig') == 'custom'){
      buttonMash.CustomTestDurationPopup();
    }
  }
})

// Custom time input
document.getElementById('customTimeInput')!.addEventListener('keydown', function(e) {
  let customTimeInput: HTMLInputElement  = <HTMLInputElement>document.getElementById('customTimeInput');
  let customTimePreview = document.getElementsByClassName('preview').item(0);
  setTimeout((e) => {
    if (/^\d+$/.test(customTimeInput.value)) {
      customTimePreview!.textContent = `${customTimeInput.value} seconds (No im not converting this time to 00:00:00)`
    } else {
      customTimePreview!.textContent = 'Invalid input, please input time in seconds'
    }
  }, 10);
})

// Custom time input popup OK button
document.getElementsByClassName('button').item(0)?.addEventListener('click', function(e) {
  let customTimeInput: HTMLInputElement  = <HTMLInputElement>document.getElementById('customTimeInput');
  let customTestPopup:HTMLElement  = <HTMLElement >document.getElementById('customTestDurationPopupWrapper');
  if (customTimeInput.value.length > 0 && /^\d+$/.test(customTimeInput.value)) {
    //console.log('It worked added number')
    myJSON.time = customTimeInput.value;
    myJSON.activeScene = 'typingTestScene'
    customTestPopup.classList.add('hidden');
    customTestPopup.style.opacity = "0";
    buttonMash.initializingTypingTest()
  } else {
    console.log("It didn't work")
  }
})

// Quote select [all, short, medium, long]
quotes.addEventListener("click", function(e) {
  if ((<HTMLInputElement>e.target).className != 'buttons' && quotes.querySelectorAll('.text-button.active').item(0) != (<HTMLInputElement>e.target)) {
    quotes.querySelectorAll('.text-button.active').item(0).classList.remove('active');
    (<HTMLInputElement>e.target).classList.add('active');
    myJSON.quoteLength = (<string>(<HTMLInputElement>e.target).getAttribute('quotelength'));
    buttonMash.initializingTypingTest()
  }
})

document.getElementsByClassName('logo').item(0)?.addEventListener("click", function(e) {
  let activeWordIndex: number = Number(buttonMash.findActiveWord(wordCollection));
  let wordElement: Element = <Element> wordCollection.item(activeWordIndex);
  let relativeBounds: DOMRect = typingTest!.getBoundingClientRect();
  let letterCollection = <HTMLCollection> wordElement.children;
  let typedLetters: number = buttonMash.getTypedLetters(letterCollection);
  let activeLetterBound: DOMRect = letterCollection.item(typedLetters)!.getBoundingClientRect();

  console.log("Letter element:", letterCollection.item(typedLetters),   " \nactiveLetterBound:", activeLetterBound)
  console.log("Typingtest element:", typingTest,   " \nrelativeBounds:", relativeBounds)
  console.log("Caret element:", document.getElementById("caret"), " \nCaret bounds:", document.getElementById("caret")?.getBoundingClientRect())
})