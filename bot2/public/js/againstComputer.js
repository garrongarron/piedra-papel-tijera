import db from "./db.js"

let result = document.querySelector('.result')

let queue = []
let next = () => {
    if (queue.length == 0) return
    let player = queue.shift()
    processRequest(player[0], player[1])
    console.log('this is next');
}
setInterval(() => {
    next()
}, 5 * 1000);



let processRequest = (data, left) => {
    document.querySelector('.placeholder1').innerHTML = (left.author) ? left.author : 'Computer'
    document.querySelector('.placeholder2').innerHTML = data.author
    let leftOption = (left.text) ? left.text * 1 : (Math.ceil(Math.random() * 3))
    let rightOption = data.text * 1
    let bool = false
    if (leftOption == 1 && rightOption == 3) {
        bool = true
    }
    if (leftOption == 2 && rightOption == 1) {
        bool = true
    }
    if (leftOption == 3 && rightOption == 2) {
        bool = true
    }
    let q = 1
    result.innerHTML = ''
    if (rightOption == leftOption) {
        timer(options[leftOption], options[rightOption], 'same', 'same')
        setTimeout(() => {
            result.innerHTML = '+' + q
            db.updatePoints(data, q)
            if(left.author){
                db.updatePoints(left, q)
            }
        }, 3000);
        return
    }
    timer(options[leftOption], options[rightOption], (bool) ? 'win' : 'lose', (!bool) ? 'win' : 'lose')
    setTimeout(() => {
        let number = 1
        let sign = (bool) ? '' : '+'
        if(left.author){
            result.innerHTML = (bool) ? `+${q} __ -${q}` : `-${q} __ +${q}`
        } else {
            number = (bool) ? -q : q * 2    
            result.innerHTML = sign + number
        }
        
        
        
        db.updatePoints(data, number)
        if(left.author){
            db.updatePoints(left, -number)
        }
        
    }, 3000);
}


let player1 = document.querySelector('.player1')
let player2 = document.querySelector('.player2')



let timer = (option1, option2, result1, result2) => {
    player1.classList.add('countdown')
    player2.classList.add('countdown')

    player1.classList.remove(options.rock)
    player1.classList.remove(options.paper)
    player1.classList.remove(options.scissor)
    player2.classList.remove(options.rock)
    player2.classList.remove(options.paper)
    player2.classList.remove(options.scissor)

    let seconds = 3
    player1.innerHTML = seconds
    player2.innerHTML = seconds
    let t = null
    t = setInterval(() => {
        seconds--
        player1.innerHTML = seconds
        player2.innerHTML = seconds
        if (seconds == 0) {
            player1.innerHTML = result1
            player2.innerHTML = result2
            player1.classList.remove('countdown')
            player2.classList.remove('countdown')
            player1.classList.add(option1)
            player2.classList.add(option2)
            clearInterval(t)
        }
    }, 1000);
}
let options = {
    1: 'rock',
    2: 'paper',
    3: 'scissor',
    'rock': 'rock',
    'paper': 'paper',
    'scissor': 'scissor',
}

export default queue
export { options }



