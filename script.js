// Dummy user storage
let users = JSON.parse(localStorage.getItem('users') || '[]');
let messages = JSON.parse(localStorage.getItem('messages') || '[]');

function signup() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  if (!email || !password) { alert('Enter email & password'); return; }

  users.push({email, password});
  localStorage.setItem('users', JSON.stringify(users));
  document.getElementById('msg').innerText = 'Sign up successful!';
}

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const found = users.find(u => u.email === email && u.password === password);
  if (found) {
    localStorage.setItem('currentUser', email);
    window.location.href = 'dashboard.html';
  } else {
    document.getElementById('msg').innerText = 'Invalid credentials';
  }
}

// Dashboard functions
function generateLink() {
  const code = Math.random().toString(36).substring(2,10);
  document.getElementById('secretLink').value = `${window.location.origin}/message.html?code=${code}`;
  alert('Copy & share this link!');
}

function displayMessages() {
  const container = document.getElementById('messages');
  if (!container) return;
  container.innerHTML = '';
  messages.forEach(m => {
    const p = document.createElement('p');
    p.textContent = m;
    container.appendChild(p);
  });
}

// Message page functions
function sendMessage() {
  const msg = document.getElementById('msgInput').value;
  if (!msg) return alert('Enter a message');
  messages.push(msg);
  localStorage.setItem('messages', JSON.stringify(messages));
  alert('Message sent!');
}
