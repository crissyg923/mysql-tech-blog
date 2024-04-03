const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const post_id = document.querySelector('input[name="postId"]').value;
    const body = document.querySelector('textarea[name="comment-body"]').value;

    console.log(post_id);
    if (post_id && body) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ 
            post_id,
            body
         }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create comment');
      }
    }
  };

  document
  .querySelector('.newcommentform')
  .addEventListener('submit', newCommentHandler);