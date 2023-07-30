/* ================================= */
// Delete Works:
/* ================================= */

function deleteWork() {
  const trashIcons = document.querySelectorAll('.modal-delete');

  function handleDeleteClick(trashIcon) {
    const id = trashIcon.dataset.id;

    function deleteWorkAPI() {
      return fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('user')}`,
        },
      });
    }

    function handleDeleteResponse(response) {
      if (response.ok) {
        trashIcon.closest('.modal-work').remove();

        listDeTravail = listDeTravail.filter(function (work) {
          return work.id !== id;
        });

        if (listDeTravail.length < 1) {
          closeModal();
        }
        displayWorks();
      }
    }

    function handleDeleteError(error) {
      console.error(error);
    }

    deleteWorkAPI().then(handleDeleteResponse).catch(handleDeleteError);
  }

  function addClickEventToTrashIcon(trashIcon) {
    trashIcon.addEventListener('click', handleClick);
  }

  function handleClick() {
    handleDeleteClick(this);
  }

  trashIcons.forEach(addClickEventToTrashIcon);
}

function deleteAllWorks() {
  const deleteAllWorksButton = document.querySelector(
    '.delete_from_the_gallery'
  );

  function handleDeleteAllClick() {
    function deleteWorkAPI(work) {
      const id = work.id;
      return fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('user')}`,
        },
      });
    }

    function handleDeleteResponse(response) {
      if (response.ok) {
        listDeTravail = [];
        displayWorks();
        displayModalthe_gallery();
        closeModal();
      }
    }

    function handleDeleteError(error) {
      console.error(error);
    }

    listDeTravail.forEach(function (work) {
      deleteWorkAPI(work).then(handleDeleteResponse).catch(handleDeleteError);
    });
  }

  deleteAllWorksButton.addEventListener('click', handleDeleteAllClick);
}
 

