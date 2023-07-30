/* ================================= */
// Display Categories:
/* ================================= */
function displayCategories() {
  const categoryButtonsWrapper = document.querySelector('.categories');
  categoryButtonsWrapper.innerHTML = '';

  function mapCategoryToButton(category) {
    const isActive =
      activeButton && activeButton.dataset.id === category.id.toString();
    let activeClass = '';
    if (isActive) {
      activeClass = ' active';
    }

    return `<button class="btn-category${activeClass}" data-id="${category.id}">${category.name}</button>`;
  }

  const categoryButtonsHTML = categoriesList.map(mapCategoryToButton).join('');

  categoryButtonsWrapper.innerHTML = `<button class="btn-category active" id="all">Tous</button>${categoryButtonsHTML}`;

  function categoryButtonClickHandler(activeButton, categoryButton) {
    if (activeButton) {
      activeButton.classList.remove('active');
    }
    categoryButton.classList.add('active');
    activeButton = categoryButton;
    displayWorks();
  }

  function addClickEventToButton(categoryButton) {
    categoryButton.addEventListener('click', handleClick);
  }

  function handleClick() {
    categoryButtonClickHandler(activeButton, this);
  }

  const categoryButtons = document.querySelectorAll('.btn-category');
  categoryButtons.forEach(addClickEventToButton);
}
