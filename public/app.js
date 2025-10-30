const ul = document.querySelector('.list-group');

ul.addEventListener('click', ({ target }) => {
  // Для удобства вынес дочерние элементы глобальнее
  const title = target.closest('li').firstElementChild;
  const removeButton = target.closest('li').lastElementChild.lastElementChild;
  const updateButton = removeButton.previousElementSibling;

  // Удаление
  if (target.dataset.type === 'remove') {
    const id = target.dataset.id;
    removeItem(id).then(() => {
      target.closest('li').remove();
    });
  }

  // Редактирование
  if (target.dataset.type === 'edit') {
    let input = document.createElement('input');
    input.value = title.textContent;
    title.replaceWith(input);

    removeButton.textContent = 'Отмена';
    removeButton.dataset.type = 'cancel';
    updateButton.textContent = 'Обновить';
    updateButton.dataset.type = 'update';

    const payload = title.value;
    if (!payload) return;
  }

  if (target.dataset.type === 'cancel' || target.dataset.type === 'update') {
    const span = document.createElement('span');
    if (target.dataset.type === 'cancel') {
      getItem(removeButton.dataset.id).then((response) => {
        span.textContent = response.title;
        title.replaceWith(span);
      });
    } else if (target.dataset.type === 'update') {
      editItem(updateButton.dataset.id, title.value).then((note) => {
        span.textContent = note.title;
        console.log(note);

        title.replaceWith(span);
      });
    }
    removeButton.textContent = 'X';
    removeButton.dataset.type = 'remove';
    updateButton.textContent = 'Редактировать';
    updateButton.dataset.type = 'edit';
  }
});

async function removeItem(id) {
  await fetch(`/${id}`, {
    method: 'DELETE',
  });
}

async function editItem(id, title) {
  return await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  }).then((response) => response.json());
}

async function getItem(id) {
  return fetch(`/${id}`).then((response) => response.json());
}
