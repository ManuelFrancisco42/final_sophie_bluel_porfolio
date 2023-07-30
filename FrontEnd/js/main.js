/* ============================================ */
// Main Function:
/* ============================================== */

function handleCategoryButtonClick() {
  activeButton.classList.remove('active');
  this.classList.add('active');
  activeButton = this;
  displayWorks();
}

function handleInputUpdate(inputs) {
  const allInputsFilled = inputs.every(function (input) {
    return input.value !== '';
  });
  if (allInputsFilled) {
    document.querySelector('#submitting_work').style.backgroundColor =
      '#1D6154';
  } else {
    document.querySelector('#submitting_work').style.backgroundColor =
      '#BFBFBF';
  }
}

async function fetchData() {
  const worksResponse = await fetch('http://localhost:5678/api/works');
  listDeTravail = await worksResponse.json();

  const categoriesResponse = await fetch(
    'http://localhost:5678/api/categories'
  );
  categoriesList = await categoriesResponse.json();
}

function checkAllInputsFilled(inputs) {
  return inputs.every(function (input) {
    return input.value !== '';
  });
}

async function main() {
  const logged = sessionStorage.getItem('user');

  await fetchData();

  const portfolio = document.getElementById('portfolio');
  const the_gallery = document.querySelector('.the_gallery');
  const categoryButtonsWrapper = document.createElement('div');
  categoryButtonsWrapper.classList.add('categories');

  portfolio.insertBefore(categoryButtonsWrapper, the_gallery);

  const buttonAll = document.createElement('button');
  buttonAll.classList.add('btn-category');
  buttonAll.setAttribute('id', 'all');
  buttonAll.innerText = 'Tous';
  categoryButtonsWrapper.appendChild(buttonAll);

  buttonAll.classList.add('active');
  activeButton = buttonAll;
  displayCategories();

  const categoryButtons = document.querySelectorAll('.btn-category');
  categoryButtons.forEach(function (categoryButton) {
    categoryButton.addEventListener('click', handleCategoryButtonClick);
  });

  displayWorks();

  if (logged) {
    const logIn = document.querySelector('#login_Link');
    logIn.innerText = 'Logout';
    logIn.addEventListener('click', logOut);
    switchToEditMode();

    const worksEditButton = document.querySelector('.editor_btn-works');
    worksEditButton.addEventListener('click', openModal);
    displayModalthe_gallery();

    const closeButtonModal = document.querySelector('.close_icon');
    closeButtonModal.addEventListener('click', closeModal);

    const modalOverlay = document.querySelector('.modal_all_overlay');
    modalOverlay.addEventListener('click', closeModal);

    const add_photosButton = document.querySelector(
      '.the_gallery_wrapper > button'
    );
    const the_galleryPhotoModal = document.querySelector(
      '.the_gallery_wrapper'
    );
    const addWorkModal = document.querySelector('.add_work_to_modal');
    const goBackArrow = document.querySelector('.arrow_back_icon');

    add_photosButton.addEventListener('click', displayAddWorkModal);

    goBackArrow.addEventListener('click', goBackModal);
  }

  const fileUploadInput = document.querySelector('#file');
  fileUploadInput.addEventListener('change', previewFile);

  const formWorkCategory = document.querySelector('#category');
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = '';
  defaultOption.disabled = true;
  formWorkCategory.appendChild(defaultOption);

  categoriesList.forEach(function (category) {
    const option = document.createElement('option');
    option.value = category.name;
    option.textContent = category.name;
    formWorkCategory.appendChild(option);

    option.dataset.id = category.id;
  });

  formWorkCategory.options[0].selected = true;

  const formAddWork = document.querySelector('#add_work_form');
  const formWorkPicture = document.querySelector('#file');
  const formWorkTitle = document.querySelector('#title');

  const inputs = [formWorkPicture, formWorkTitle, formWorkCategory];

  function handleInput(input) {
    handleInputUpdate(inputs);
  }

  inputs.forEach(function (input) {
    input.addEventListener('input', function () {
      handleInput(input);
    });
  });

  formAddWork.addEventListener('submit', function (e) {
    e.preventDefault();

    let errorHappened = false;

    const selectedOption =
      formWorkCategory.options[formWorkCategory.selectedIndex];
    const categoryId = selectedOption.getAttribute('data-id');
    const workFormData = new FormData();
    workFormData.append('image', formWorkPicture.files[0]);
    workFormData.append('title', formWorkTitle.value);
    workFormData.append('category', categoryId);

    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('user')}`,
      },
      body: workFormData,
    })
      .then(function (response) {
        if (response.ok) {
          closeModal();
          return response.json();
        } else {
          errorHappened = true;
          const error = document.querySelector('#error');
          if (error) {
            error.innerHTML = 'Please, fill the fields and try again';
          } else {
            const errorMessage = document.createElement('p');
            errorMessage.setAttribute('id', 'error');
            errorMessage.innerHTML = 'Please, fill the fields and try again';
            formWorkCategory.after(errorMessage);
          }
        }
      })
      .then(function (data) {
        if (!errorHappened) {
          listDeTravail.push(data);

          for (let i = 0; i < categoriesList.length; i++) {
            const categoryButton = document.querySelectorAll('.btn-category');
            if (categoryButton.innerText === categoriesList[i].name) {
              categoryButton.dataset.id = categoriesList[i].id;
            }
          }
          displayWorks();
          displayModalthe_gallery();
        }
      });
  });
}

main();
