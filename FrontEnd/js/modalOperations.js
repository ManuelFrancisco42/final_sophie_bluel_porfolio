/* ================================= */
//const modalContainer = 
// Creating the HTML elements dynamically
/* ================================= */
 function createModalWindow() {
  document.querySelector('.modal-container').innerHTML = `
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
  attachEventToTheModalWindow();
} 

 function attachEventToTheModalWindow() {
  document.querySelector('button').addEventListener('click', displayAddedWorkToModal);
  document.querySelector('.arrow_back_icon').addEventListener('click', goBackToTheModalWindow);
  displayModalTheToTheGallery();
} 

/* ================================= */
// Modal Operations:
/* ================================= */
function openModalWindow() {
  document.querySelector('.modal_all_overlay').style.display = 'flex';
  document.querySelector('.modal').style.display = 'flex';
}

function closeModalWindow() {
  const modalOverlay = document.querySelector('.modal_all_overlay');
  document.querySelector('.modal').style.display = 'none';
  document.querySelector('.add_work_to_modal').style.display = 'none';
  document.querySelector('.the_gallery_wrapper').style.display = 'flex';
  const selectedPicture = document.querySelector('.selected-picture');
  const error = document.getElementById('error');
  modalOverlay.style.display = 'none';
  document.querySelector('form').reset();
  selectedPicture && selectedPicture.remove();
  error && error.remove();
}

function displayAddedWorkToModal() {
  document.querySelector('.the_gallery_wrapper').style.display = 'none';
  document.querySelector('.add_work_to_modal').style.display = 'flex';
  document.querySelector('.arrow_back_icon').style.display = 'block';
  document.querySelector('.modal_nav').style.justifyContent = 'space-between';
}

 
function goBackToTheModalWindow() {
  document.querySelector('.add_work_to_modal').style.display = 'none';
  document.querySelector('.arrow_back_icon').style.display = 'none';
  document.querySelector('.the_gallery_wrapper').style.display = 'flex';

  
  const selectedPicture = document.querySelector('.selected-picture');
  if (selectedPicture) {
    selectedPicture.remove();
    showAddPhotoElements();
  }
}

function displayModalTheToTheGallery() {
  const modalthe_gallery = document.querySelector('.modal_the_gallery');
  modalthe_gallery.innerHTML = '';

  function createModalWork(work) {
    const modal_work = document.createElement('div');
    modal_work.classList.add('modal-work');

    modal_work.innerHTML = `
    <div class="modal-figure-elements">
      <img class="modal-figure" src="${work.imageUrl}" alt="${work.title}" crossorigin="anonymous">
      <img class="modal-delete" src="assets/icons/delete_icon.png" data-id="${work.id}">
    </div>
    <p>Edit</p>
  `;

    modalthe_gallery.appendChild(modal_work);

    function addModalDragIcon() {
      const modal_workWithIcons = modal_work.querySelector('.modal-figure-elements');
      const modal_workDragHTML = `<img class="modal-drag" src="assets/icons/drag_icon.png">`;
      modal_workWithIcons.insertAdjacentHTML('beforeend', modal_workDragHTML);
    }

    function removeModalDragIcon() {
      const modal_workDrag = modal_work.querySelector('.modal-drag');
      modal_workDrag && modal_workDrag.remove();
    }

    modal_work.addEventListener('mouseenter', addModalDragIcon);
    modal_work.addEventListener('mouseleave', removeModalDragIcon);
  }

  arrayOfWorksLists.forEach(createModalWork);

  deleteOnlyOneWork();
  deleteAllWorks();
   
}

createModalWindow();








