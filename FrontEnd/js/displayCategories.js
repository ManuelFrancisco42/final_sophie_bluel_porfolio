/* ================================= */
// Display Categories:
/* ================================= */

function showCategories(logged) {
  const categoryButtonsWrapper = document.querySelector('.categories');
  categoryButtonsWrapper.innerHTML = '';

  function mapCategoryToButton(category) {
    const isActive =
      arrayOfActiveButtons && arrayOfActiveButtons.dataset.id === category.id.toString();
    let activeClass = '';
    if (isActive) {
      activeClass = ' active';
    }

    return `<button class="btn-category${activeClass}" data-id="${category.id}">${category.name}</button>`;
  }

  let categoryButtonsHTML = '';

  if (!logged) {
    categoryButtonsHTML = arrayOfCategoriesLists.map(mapCategoryToButton).join('');
    categoryButtonsHTML = `<button class="btn-category active" id="all">Tous</button>${categoryButtonsHTML}`;
  }

  categoryButtonsWrapper.innerHTML = categoryButtonsHTML;

  function categoryButtonClickHandler(arrayOfActiveButtons, categoryButton) {
    if (arrayOfActiveButtons) {
      arrayOfActiveButtons.classList.remove('active');
    }
    categoryButton.classList.add('active');
    arrayOfActiveButtons = categoryButton;
    showWorksWindow();
  }

  function addClickEventToButton(categoryButton) {
    categoryButton.addEventListener('click', handleClick);
  }

  function handleClick() {
    categoryButtonClickHandler(arrayOfActiveButtons, this);
  }

  const categoryButtons = document.querySelectorAll('.btn-category');
  categoryButtons.forEach(addClickEventToButton);
}

