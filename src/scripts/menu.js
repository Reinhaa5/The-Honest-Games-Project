document.addEventListener('DOMContentLoaded', function () {
	const hamburger = document.querySelector('.hamburgerIcon')
	const dropdown = document.querySelector('.dropdown')

	hamburger.addEventListener('click', function () {
		dropdown.classList.toggle('active')
	})
})
