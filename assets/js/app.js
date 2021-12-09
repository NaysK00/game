const game = {
    // ilosc prob na zgadniecie
    attempts: 6,
    elemLetters: document.querySelector('.gameLetters'),
    elemattempts: document.querySelector('.attempts'),
    // pojemnik na kategorie
    elemCategory: document.querySelector(".gameCategory"),
    currentCategory: null,
    currentSentence: null,
    // haslo bez spacji
    currentSentenceLetters: null,
    // pojemnik na haslo
    elemSentence: document.querySelector('.gameSentence'),

    showCategory: function () {
        this.elemCategory.innerText = this.currentCategory
    },

    showAttempts: function () {
        this.elemattempts.innerText = this.attempts
    },


    generateLetterButtons: function () {
        const alphabet = ["a", "ą", "b", "c", "ć", "d", "e", "ę", "f", "g", "h", "i", "j", "k", "l", "ł", "m", "n", "ń", "o", "ó", "p", "q", "r", "s", "ś", "t", "u", "v", "w", "x", "y", "z", "ź", "ż"]
        alphabet.forEach((letter) => {
            const button = document.createElement('button');
            button.innerText = letter;
            this.elemLetters.appendChild(button)
            button.classList.add('gameLetter')

        })

    },

    // zabierz mozliwosc klikniecia w litery
    disableLetters: function () {
        const letters = this.elemLetters.querySelectorAll('.gameLetter')
        letters.forEach((letter) => {
            letter.disabled = true;
        })



    },

    // Daj mozliwosc klikniecia w litere
    enableLetters: function () {
        const letters = this.elemLetters.querySelectorAll('.gameLetter')
        letters.forEach((letter) => {
            letter.disabled = false;
        })
    },

    randomSentence: function () {
        this.elemSentence.innerText = ''
        let randomArrayIndex = Math.floor(Math.random() * phrases.length);
        let randomPhrase = phrases[randomArrayIndex];
        this.currentCategory = randomPhrase.category;
        this.showCategory();
        this.currentSentence = randomPhrase.slogan.toUpperCase();
        this.currentSentenceLetters = this.currentSentence.replace(/\s/g, "")

        let letters = this.currentSentence.split('')
        letters.forEach((letter) => {
            const div = document.createElement('div');
            div.classList.add('gameSentenceBox');
            if (letter === " ") {
                div.classList.add('gameSentenceSpace');

            }
            this.elemSentence.appendChild(div);
        })
    },

    // funkcja tworzaca tablice gry
    initBoard: function () {
        this.generateLetterButtons();
        this.disableLetters();
    },

    startGame: function () {
        // reset ilosc prob
        this.attempts = 6;
        this.showAttempts();
        this.enableLetters();
        this.randomSentence();
    }
}
game.initBoard();
document.querySelector(".gameStart").addEventListener("click", () => {
    game.startGame();
})