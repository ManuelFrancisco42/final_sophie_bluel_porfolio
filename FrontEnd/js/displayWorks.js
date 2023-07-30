/* ================================= */
// Display Works:
/* ================================= */
function displayWorks() {
  const the_gallery = document.querySelector('.the_gallery');
  the_gallery.innerHTML = '';

  function filterWorks(work) {
    return (
      activeButton.innerText === 'Tous' ||
      activeButton.dataset.id === work.categoryId.toString()
    );
  }

  const filteredWorks = listDeTravail.filter(filterWorks);

  function createWorkElement(work) {
    const workElementHTML = `
    <figure class="work">
      <img src="${work.imageUrl}" alt="${work.title}" crossorigin="anonymous">
      <figcaption>${work.title}</figcaption>
    </figure>
  `;

    the_gallery.insertAdjacentHTML('beforeend', workElementHTML);
  }

  filteredWorks.forEach(createWorkElement);
}
