const game = {
    // ilosc prob na zgadniecie
    attempts: 6,
    time: 60,
    interval: null,
    // pojemnik na czas
    elemTime: document.querySelector(".gameTime"),
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

    showTime: function () { this.elemTime.innerText = this.time },

    generateLetterButtons: function () {
        const alphabet = ["a", "ą", "b", "c", "ć", "d", "e", "ę", "f", "g", "h", "i", "j", "k", "l", "ł", "m", "n", "ń", "o", "ó", "p", "q", "r", "s", "ś", "t", "u", "v", "w", "x", "y", "z", "ź", "ż"]
        alphabet.forEach((letter) => {
            const button = document.createElement('button');
            button.innerText = letter;
            this.elemLetters.appendChild(button)
            button.classList.add('gameLetter')
            button.addEventListener('click', (event) => {
                const letter = event.target.innerText;
                event.target.disabled = true
                this.checkLetterInSentence(letter);
            });

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
    gameOver: function () {
        alert("Zawisles, haslo to " + this.currentSentence);
        this.disableLetters
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
    // check letters
    checkLetterInSentence: function (letter) {
        if (this.currentSentence.includes(letter)) {
            for (let i = 0; i < this.currentSentence.length; i++) {
                if (this.currentSentence[i] === letter) {
                    this.elemSentence.querySelectorAll(".gameSentenceBox")[i].innerText = letter;
                }
            }
            this.currentSentenceLetters = this.currentSentenceLetters.replace(new RegExp(letter, "g"), "");
            if (this.currentSentenceLetters === 0) {
                setTimeout(() => { alert("GG WP"); }, 300)
            }
        } else {
            this.attempts--;
            this.showAttempts();
            if (this.attempts <= 0) {
                this.gameOver();
            };
        }

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
        // 
        this.time = 60;
        this.interval = setInterval(() => {
            this.time--;
            if (this.time <= 0) {
                clearInterval(interval)
                this.gameOver();
            }
            this.showTime();
        }, 1000);

    }
}
game.initBoard();
document.querySelector(".gameStart").addEventListener("click", () => {
    game.startGame();
})