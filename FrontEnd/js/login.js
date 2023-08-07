// JavaScript
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
      const forgotPasswordLink = document.getElementById('login a');
      const loginSection = document.getElementById('login');
      loginSection.insertBefore(error, forgotPasswordLink);
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
  document.querySelector('.login-form').addEventListener('submit', handleFormSubmit);
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

