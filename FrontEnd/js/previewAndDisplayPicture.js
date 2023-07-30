/* ============================================ */
// Preview and Display Selected Picture:
/* ============================================== */

function previewFile(e) {
  const fileExtension = /\.(jpe?g|png)$/i;

  if (
    e.target.files.length === 0 ||
    !fileExtension.test(e.target.files[0].name)
  ) {
    return;
  }

  const file = e.target.files[0];
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);

  function handleFileReaderLoad(e) {
    const add_photos = document.querySelector('.add_photos');
    const imgSrc = e.target.result;

    const anchorHTML = `
      <a href="${imgSrc}" target="_blank">
        <img class="selected-picture" src="${imgSrc}" style="object-fit: contain; margin: 0; width: 100%; height: 100%;">
      </a>
    `;

    add_photos.innerHTML = anchorHTML;

    const add_photosPicture = document.querySelector('.add_photos > img');
    const add_photosLabel = document.querySelector('.add_photos > label');
    const add_photosInput = document.querySelector('.add_photos > input');
    const add_photosParagraph = document.querySelector('.add_photos > p');

    add_photosPicture.style.display = 'none';
    add_photosLabel.style.display = 'none';
    add_photosInput.style.display = 'none';
    add_photosParagraph.style.display = 'none';
  }

  fileReader.addEventListener('load', handleFileReaderLoad);
}
