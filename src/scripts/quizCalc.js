document.addEventListener('DOMContentLoaded', function () {
	const yesButtons = document.querySelectorAll('.yesButton');
	const noButtons = document.querySelectorAll('.noButton');
	const buttonWithImageContainers =
		document.querySelectorAll('.buttonWithImage');
	const noneOfTheFeaturesButton = document
		.getElementById('gameStoreNone')
		.closest('.buttonWithImage');
	let selectedOptions = [undefined]; // Initially, no buttons are selected
	let multiChoiceList = [];

	const calculateButton = document.getElementById('calcButton');
	const resultsContainer = document.querySelector('.resultsContainer');
	const resultRows = resultsContainer.querySelectorAll('.rowContainer');
	const gameTitleP = document.getElementById('gameTitleResults');
	const quizCalcError = document.getElementById('quizCalcError');
	let gameLikelyhood;

	yesButtons.forEach((yesButton, index) => {
		yesButton.addEventListener('click', function () {
			selectedOptions[index] = 'Yes';
			toggleActiveState(index, yesButtons, noButtons);
		});
	});

	noButtons.forEach((noButton, index) => {
		noButton.addEventListener('click', function () {
			selectedOptions[index] = 'No';
			toggleActiveState(index, noButtons, yesButtons);
		});
	});

	buttonWithImageContainers.forEach((container, index) => {
		container.addEventListener('click', function () {
			const selectedValue = container.querySelector(
				'input[type="button"]',
			).value;
			const selectedID = container.querySelector('input[type="button"]').id;

			if (selectedValue !== 'None of the features') {
				//if none is selected clear other selections
				noneOfTheFeaturesButton.classList.remove('active');
				multiChoiceList[index] = selectedID;
				if (multiChoiceList.includes('gameStoreNone')) {
					//Looks if none is selected
					let gameStoreNoneIndex = multiChoiceList.indexOf('gameStoreNone'); // gets index in array
					console.log(gameStoreNoneIndex);
					multiChoiceList.splice(gameStoreNoneIndex); //removes it from array
					console.log('removed gameStoreNone');
				}
			}

			if (selectedValue === 'None of the features.') {
				buttonWithImageContainers.forEach((otherContainer) => {
					if (otherContainer !== container) {
						otherContainer.classList.remove('active');
						multiChoiceList.splice(0, multiChoiceList.length); //resets array removing all elements
						console.log('cleared multiselect Array');
						multiChoiceList[index] = selectedID;
					}
				});
			}
			container.classList.add('active');
		});
	});
	function toggleActiveState(index, activeButtons, inactiveButtons) {
		activeButtons[index].classList.add('active');
		inactiveButtons[index].classList.remove('active');

		// You can use 'selectedOptions' array for processing the selected options
		console.log('Selected options:', selectedOptions);
		console.log(activeButtons);
	}

	calculateButton.addEventListener('click', function () {
		let gameTitle = document.getElementById('gameTitle').value; //gets text input
		console.log(gameTitle);

		let trueFalseCheck = selectedOptions.includes(undefined); //check if all buttons for true false questions are selected
		console.log(trueFalseCheck);

		console.log(resultRows);

		// check if multiselect list is empty for conditional results
		let multiChoiceListCheck = undefined;
		if (multiChoiceList.length > 0) {
			multiChoiceListCheck = true;
		}
		console.log(multiChoiceList);
		//If statement to see if everything is filled out
		if (
			gameTitle.length > 1 &&
			trueFalseCheck === false &&
			multiChoiceListCheck === true
		) {
			//hides error text
			quizCalcError.classList.add('displayNone');
			// Shows the results header and body text.
			gameTitleP.parentElement.classList.remove('displayNone');
			if (selectedOptions[1] == 'Yes') {
				resultRows[1].classList.remove('displayNone'); //Microtransactions
				resultRows[7].classList.remove('displayNone'); // Next Steps
				gameLikelyhood = 'very likely';
				resultRows[2].classList.add('displayNone'); //No Microtrsnactions
				resultRows[8].classList.add('displayNone'); // Next Steps Unlikely


			} else {
				resultRows[2].classList.remove('displayNone'); //No Microtransactions
				resultRows[8].classList.remove('displayNone'); //Next Steps Unlikely
				gameLikelyhood = 'unlikely';
				resultRows[1].classList.add('displayNone'); //Microtrsnactions
				resultRows[7].classList.add('displayNone'); // Next Steps Likely
			}
			gameTitleP.innerHTML =
				'Your game, ' +
				gameTitle +
				', is ' +
				gameLikelyhood +
				' to contain deceptive patterns. Heres why:';

			// Show hides results based on asnwers.
			// Time Based Objectives
			if (selectedOptions[2] == 'Yes') {
				resultRows[6].classList.remove('displayNone');
			} else {
				resultRows[6].classList.add('displayNone');
			}
			//In game store sales
			if (multiChoiceList.includes('gameStoreSales')) {
				resultRows[3].classList.remove('displayNone');
			} else {
				resultRows[3].classList.add('displayNone');
			}
			//In game store rotating storefront
			if (multiChoiceList.includes('gameStoreChange')) {
				resultRows[4].classList.remove('displayNone');
			} else {
				resultRows[4].classList.add('displayNone');
			} 
			//in game store virutal currency
			if (multiChoiceList.includes('gameStoreMoney')) {
				resultRows[5].classList.remove('displayNone');
			} else {
				resultRows[5].classList.add('displayNone');
			}
		} else {
			quizCalcError.classList.remove('displayNone');
		}
	});
});
