// JavaScript
console.log('je recupere le formulaire ');
async function login() {
  const form = document.querySelector('.login-form');
  const emailInput = form.querySelector('input[type="email"]');
  const passwordInput = form.querySelector('input[type="password"]');
  const error = document.getElementById('error');
  const loginStatus = document.getElementById('loginStatus');

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      sessionStorage.setItem('user', token);

      loginStatus.innerText = 'You are logged in.';
      const logIn = document.createElement('button');
      logIn.innerText = 'Logout';
      logIn.addEventListener('click', () => {
        sessionStorage.removeItem('user');
        location.replace('index.html');
      });
      loginStatus.appendChild(logIn);
      location.replace('index.html');
    } else {
      const forgotPasswordLink = document.querySelector('#login a');//TODO
      const loginSection = document.getElementById('login');//TODO
      loginSection.insertBefore(error, forgotPasswordLink);//TODO
      error.style.display = 'block';
    }
  } catch (error) {
    console.error('An error occurred:', error);
    error.style.display = 'block';
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  login();
}

function onDOMContentLoaded() {
  const form = document.querySelector('.login-form'); //TODO
  console.log(form);//TODO
  form.addEventListener('submit', handleFormSubmit); //TODO
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
