document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('input[name="postTitle"]').value = postTitle;

    
    document.getElementById('postbody').value = postBody;
});

const editPostHandler = async(event) => {
  console.log('Form submitted');
  event.preventDefault();
  const title = document.querySelector('input[name="postTitle"]').value.trim();
  const body = document.querySelector('textarea[name="post-body"]').value.trim();
  const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
 
  if (title && body && id) {
     try {
       const response = await fetch(`/api/posts/${id}`, {
         method: 'PUT',
         body: JSON.stringify({
           title,
           body
         }),
         headers: {
           'Content-Type': 'application/json',
         },
       });
 
       if (response.ok) {
         document.location.reload();
       } else {
         alert('Failed to edit post');
       }
     } catch (error) {
       console.error('Error:', error);
     }
  }
 }
 
  
  document
  .querySelector('.editpost')
  .addEventListener('submit', editPostHandler);
  