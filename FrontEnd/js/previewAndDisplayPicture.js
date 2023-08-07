/* ============================================ */
// Preview and Display Selected Picture:
/* ============================================== */

function previewFileWindow(e) {
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

  function FileReaderLoadhandler(e) {
    const addImages = document.querySelector('.add_photos');
    const imgSrcFile = e.target.result;

    const anchorHTML = `
      <a href="${imgSrcFile}" target="_blank">
        <img class="selected-picture" src="${imgSrcFile}" style="object-fit: contain; margin: 0; width: 100%; height: 100%;">
      </a>
    `;

    addImages.innerHTML = anchorHTML;

    const addImagesPicture = document.querySelector('.add_photos > img');
    const addImagesLabel = document.querySelector('.add_photos > label');
    const addImagesInput = document.querySelector('.add_photos > input');
    const addImagesParagraph = document.querySelector('.add_photos > p');

    addImagesPicture.style.display = 'none';
    addImagesLabel.style.display = 'none';
    addImagesInput.style.display = 'none';
    addImagesParagraph.style.display = 'none';
  }

  fileReader.addEventListener('load', FileReaderLoadhandler);
}
