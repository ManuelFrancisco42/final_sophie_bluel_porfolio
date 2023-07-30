/* ================================= */
// Switch to Edit Mode:
/* ================================= */
function switchToEditMode() {
  const editBanner = `
    <div class="editor_banner">
      <div>
        <i class="fa-thin fa-pen-to-square" style="color: #ffffff;"></i>
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

  const introduction = document.querySelector('#introduction > figure');
  introduction.insertAdjacentHTML('beforeend', pictureEditButton);

  const titleEditButton = `
    <div class="editor_btn editor_btn-title">
      <i class="fa-regular fa-pen-to-square"></i>
      <p>modifier</p>
    </div>
  `;

  const article = document.querySelector('article');
  article.insertAdjacentHTML('afterbegin', titleEditButton);

  const worksEditButton = `
    <div class="editor_btn editor_btn-works">
      <i class="fa-regular fa-pen-to-square"></i>
      <p>modifier</p>
    </div>
  `;

  const title_the_gallery = document.querySelector('.title_the_gallery');
  title_the_gallery.insertAdjacentHTML('beforeend', worksEditButton);
}
