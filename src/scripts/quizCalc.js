document.addEventListener('DOMContentLoaded', function () {
	const yesButton = document.getElementById('gameInteractYes')
	const noButton = document.getElementById('gameInteractNo')
	let selectedButton = null // Initially, no button is selected

	yesButton.addEventListener('click', function () {
		selectedButton = 'True'
		yesButton.classList.add('active')
		noButton.classList.remove('active')
	})

	noButton.addEventListener('click', function () {
		selectedButton = 'False'
		noButton.classList.add('active')
		yesButton.classList.remove('active')
	})

	// You can add an event listener to process the selected option
	// For example, you can use the 'selectedButton' variable in a function to perform an action based on the selected value.
})
