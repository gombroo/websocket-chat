let userName;

const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');
const socket = io(); // init new client/socket and save it in 'socket' const

// socket listeners
// socket.on('message', event => addMessage(event.author, event.content));
socket.on('message',({ author, content }) => { 
  console.log(`New message from ${author}: ${content}`);
  addMessage(author, content);
});

socket.on('join', (user) => {
  console.log('Dołączył nowy użytkownik', user);
});

socket.on('leave', (user) => {
  console.log('Użytkownik opuścił rozmowe: ', user);
});

// socket emitters
socket.emit('message', { author: 'Chat Bot', content: 'New user has joined the conversation!' });


const loginHandler = event => {
  event.preventDefault();  

  userName = userNameInput.value;
  console.log(userName);

  if(userName == null || userName == '') {
    alert('Fields can\'t be empty!');
  } else {
    const user = socket.id; 
    socket.emit('join', { author: userName, id: user });

    messagesSection.classList.toggle('show');
    loginForm.classList.toggle('show');
 }
} 
loginForm.addEventListener('submit', loginHandler);


const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');

  if(author === userName) {
    message.classList.add('message--self');
  } else {
    message.innerHTML = `
    <h3 class="message__author">${ userName === author ? 'You': author }</h3>
    <div class="message__content">${content}</div>`;
    messagesList.appendChild(message);
  }
}

const sendMessage = event => {
  event.preventDefault();
  let messageContent = messageContentInput.value;
  if(!messageContent.length) {
    alert('You have to type something!');
  }
  else {
    addMessage(userName, messageContent);
    // emit message after clicking 'send'
    socket.emit('message', { author: userName, content: messageContent })
    messageContentInput.value = '';
  }
}
addMessageForm.addEventListener('submit', sendMessage);

