import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './todo.css';
var TodoApp = require('./todo-app.js');

ReactDOM.render(
  <TodoApp />,
  document.getElementById('todoapp')
);
