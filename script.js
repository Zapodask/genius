const blue = document.querySelector('.blue')
const red = document.querySelector('.red')
const green = document.querySelector('.green')
const yellow = document.querySelector('.yellow')


class Game {
    constructor() {
        console.log('Init game')

        this.order = []
        this.n = 0

        this.addNextOnOrder()
        this.initRound()
    }

    addNextOnOrder() {
        let nextOnOrder = Math.floor(Math.random() * 4)
        this.order.push(nextOnOrder)
    }

    initRound() {
        for (let i in this.order) {
            let elementColor = this.getColorElement(this.order[i])
            this.lightColor(elementColor, Number(i) + 1)
        }
    }

    getColorElement(number) {
        switch (number) {
            case 0:
                return blue
            case 1:
                return red
            case 2:
                return green
            case 3:
                return yellow
        }
    }
    
    lightColor(element, i) {
        console.log(i)
        i *= 1000
        console.log(i)
        setTimeout(() => {
            element.classList.add('selected')
        }, i - 500)
        setTimeout(() => {
            element.classList.remove('selected')
        }, i)
    }
    
    click(value) {
        if (value === this.order[this.n]) {
            if (this.order.length - 1 === this.n) {
                this.n = 0

                this.addNextOnOrder()
                this.initRound()
            }else {
                this.n += 1
            }
            
        } else {
            alert(`You lose, your score was ${this.order.length - 1}`)
            this.order = []
            this.n = 0
        }
    }
}

game = new Game()

blue.onclick = () => game.click(0)
red.onclick = () => game.click(1)
green.onclick = () => game.click(2)
yellow.onclick = () => game.click(3)
