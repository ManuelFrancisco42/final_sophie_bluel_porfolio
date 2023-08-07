/* ================================= */
// Switch to Edit Mode:
/* ================================= */
function switchToEditModeWindows() {
  const editBanner = `
    <div class="editor_banner">
      <div>
        <i class="fa-regular fa-pen-to-square" style="color: #ffffff;"></i>
        <p>Mode édition</p>
      </div>
      <button>publier les changements</button>
    </div>
  `;

  const body = document.querySelector('body');
  body.insertAdjacentHTML('beforebegin', editBanner);
  const header = document.querySelector('header');
  header.style.margin = '0';
  header.style.marginTop = '100px';

  const pictureEditButton = `
    <div class="editor_btn editor_btn-picture">
      <i class="fa-regular fa-pen-to-square"></i>
      <p>modifier</p>
    </div>
  `;

  const porfilePicture = document.querySelector('#introduction > figure');
  porfilePicture.insertAdjacentHTML('beforeend', pictureEditButton);

  const titleEditButton = `
    <div class="editor_btn editor_btn-title">
      <i class="fa-regular fa-pen-to-square"></i>
      <p>modifier</p>
    </div>
  `;

  const porfileIntroduction = document.querySelector('article');
 porfileIntroduction.insertAdjacentHTML('afterbegin', titleEditButton);

  const worksEditButton = `
    <div class="editor_btn editor_btn-works">
      <i class="fa-regular fa-pen-to-square"></i>
      <p>modifier</p>
    </div>
  `;

  const titleTheGallery = document.querySelector('.title_the_gallery');
  titleTheGallery.insertAdjacentHTML('beforeend', worksEditButton);
}
