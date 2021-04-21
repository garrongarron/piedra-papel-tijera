import sortByValue from "./sortbyvalue.js";
let localDb = {}
let userList = {}
let updatePoints = (data, result) => {
	let status = null
	fetch('http://localhost:3001/viewers/' + data.id)
		.then(response => {
			status = response.status * 1
			return response.json()
		})
		.then(response => {
			if (status == 200) {
				addPointToViewer(response.viewer, result)
			}
			if (status == 404) {
				createViewer(data, result)
			}
		});
}

let createViewer = (data, result) => {
	let body = {
		_id: data.id,
		name: data.author,
		points: result,
	}
	let status = null
	fetch('http://localhost:3001/viewers',
		{
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
		.then(response => {
			status = response.status * 1
			return response.json()
		})
		.then(data => {
			if (status == 201) {
				console.log('ok', data)
				showViewers(data.createdViewer)
			} else {
				// console.log('?', data)
			}
		});
}

let addPointToViewer = (data, result) => {
	console.log('ading points', data, result);
	data.points += result
	if(data.points <0) data.points = 0
	fetch('http://localhost:3001/viewers/' + data._id,
		{
			method: 'PATCH',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(response => {
			return response.json()
		})
		.then(response => {
			// console.log('?', response)
			showViewers(data)
		});
}


let showViewers = (data) => {
	let viewers = document.querySelector('.viewers')
	if(!viewers){
		viewers = document.createElement('div')
		viewers.classList.add('viewers')
		document.body.appendChild(viewers)
	}

	userList[data.name] = data.points
	let str = ''
	userList = sortByValue(userList)
	Object.keys(userList).map(name => {
		let viewer = document.querySelector('.viewer-'+name)
		if(!viewer){
			viewer = document.createElement('div')
			viewer.classList.add('viewer-'+name)
		}
		viewer.innerHTML = `${userList[name]} ${name}`
		viewers.appendChild(viewer)
		if(name == data.name){
			viewers.classList.add('myself')
		}	
	})
}


let db = {
	updatePoints,
	localDb
}
export default db