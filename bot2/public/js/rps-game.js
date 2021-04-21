import queue, { options } from "./againstComputer.js"
import againstTo from "./challengeSomeone.js"
import db from "./db.js"

let run = (data, left) => {
    console.log(data);
    data.text = data.text.replace('!', '')
    db.localDb[data.author.toLowerCase()] = data
    if (Object.keys(options).includes(data.text)) {
        let element = [data,(left)?left:{}]
        queue.push(element)
        console.log(element);

        return
    }
    if (data.text.toString().slice(0, 14) == '!challenge to ' && data.text.split(' ').length == 3) {
        let enemy = data.text.split(' ')[2]
        againstTo(data.author.toLowerCase(), enemy.toLowerCase())
    }

}

export default run