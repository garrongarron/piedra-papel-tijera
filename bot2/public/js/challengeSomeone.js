import db from "./db.js"
import run from "./rps-game.js"

let challenges = {
    // 'samugarron':'samugarron'
}
let againstTo = (challenger, challenged) =>{
    if(challenger == challenged) return 
    if(challenges[challenged]==challenger ){
        db.localDb[challenged].text = Math.ceil(Math.random() * 3)+''
        db.localDb[challenger].text = Math.ceil(Math.random() * 3)+''
        run(db.localDb[challenger],db.localDb[challenged])
        // delete challenges[challenged]
        return
    }
    challenges[challenger] = challenged
}

export default againstTo
