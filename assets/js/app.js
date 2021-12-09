const game = {
    // ilosc prob na zgadniecie
    attempts: 6,
    elemLetters: document.querySelector('.gameLetters'),
    elemattempts: document.querySelector('.attempts'),

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

    }
}
game.initBoard();
document.querySelector(".gameStart").addEventListener("click", () => {
    game.startGame();
})