// Getting Required Elements
const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".wrapper .input-field");
const timeTag = document.querySelector(".time span b");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const tryAgainBtn = document.querySelector("button");

// Timer
let timer;
let maxTime = 60;
let timeLeft = maxTime;

// Character Index
let characterIndex = isTyping = mistakes = 0;

// Displaying Random Paragraph
function randomParagraph() {
  // Getting Random Number
  let randIndex = Math.floor(Math.random() * paragraphs.length);

  // Displaying The Random Paragraph
  paragraphs[randIndex].split("").forEach(span => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });

  // Focusing On Input Tag
  document.addEventListener("keydown", () => {
    inputField.focus();
  })
  typingText.addEventListener("click", () => {
    inputField.focus();
  })
}

// initTyping
function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedCharacter = inputField.value.split("")[characterIndex];
  if (characterIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      // Timer Won't Start On Every Click
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    if (typedCharacter == null) {
      // Validating Whether No Character Is Entered
      characterIndex--; // Decrementing characterIndex
      if (characters[characterIndex].classList.contains("incorrect")) {
        mistakes--;
      }
      characters[characterIndex].classList.remove("correct", "incorrect");
    } else {
      if (characters[characterIndex].innerText === typedCharacter) {
        // Validating User Typed Characters
        characters[characterIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[characterIndex].classList.add("incorrect");
      }
      characterIndex++; // Increment characterIndex
    }
    characters.forEach(span => span.classList.remove("active"));
    characters[characterIndex].classList.add("active");
  
    let wpm = Math.round((((characterIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = wpm;
    cpmTag.innerText = characterIndex - mistakes; // CPM Will Not Count Mistakes
  } else {
    inputField.value = "";
    clearInterval(timer);
  }
}

// initTimer
function initTimer() {
  // Decrementing Time When timeLeft Is Greater Than 0
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
}

randomParagraph();
inputField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);