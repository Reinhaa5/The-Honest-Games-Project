document.addEventListener('DOMContentLoaded', function() {
  const yesButtons = document.querySelectorAll('.yesButton');
  const noButtons = document.querySelectorAll('.noButton');
  const buttonWithImageContainers = document.querySelectorAll('.buttonWithImage');
  const noneOfTheFeaturesButton = document.getElementById('gameStoreNone').closest('.buttonWithImage');
  let selectedOptions = []; // Initially, no buttons are selected

  yesButtons.forEach((yesButton, index) => {
    yesButton.addEventListener('click', function() {
      selectedOptions[index] = 'True';
      toggleActiveState(index, yesButtons, noButtons);
    });
  });

  noButtons.forEach((noButton, index) => {
    noButton.addEventListener('click', function() {
      selectedOptions[index] = 'False';
      toggleActiveState(index, noButtons, yesButtons);
    });
  });

  buttonWithImageContainers.forEach(container => {
    container.addEventListener('click', function() {
      const selectedValue = container.querySelector('input[type="button"]').value;
	  console.log(container);
	  console.log(selectedValue);

	  if (selectedValue !== 'None of the features') {
        noneOfTheFeaturesButton.classList.remove('active');
      }

      if (selectedValue === 'None of the features.') {
        buttonWithImageContainers.forEach(otherContainer => {
          if (otherContainer !== container) {
            otherContainer.classList.remove('active');
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
	console.log(activeButtons)
  }
});
