radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber >= -1 && receivedNumber <= 1) {
        led.unplot(y % 5, y / 5)
        y += receivedNumber
        led.plot(y % 5, y / 5)
    } else if (receivedNumber >= 15 && receivedNumber <= 19) {
        ball2 = receivedNumber - 10
        if (ball2 >= 8) {
            ball2 += 6 - ball2
        } else if (ball2 <= 6) {
            ball2 += 8 - ball2
        }
        led.plot(ball2 % 5, ball2 / 5)
        basic.pause(300)
        for (let index = 0; index < 4; index++) {
            if (ball1 == ball2) {
                led.unplot(ball1 % 5, ball1 / 5)
                ball1 = 50
                ball2 = 50
                break;
            }
            led.unplot(ball2 % 5, ball2 / 5)
            ball2 += 5
            led.plot(ball2 % 5, ball2 / 5)
            basic.pause(300)
        }
    } else if (receivedNumber >= 20 && receivedNumber <= 24) {
        y = receivedNumber - 20
        led.plot(y % 5, y / 5)
        basic.pause(500)
        i = 0
    } else if (receivedNumber == 98) {
        i = 4
        basic.showString("start?")
        i = 2
    } else if (receivedNumber == 90) {
        i = 4
        basic.showString("go!")
        x = 22
        led.plot(x % 5, x / 5)
        radio.sendNumber(x)
    } else if (receivedNumber == 99) {
        i = 4
        basic.showString("re?")
        i = 2
    }
})
input.onButtonPressed(Button.A, function () {
    if (x > 20 && i == 0) {
        led.unplot(x % 5, x / 5)
        x += -1
        led.plot(x % 5, x / 5)
        radio.sendNumber(1)
    }
})
input.onButtonPressed(Button.AB, function () {
    if (i == 0) {
        ball1 = x - 5
        radio.sendNumber(ball1)
        led.plot(ball1 % 5, ball1 / 5)
        basic.pause(300)
        for (let index = 0; index < 4; index++) {
            if (ball1 == ball2) {
                led.unplot(ball1 % 5, ball1 / 5)
                ball1 = 50
                ball2 = 50
                break;
            }
            led.unplot(ball1 % 5, ball1 / 5)
            ball1 += -5
            led.plot(ball1 % 5, ball1 / 5)
            basic.pause(300)
        }
    } else if (i == 1) {
        radio.sendNumber(98)
        i = 4
    } else if (i == 2) {
        i = 4
        radio.sendNumber(90)
        basic.showString("go!")
        x = 22
        ball1 = 50
        ball2 = 50
        led.plot(x % 5, x / 5)
        radio.sendNumber(x)
    } else if (i == 3) {
        radio.sendNumber(99)
        i = 4
    }
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
})
input.onButtonPressed(Button.B, function () {
    if (x < 24 && i == 0) {
        led.unplot(x % 5, x / 5)
        x += 1
        led.plot(x % 5, x / 5)
        radio.sendNumber(-1)
    }
})
let x = 0
let y = 0
let ball2 = 0
let ball1 = 0
let i = 0
basic.clearScreen()
radio.setGroup(1)
i = 1
ball1 = 50
ball2 = 50
basic.forever(function () {
    if (x == ball2) {
        i = 4
        basic.clearScreen()
        basic.showString("you die")
        i = 3
    }
    if (y == ball1) {
        i = 4
        basic.clearScreen()
        basic.showString("you win")
        i = 3
    }
})
