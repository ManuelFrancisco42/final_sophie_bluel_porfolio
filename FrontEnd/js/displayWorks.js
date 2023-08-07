/* ================================= */
// Display Works:
/* ================================= */
function showWorksWindow() {
  const theGallery = document.querySelector('.the_gallery');
  theGallery.innerHTML = '';

  function filterWorks(work) {
    return (
      arrayOfActiveButtons.innerText === 'Tous' ||
      arrayOfActiveButtons.dataset.id === work.categoryId.toString()
    );
  }

  const filteredWorks = arrayOfWorksLists.filter(filterWorks);

  function createWorkElement(work) {
    const workElementHTML = `
    <figure class="work">
      <img src="${work.imageUrl}" alt="${work.title}" crossorigin="anonymous">
      <figcaption>${work.title}</figcaption>
    </figure>
  `;

    theGallery.insertAdjacentHTML('beforeend', workElementHTML);
  }

  filteredWorks.forEach(createWorkElement);
}
