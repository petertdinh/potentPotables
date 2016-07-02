import io from 'socket.io-client';

var socket = io('http://localhost:8080');

export const ADD_NEW_USER = 'ADD_NEW_USER';
export const SET_ACTIVE_USER = 'SET_ACTIVE_USER';
export const SET_ACTIVE_CLUE = 'SET_ACTIVE_CLUE';
export const DISABLE_BUTTON = 'DISABLE_BUTTON';
export const CREATE_NEW_USER = 'CREATE_NEW_USER';
export const ACTIVATE_GAME = 'ACTIVATE_GAME';
export const INCORRECT_ANSWER = 'INCORRECT_ANSWER';
export const CORRECT_ANSWER = 'CORRECT_ANSWER';
export const SKIP = 'SKIP';
export const ACTIVATE_BUTTONS = 'ACTIVATE_BUTTONS';
export const SKIP_INCORRECT= 'SKIP_INCORRECT';
export const START_GAME_ERROR = 'START_GAME_ERROR';
export const CREATE_GAME = 'CREATE_GAME';

//nearly all client-side socket listeners will be be contained here
//initSockets will be exported to client-side index
export function initSockets(store){
  console.log('inside initSockets Client');

  socket.on('newUser', function(data) {
  	store.dispatch({type: ADD_NEW_USER, payload: data})
  });

  socket.on('setActiveUser', function(data){
    console.log('setActiveUser');
    store.dispatch({type: SET_ACTIVE_USER, payload: data.username});
    store.dispatch({type: DISABLE_BUTTON, payload: data.isButtonClicked});
  });

  socket.on('gameActive', function() {
    console.log('listening start game client');
    store.dispatch({type: ACTIVATE_GAME, payload: true});
  });

  // socket.on('fetchGame', function(data) {
  //   var tempClues= data.clues;
  //   for (var i= 0; i< tempClues.clues.length; i+=5){
  //     tempClues.clues[i].value= 200;
  //     tempClues.clues[i+1].value= 400;
  //     tempClues.clues[i+2].value= 600;
  //     tempClues.clues[i+3].value= 800;
  //     tempClues.clues[i+4].value= 1000;
  //   }
  //   store.dispatch({type: CREATE_GAME, payload: tempClues});
  // });

  socket.on('currentClue', function(data) {
    store.dispatch({type: SET_ACTIVE_CLUE, payload: data.clue});
  });

  socket.on('incorrect', function(data) {
    const incorrect = new Audio('http://www.qwizx.com/gssfx/usa/j64-outtatime.wav');
    incorrect.play();
    store.dispatch({type: INCORRECT_ANSWER, payload: data});
  });

  socket.on('correct', function(data) {
    console.log('inside sockets_client correct');
    const correct = new Audio('http://www.qwizx.com/gssfx/usa/j64-ringin.wav');
    correct.play();
  	store.dispatch({type: CORRECT_ANSWER, payload: data});
  });

  socket.on('skip', function(data) {
    const outOfTime = new Audio('http://www.qwizx.com/gssfx/usa/jtime.wav');
    outOfTime.play();
  	store.dispatch({type: SKIP, payload: data});
  });

  socket.on('enableButtons', function() {
    store.dispatch({type: ACTIVATE_BUTTONS, payload: false})
  });

  socket.on('skipIncorrect', function(data) {
    const falsePromise = new Audio('http://www.qwizx.com/gssfx/usa/j64-outtatime.wav');
    falsePromise.play();
    store.dispatch({type: SKIP_INCORRECT, payload: data})
  });

  socket.on('host', function(data) {
    store.dispatch({type: START_GAME_ERROR, payload: ''});
  });

  socket.on('hostJoins', function(data) {
    console.log('data line 89', data);
    var tempClues= data;
    for (var i= 0; i< tempClues.clues.length; i+=5){
      tempClues.clues[i].value= 200;
      tempClues.clues[i+1].value= 400;
      tempClues.clues[i+2].value= 600;
      tempClues.clues[i+3].value= 800;
      tempClues.clues[i+4].value= 1000;
    }
    store.dispatch({type: CREATE_GAME, payload: tempClues});
  })
}

//all client-side socket emitters will be contained here
//functions will be exported to appropriate files
export function joinRoom(room){
  console.log('insideJoinRoom');
  socket.emit('joinRoom', {room: room});
}

// called inside /actions/index.js => createUsername
export function createUserSockets(username, photo, room) {
  console.log('room is', room);
  console.log('inside UsernameSockeetEmitter', room)
	socket.emit('createUserSockets', {username: username, photo: photo, room: room});
}

export function sendButtonClick(username, room, clue) {
  socket.emit('sendButtonClick', {username: username, room: room, clue: clue});
}

export function startGame(room) {
  console.log('emitting start Game', room);
  socket.emit('startGame', { room: room });
}

export function hostJoins(room) {
  socket.emit('host', { room })
}

export function setActiveClue(activeClue, room) {
  socket.emit('activeClue', { activeClue: activeClue, room: room });
}

export function declareIncorrect(username, room, clue) {
	socket.emit('incorrect', {username: username, room: room, clue: clue});
}

export function declareCorrect(username, room, clue) {
	socket.emit('correct', {username: username, room: room, value: clue.value});
}

export function skipClue(room, clue) {
	socket.emit('skip', {room: room, clue: clue});
}

export function activateButtons(room) {
  socket.emit('activateButtons', {room: room});
}

export function hostJoins(room){
  socket.emit('hostJoins', {room: room});
}