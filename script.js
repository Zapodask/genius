// Colors
const green = document.querySelector('.green')
const yellow = document.querySelector('.yellow')
const red = document.querySelector('.red')
const blue = document.querySelector('.blue')

// Controls
const startBtn = document.querySelector('.startBtn')
const showHighScore = document.getElementById('showHighScore')
const showScore = document.getElementById('showScore')

// Sounds
const greenSound = new Audio('assets/green.mp3')
const yellowSound = new Audio('assets/yellow.mp3')
const redSound = new Audio('assets/red.mp3')
const blueSound = new Audio('assets/blue.mp3')



class Game {
    constructor() {
        console.log('Init game')

        this.playable = false
        startBtn.disabled = true

        this.order = []
        this.n = 0

        this.addNextOnOrder()
        this.initRound()
    }

    /**
     * Add color in order
     */
    addNextOnOrder() {
        let nextOnOrder = Math.floor(Math.random() * 4)
        this.order.push(nextOnOrder)
    }

    /**
     * Start round
     */
    initRound() {
        this.playable = false

        for (let i in this.order) {
            let elementColor = this.getColorElement(this.order[i])
            this.lightColor(elementColor, Number(i) + 1)
        }

        setTimeout((() => {
            this.playable = true
        }).bind(this), this.order.length * 1000)
    }

    /**
     * Get the color element according to their respective numbers
     * 
     * @param {Number} number 
     * @returns {Element}
     */
    getColorElement(number) {
        switch (number) {
            case 0:
                return green
            case 1:
                return yellow
            case 2:
                return red
            case 3:
                return blue
        }
    }
    
    /**
     * Light selected color
     * 
     * @param {Element} element
     * @param {Number} i
     */
    lightColor(element, i) {
        i *= 1000

        setTimeout((() => {
            this.playSound(element.attributes[0].value)
            element.classList.add('selected')
        }).bind(this), i - 500)
        setTimeout(() => {
            element.classList.remove('selected')
        }, i)
    }
    
    /**
     * By clicking on colors
     * 
     * @param {Number} value 
     */
    click(value) {
        let score = this.order.length - 1

        if (this.playable === true) {
            this.playSound(value)

            if (value === this.order[this.n]) {
                if (score === this.n) {
                    this.n = 0
    
                    showScore.innerHTML = this.order.length
                    this.addNextOnOrder()
                    this.initRound()
                }else {
                    this.n += 1
                }
                
            } else {
                alert(`You lose, your score was ${score}`)
    
                if (score > localStorage.getItem('highScore')) {
                    localStorage.setItem('highScore', score)
                    showHighScore.innerHTML = score
                }
    
                this.order = []
                this.n = 0
                this.playable = false
                showScore.innerHTML = 0
                startBtn.disabled = false
            }
        }
    }

    /**
     * Play sound according to color
     * 
     * @param {Number || String} value 
     */
    playSound(value) {
        switch (value) {
            case 'green':
            case 0:
                greenSound.play()
                break

            case 'yellow':
            case 1:
                yellowSound.play()
                break

            case 'red':
            case 2:
                redSound.play()
                break

            case 'blue':
            case 3:
                blueSound.play()
                break
        }
    }
}

let game

// Colors click
green.onclick = () => game.click(0)
yellow.onclick = () => game.click(1)
red.onclick = () => game.click(2)
blue.onclick = () => game.click(3)

// Start game
startBtn.onclick = () => game = new Game()

// Set high score on page
showHighScore.innerHTML = localStorage.getItem('highScore') || 0
