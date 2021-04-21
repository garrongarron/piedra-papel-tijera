import run from "./js/rps-game.js";

var socket = io.connect('http://127.0.0.1:3000', { 'forceNew': true });
socket.on('messages', function (data) {
	if (typeof data.id == 'undefined') {
		return
	}
	data.id = data.id + '000000000000000000000000000000000000000000'
	data.id = data.id.slice(0, 24)
	console.log(data);
	run(data ,{})
})

let h1 = document.querySelector('h1')
let title = h1.innerHTML.split(' ') 
setInterval(() => {
	let text = title.shift()
	text = text.replace('-', ' ')
	h1.innerHTML = text
	title.push(text)
}, 2*1000);
let data1 = {author: "juan", id: "144626926000000000000000", text: "!challenge to pedro"}
let data2 = {author: "pedro", id: "144626922000000000000000", text: "!challenge to juan"}
setTimeout(() => {
	run(data1 ,{})
}, 2*1000);

setTimeout(() => {
	run(data2 ,{})
}, 5*1000);