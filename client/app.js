let userName;

const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('messages-content');

// login form

const loginHandler = event => {
  event.preventDefault();
  
  if(userNameInput !== null && userNameInput !== '') {
    alert('Fields can\'t be empty!');
 } else {
    userName = userNameInput;
    messagesSection.classList.toggle('show');
 }
} 
 
loginForm.addEventListener('submit', loginHandler);

// message form

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');

  if(author === userName) {
    message.classList.add('message--self');
    message.innerHTML = `
    <h3 class="message__author">${ userName === author ? 'You': author }</h3>
    <div class="message__content">${content}</div>`;
    messages.appendChild(message);
  }
}

const sendMessage = event => {
  event.preventDefault();

  if(messageContentInput !== null && messageContentInput !== '') {
    alert('Fields can\'t be empty!');
  } else {
    addMessage(userName);
    messageContentInput.reset();
  }
}

addMessageForm.addEventListener('submit', sendMessage);
