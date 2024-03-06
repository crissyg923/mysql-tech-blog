const signupHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#username').value.trim();
    const email = document.querySelector('#newemail').value.trim();
    const password = document.querySelector('#newpassword').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/login');
      } else {
        alert(response.statusText);
      }
    }
  };


document
  .querySelector('.signupform')
  .addEventListener('submit', signupHandler);