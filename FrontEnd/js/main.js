/* ============================================ */
// Main Function:
/* ============================================== */
function categoryButtonClickhandler() {
  arrayOfActiveButtons.classList.remove('active');
  this.classList.add('active');
  arrayOfActiveButtons = this;
  showWorksWindow();
}


function inputUpdatehandler(inputs) {
  const allInputsFilled = inputs.every((input) => input.value !== '');
  const button = document.querySelector('#submitting_work');
  button.style.backgroundColor = allInputsFilled ? '#1D6154' : '#BFBFBF';
}


async function fetchDataFromApi() {
  const worksResponse = await fetch('http://localhost:5678/api/works');
  arrayOfWorksLists = await worksResponse.json();

  const categoriesResponse = await fetch('http://localhost:5678/api/categories');
  arrayOfCategoriesLists = await categoriesResponse.json();
}


function checkAllInputsFilled(inputs) {
  return inputs.every(input => input.value !== '');
}


async function main() {
  const logged = sessionStorage.getItem('user');

  await fetchDataFromApi();

  const portfolio = document.getElementById('portfolio');
  const theGallery = document.querySelector('.the_gallery');
  const categoryButtonsWrapper = document.createElement('div');
  categoryButtonsWrapper.classList.add('categories');

  portfolio.insertBefore(categoryButtonsWrapper, theGallery);

  const buttonAll = document.createElement('button');
  buttonAll.classList.add('btn-category');
  buttonAll.setAttribute('id', 'all');
  buttonAll.innerText = 'Tous';
  categoryButtonsWrapper.appendChild(buttonAll);

  buttonAll.classList.add('active');
  arrayOfActiveButtons = buttonAll;
  showCategories();

  document.querySelectorAll('.btn-category').forEach(categoryButton => categoryButton.addEventListener('click', categoryButtonClickhandler));

  showWorksWindow();

  
  if (logged) {
    const logIn = document.getElementById('login_Link');
    logIn.innerText = 'Logout';
    logIn.addEventListener('click', logOut);
    switchToEditModeWindows();

    document.querySelector('.editor_btn-works').addEventListener('click', openModalWindow);

    displayModalTheToTheGallery();

    document.querySelector('.close_icon').addEventListener('click', closeModalWindow);
    document.querySelector('.modal_all_overlay').addEventListener('click', closeModalWindow);
    document.querySelector('.the_gallery_wrapper > button').addEventListener('click', displayAddedWorkToModal);
    document.querySelector('.arrow_back_icon').addEventListener('click', goBackToTheModalWindow);
  }


  const fileUploadInput = document.getElementById('file')
  fileUploadInput.addEventListener('change', previewFileWindow);

  const formWorkCategory = document.getElementById('category');
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = '';
  defaultOption.disabled = true;
  formWorkCategory.appendChild(defaultOption);

  arrayOfCategoriesLists.forEach(category => {
    const option = document.createElement('option');
    option.value = category.name;
    option.textContent = category.name;
    formWorkCategory.appendChild(option);

    option.dataset.id = category.id;
  });



  formWorkCategory.options[0].selected = true;

  const formAddWork = document.getElementById('add_work_form');
  const formWorkPicture = document.getElementById('file');
  const formWorkTitle = document.getElementById('title');

  const inputs = [formWorkPicture, formWorkTitle, formWorkCategory];

  function inputhandler() {
    inputUpdatehandler(inputs);
  }

  inputs.forEach(function (input) {
    input.addEventListener('input', () => inputhandler(input));
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
          closeModalWindow();
          return response.json();
        } else {
          errorHappened = true;
          const error = document.getElementById('error');
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
          arrayOfWorksLists.push(data);

          for (let i = 0; i < arrayOfCategoriesLists.length; i++) {
            const categoryButton = document.querySelectorAll('.btn-category');
            if (categoryButton.innerText === arrayOfCategoriesLists[i].name) {
              categoryButton.dataset.id = arrayOfCategoriesLists[i].id;
            }
          }
          showWorksWindow();
          displayModalTheToTheGallery();
        }
      });
  });
}

main();
