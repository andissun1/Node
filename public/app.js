document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id;

    removeItem(id).then(() => {
      event.target.closest('li').remove();
    });
  }

  if (event.target.dataset.type === 'edit') {
    const payload = prompt('Введите новое название');
    if (!payload) return;
    const id = event.target.dataset.id;

    editItem(id, payload).then(() => {
      event.target.closest('li').childNodes[0].textContent = payload;
    });
  }
});

async function removeItem(id) {
  await fetch(`/${id}`, {
    method: 'DELETE',
  });
}

async function editItem(id, title) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
}
