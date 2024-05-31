const socket = io();

function sendMessage() {
  const message = document.getElementById('message').value;
  socket.emit('message', message);
  document.getElementById('message').value = '';
}

socket.on('response', (data) => {
  const responses = document.getElementById('responses');
  const newResponse = document.createElement('p');
  newResponse.textContent = data;
  responses.appendChild(newResponse);
});
