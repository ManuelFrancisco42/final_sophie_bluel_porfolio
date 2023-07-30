// JavaScript
/* ================================= */
// Creating the HTML elements dinamically
/* ================================= */
function createModal() {
  const modalContainer = document.querySelector('.modal-container');

  // Create the modal HTML
  const modalHTML = `
    <aside class="modal">
				<div class="modal_wrapper">
					<div class="modal_nav">
						<img src="assets/icons/back_icon.png" class="arrow_back_icon" alt="go back arrow icon">
						<img src="assets/icons/close_icon.png" class="close_icon" alt="close cross icon">
					</div>
					<div class="the_gallery_wrapper">
						<h2>Galerie photo</h2>
						<div class="modal_the_gallery">
						</div>
						<hr>
						<button>Ajouter une photo</button>
						<a class="delete_from_the_gallery">Supprimer la galerie</a>
					</div>
					<div class="add_work_to_modal">
						<h2>Ajout photo</h2>
						<form id="add_work_form">
							<div class="add_photos">
								<img class="img_icon" src="assets/icons/picture.png" alt="picture of icon">
								<label for="file">+ Ajouter photo</label>
								<input type="file" name="file" id="file" accept="image/jpeg, image/png" hidden>
								<p>jpg, png : 4mo max</p>
							</div>
							<label for="title">Titre</label>
							<input type="text" name="title" id="title" required>
							<label for="category">Catégorie</label>
							<img class="arrow-down" src="assets/icons/dropdown_icon.png" alt="vertical arrow  icon">
							<select name="category" id="category" required>
							</select>
							<hr>
							<input type="submit" value="Valider" id="submitting_work">
						</form>
					</div>
				</div>
    </aside>
  `;

  // Append the modal to the container
  modalContainer.innerHTML = modalHTML;

  // Attach event listeners to the newly created modal elements
  attachModalEventListeners();
}

function attachModalEventListeners() {
  // Add event listeners for opening and closing the modal
  const modalOverlay = document.querySelector('.modal_all_overlay');
  const modal = document.querySelector('.modal');

  // ... your existing openModal and closeModal functions here ...

  // Add event listener for the "Ajouter une photo" button
  const addPhotoButton = document.querySelector('button');
  addPhotoButton.addEventListener('click', displayAddWorkModal);

  // Add event listener for the "Back" arrow
  const goBackArrow = document.querySelector('.arrow_back_icon');
  goBackArrow.addEventListener('click', goBackModal);

  // ... other event listeners ...

  // Display the initial content for the modal_the_gallery section
  displayModalthe_gallery();
}

// Call the createModal function to generate the modal when the page loads
createModal();

/* ================================= */
// Modal Operations:
/* ================================= */
function openModal() {
  const modalOverlay = document.querySelector('.modal_all_overlay');
  const modal = document.querySelector('.modal');
  modalOverlay.style.display = 'block';
  modalOverlay.style.display = 'flex';
  modal.style.display = 'block';
  modal.style.display = 'flex';
}

function closeModal() {
  const modalOverlay = document.querySelector('.modal_all_overlay');
  const modal = document.querySelector('.modal');
  const addWorkModal = document.querySelector('.add_work_to_modal');
  const the_galleryPhotoModal = document.querySelector('.the_gallery_wrapper');
  const formTitleInput = document.querySelector('#title');
  const formCategoryInput = document.querySelector('#category');
  const fileUploadInput = document.querySelector('#file');
  const selectedPicture = document.querySelector('.selected-picture');
  const error = document.querySelector('#error');

  modal.style.display = 'none';
  modalOverlay.style.display = 'none';
  addWorkModal.style.display = 'none';
  the_galleryPhotoModal.style.display = 'flex';
  formTitleInput.value = '';
  formCategoryInput.value = '';
  fileUploadInput.value = '';

  if (selectedPicture) {
    selectedPicture.remove();
  }

  if (error) {
    error.remove();
  }
}

function displayAddWorkModal() {
  const the_galleryPhotoModal = document.querySelector('.the_gallery_wrapper');
  const addWorkModal = document.querySelector('.add_work_to_modal');
  const goBackArrow = document.querySelector('.arrow_back_icon');

  the_galleryPhotoModal.style.display = 'none';
  addWorkModal.style.display = 'flex';
  goBackArrow.style.display = 'block';
  document.querySelector('.modal_nav').style.justifyContent = 'space-between';
}

function goBackModal() {
  const addWorkModal = document.querySelector('.add_work_to_modal');
  const goBackArrow = document.querySelector('.arrow_back_icon');
  const the_galleryPhotoModal = document.querySelector('.the_gallery_wrapper');
  closeModal();
  addWorkModal.style.display = 'none';
  goBackArrow.style.display = 'none';
  the_galleryPhotoModal.style.display = 'flex';
}

function displayModalthe_gallery() {
  const modalthe_gallery = document.querySelector('.modal_the_gallery');
  modalthe_gallery.innerHTML = '';

  function createModalWork(work) {
    const modal_work = document.createElement('div');
    modal_work.classList.add('modal-work');

    const modal_workWithIconsHTML = `
    <div class="modal-figure-elements">
      <img class="modal-figure" src="${work.imageUrl}" alt="${work.title}" crossorigin="anonymous">
      <img class="modal-delete" src="assets/icons/delete_icon.png" data-id="${work.id}">
    </div>
  `;
    const modal_workEditHTML = `<p>Edit</p>`;

    modal_work.innerHTML = modal_workWithIconsHTML + modal_workEditHTML;
    modalthe_gallery.appendChild(modal_work);

    function addModalDragIcon() {
      const modal_workWithIcons = modal_work.querySelector(
        '.modal-figure-elements'
      );
      const modal_workDragHTML = `<img class="modal-drag" src="assets/icons/drag_icon.png">`;
      modal_workWithIcons.insertAdjacentHTML('beforeend', modal_workDragHTML);
    }

    function removeModalDragIcon() {
      const modal_workDrag = modal_work.querySelector('.modal-drag');
      if (modal_workDrag) {
        modal_workDrag.remove();
      }
    }

    modal_work.addEventListener('mouseenter', addModalDragIcon);
    modal_work.addEventListener('mouseleave', removeModalDragIcon);
  }

  listDeTravail.forEach(createModalWork);

  deleteWork();
  deleteAllWorks();
}
