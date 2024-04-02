const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#commenttext').value.trim();

  
    if (comment) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create comment');
      }
    }
  };

  document
  .querySelector('.newcommentform')
  .addEventListener('submit', newCommentHandler);