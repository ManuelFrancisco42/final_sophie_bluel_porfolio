/* ================================= */
// Delete Works:
/* ================================= */

function deleteOnlyOneWork() {
  const trashIcons = document.querySelectorAll('.modal-delete');

  trashIcons.forEach((trashIcon) => {
    trashIcon.addEventListener('click', () => {
      let id = trashIcon.dataset.id;

      fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('user')}`,
        },
      }).then((response) => {
        if (response.ok) {
          trashIcon.closest('.modal-work').remove();

          // Remove the deleted work item from the arrayOfWorksLists array
          for (let i = 0; i < arrayOfWorksLists.length; i++) {
            if (arrayOfWorksLists[i].id == id) {
              arrayOfWorksLists.splice(i, 1);

              // If there are no more works, close the modal
              if (arrayOfWorksLists.length < 1) {
                closeModal();
              }
            }
            // Refresh the works displayed in the the_gallery
            showWorksWindow();
          }
        }
      });
    });
  });
}

function deleteAllWorks() {
  const deleteAllWorksButton = document.querySelector('.delete_from_the_gallery');

  function handleDeleteAllClick() {
    const deleteWorkAPI = (work) => {
      const id = work.id;
      return fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('user')}`,
        },
      });
    };
              
    function handleDeleteAllResponse(response) {
      if (response.ok) {
        const deletedWorkIds = arrayOfWorksLists.map((work) => work.id);
        deletedWorkIds.forEach(updateGalleryAfterDelete);
        arrayOfWorksLists = [];

        displayModalTheToTheGallery();
        closeModalWindow();

        showWorksWindow();
      }
    }

    function handleDeleteError(error) {
      console.error(error);
    }

    Promise.all(arrayOfWorksLists.map(deleteWorkAPI))
      .then((responses) => Promise.all(responses.map(handleDeleteAllResponse)))
      .catch(handleDeleteError);
  }

  deleteAllWorksButton.addEventListener('click', handleDeleteAllClick);
}


