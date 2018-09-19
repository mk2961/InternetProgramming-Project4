'use strict';
//index.js
//Michael Knapp 
let div = document.createElement('div');

document.querySelector('body').appendChild(div);
div.innerText = "Still loading";
let currentDate = new Date();
const urlBase = `http://people.missouristate.edu/chadkillingsworth/csc590/calendar/?date=`;


function getevents(date) {
	document.body.innerHTML = "";
	fetch(`${urlBase}${date.getMonth() + 1}-${date.getDate()}-${date.getDate()}-${date.getFullYear()}`) // Call the fetch function passing the url of the API as a parameter 
		//.then((data) => data.json())
		.then(response => {
			if (!response.ok) {
				throw new Error(response.status);
			}
			return response.json();
		})
		.then(function (data) { 
			const prevButton = document.createElement('button');
			//adding the prevDate variable and the buttons that keep track of the previous date 
			const prevDate = new Date();
			prevDate.setTime(date.getTime() - (24 * 60 * 60 * 1000));
			prevButton.innerText = `${urlBase}${prevDate.getMonth() + 1}-${prevDate.getDate()}-${prevDate.getDate()}-${prevDate.getFullYear()}`
			div.appendChild(prevButton);
			document.body.appendChild(div);

			prevButton.onclick = function () {
				getevents(prevDate);
			};
			// adding the next button 
			const nextDate = new Date();
			nextButton.setTime(date.getTime() + 24 * 60 * 60 * 1000);
			nextButton.innerText = `${urlBase} ${nextDate.getMonth() + 1}-${nextDate.getDate()}-${nextDate.getDate()}-${nextDate.getFullYear()}`
			div.appendChild(nextButton);
			document.body.appendChild(div);

			nextButton.onclick = function () {
				getevents(nextDate);
			}
			let mylist = document.getElementById("mylist");

			//let ul = document.createElement('ul');
			//loop to get the correct api information to appear in the ul as li's for each attribute 
			for (let i = 0; i < data.feed.entry.length; i++) {
				let li = document.createElement('li');
				li.appendChild(document.createTextNode(data.feed.entry[i].title.$t));
				mylist.appendChild(li);
			}
			div.parentElement.removeChild(div);
		}) // code for the api handling 


		.catch(function () {//this is where you run the code if the server returns errors . 

			div.innertext = "Error occured";
		})


};
getevents(currentDate);