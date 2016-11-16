import React, {Component} from 'react';
import {CountDisplay} from './count-display.js';
import {TodoItem} from './todo-item.js';

class TodoApp extends Component {
  constructor () {
    super();
    this.state = {
      value: '',
      items: [],
      count: 0,
      filters: (() => true),
      buttonSelected: [true, false, false]
    };
  }

  getCount () {
    return this.state.items.filter(item => !item.completed).length;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let value = this.state.value.trim();
    if (value !== '') {
      let key = Date.now();
      let items = this.state.items.concat([{
        text: value,
        completed: false,
        editing: false,
        key: key
      }]);
      this.setState({
        value: '',
        items: items,
      });
    }
  }

  handleTextChange = (e) => {
    this.setState({value: e.target.value});
  }

  remove = (id) => {
    let items = this.state.items.filter((item) => {
      return item.key !== id;
    });
    this.setState({
      items: items,
    });
  }

  markAsComplete = (e, id) => {
    var items = this.state.items.map((item) => {
      if (item.key === id) {
        item.completed = e.target.checked;
      }
      return item;
    });
    this.setState({
      items: items,
    });
  }

  itemStartEdit = (id) => {
    let items = this.state.items.map((item) => {
      if (item.key === id) {
        if (!item.editing) {
          item.editing = true;
        }
      }
      return item;
    });
    this.setState({
      items: items
    });
  }

  itemEditing = (value, id) => {
    let items = this.state.items.map((item) => {
      if (item.key === id) {
        item.text = value;
      }
      return item;
    });
    this.setState({
      items: items
    });
  }

  itemEndEdit = (id) => {
    let items = this.state.items.map((item) => {
      if (item.key === id) {
        item.editing = false;
      }
      return item;
    });
    items = items.filter(item => {
      return (item.text.trim() !== '');
    });
    this.setState({
      items: items,
    });
  }

  handleToggleAll = (e) => {
    let checked = false;
    let items = this.state.items;
    for (let i = 0; i < items.length; ++i) {
      if (items[i].completed === false) {
        checked = true;
        break;
      }
    }
    for (let i = 0; i < items.length; ++i) {
      items[i].completed = checked;
    }
    this.setState({
      items: items,
    });
  }

  handleClearCompleted = () => {
    let items = this.state.items.filter(item => {
      return (!item.completed);
    });
    this.setState({
      items: items
    });
  }

  handleAllClick = () => {
    this.setState({
      filters: (() => true),
      buttonSelected: [true, false, false]
    });
  }

  handleActiveClick = () => {
    this.setState({
      filters: (item => (!item.completed)),
      buttonSelected: [false, true, false]
    });
  }

  handleCompleteClick = () => {
    this.setState({
      filters: (item => (item.completed)),
      buttonSelected: [false, false, true]
    });
  }

  getFilterClassName = (id) => {
    return (this.state.buttonSelected[id] ? 'selected' : '');
  }

  render () {
    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={this.state.value}
              onChange={this.handleTextChange}
            />
          </form>
        </header>
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onChange={(e) => { this.handleToggleAll(e) }}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {this.state.items.filter(this.state.filters).map(itemValue => {
              return (
                <TodoItem
                  text={itemValue.text}
                  completed={itemValue.completed}
                  editing={itemValue.editing}
                  key={itemValue.key}
                  id={itemValue.key}
                  onRemove={this.remove}
                  onComplete={this.markAsComplete}
                  onStartEdit={this.itemStartEdit}
                  onEditing={this.itemEditing}
                  onEndEdit={this.itemEndEdit}
                />
              );
            })}
          </ul>
        </section>
        <footer className="footer">
          <CountDisplay count={this.getCount()}/>
          <ul id="filters" className="filters">
            <li>
              <a href="#/"
                 id="all-button"
                 className={this.getFilterClassName(0)}
                 onClick={this.handleAllClick}>All</a>
            </li>
            <li>
              <a href="#/active"
                 id="active-button"
                 className={this.getFilterClassName(1)}
                 onClick={this.handleActiveClick}>Active</a>
            </li>
            <li>
              <a href="#/completed"
                 id="complete-button"
                 className={this.getFilterClassName(2)}
                 onClick={this.handleCompleteClick}>Complete</a>
            </li>
          </ul>
          <button
            className="clear-completed"
            onClick={this.handleClearCompleted}
          >
          Clear completed
          </button>
        </footer>
      </div>
    );
  }
}
module.exports = TodoApp;
