const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgianBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//gernarates rondom word and checks if the letters are correct
function displayWord() {
    wordEl.innerHTML = `
    ${selectWord
        .split('')
        .map(
            letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
            `
        )
        .join('')}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if (innerWord === selectWord) {
        finalMessage.innerText = 'Crongratulation! You Won! 🥳'
        popup.style.display = 'flex';
    }
}

//update the wrong letters 
function updateWrongLettersEl() {
    //display wrong letters
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wonrg</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'You lost, try again! 😕';
        popup.style.display = 'flex';
    }
}

//show notification 
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

//keydown letter press
window.addEventListener('keydown', e => {
    //console.log(e.keyCode);

    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

//restart games 
playAgianBtn.addEventListener('click', () => {
    //empty array
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
});

displayWord();