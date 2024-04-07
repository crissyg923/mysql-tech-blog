const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blogtitle').value.trim();
  const body = document.querySelector('#blogbody').value.trim();

  if (title && body) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, body }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  console.log('Deleting in Pogress')
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
console.log(id);
console.log(response);
console.log(response.status);
console.log(await response.text()); // or response.json() depending on the expected response content type
    if (response.ok) {
      document.location.reload();
      alert('Successfully Deleted Post!!!')
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.newpost')
  .addEventListener('submit', newPostHandler);

document
  .querySelector('.myposts')
  .addEventListener('click', delButtonHandler);
