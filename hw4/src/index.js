import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './todo.css';

class CountDisplay extends Component {
  render () {
    let count = this.props.count;
    if (count === 0) {
      return (
	<span id="counter" className="todo-count">
	  no item
	</span>
      );
    } else if(count === 1) {
      return (
	<span id="counter" className="todo-count">
	  1 item left
	</span>
      );
    } else {
      return (
	<span id="counter" className="todo-count">
	  {count} items left
	</span>
      );
    }
  }
}


class TodoItem extends Component {
  handleKeyPress (e, id) {
    return ((e.key === 'Enter')
      ? this.props.onEndEdit(id)
      : () => {}
    );
  }

  handleKeyDown (e, id) {
    console.log(e.key);
    return ((e.key === 'Escape')
      ? this.props.onEndEdit(id)
      : () => {}
    );
  }

  getLiClassName () {
    return ((this.props.completed ? 'completed ' : '') +
      (this.props.editing ? 'editing' : ''));
  }

  render () {
    let id = this.props.id;
    return (
      <li className={this.getLiClassName()}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.completed}
            onChange={(e) => this.props.onComplete(e, id)}
          >
          </input>
          <label
            className="label"
            onDoubleClick={e => this.props.onStartEdit(id)}>
            {this.props.text}
          </label>
          <button
            className="destroy"
            onChange={e => this.props.onRemove(id)}
            ></button>
        </div>
          { this.props.editing
            ? (<input
                 className="edit"
                 value={this.props.text}
                 onChange={e => this.props.onEditing(e.target.value, id)}
                 onBlur={e => this.props.onEndEdit(id)}
                 onKeyPress={e => this.handleKeyPress(e, id)}
                 onKeyDown={e => this.handleKeyDown(e, id)}
                 autoFocus={true}
               />)
            : null}
      </li>
    );
  }
}

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

  getCount (items) {
    return items.filter(item => !item.completed).length;
  }
  handleSubmit (e) {
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
        count: this.getCount(items)
      });
    }
  }

  handleTextChange (e) {
    this.setState({value: e.target.value});
  }

  remove (id) {
    let items = this.state.items.filter((item) => {
      return item.key !== id;
    });
    this.setState({
      items: items,
      count: this.getCount(items)
    });
  }

  markAsComplete (e, id) {
    var items = this.state.items.map((item) => {
      if (item.key === id) {
        item.completed = e.target.checked;
      }
      return item;
    });
    this.setState({
      items: items,
      count: this.getCount(items)
    });
  }

  itemStartEdit (id) {
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

  itemEditing (value, id) {
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

  itemEndEdit (id) {
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
      count: this.getCount(items)
    });
  }

  handleToggleAll (e) {
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
      count: this.getCount(items)
    });
  }

  handleClearCompleted () {
    let items = this.state.items.filter(item => {
      return (!item.completed);
    });
    this.setState({
      items: items
    });
  }

  handleAllClick () {
    this.setState({
      filters: (() => true),
      buttonSelected: [true, false, false]
    });
  }

  handleActiveClick () {
    this.setState({
      filters: (item => (!item.completed)),
      buttonSelected: [false, true, false]
    });
  }

  handleCompleteClick () {
    this.setState({
      filters: (item => (item.completed)),
      buttonSelected: [false, false, true]
    });
  }

  getFilterClassName (id) {
    return (this.state.buttonSelected[id] ? 'selected' : '');
  }

  render () {
    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={this.state.value}
              onChange={this.handleTextChange.bind(this)}
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
                  onRemove={this.remove.bind(this)}
                  onComplete={this.markAsComplete.bind(this)}
                  onStartEdit={this.itemStartEdit.bind(this)}
                  onEditing={this.itemEditing.bind(this)}
                  onEndEdit={this.itemEndEdit.bind(this)}
                />
              );
            })}
          </ul>
        </section>
        <footer className="footer">
          <CountDisplay count={this.state.count}/>
          <ul id="filters" className="filters">
            <li>
              <a href="#/"
                 id="all-button"
                 className={this.getFilterClassName(0)}
                 onClick={this.handleAllClick.bind(this)}>All</a>
            </li>
            <li>
              <a href="#/active"
                 id="active-button"
                 className={this.getFilterClassName(1)}
                 onClick={this.handleActiveClick.bind(this)}>Active</a>
            </li>
            <li>
              <a href="#/completed"
                 id="complete-button"
                 className={this.getFilterClassName(2)}
                 onClick={this.handleCompleteClick.bind(this)}>Complete</a>
            </li>
          </ul>
          <button
            className="clear-completed"
            onClick={this.handleClearCompleted.bind(this)}
          >
          Clear completed
          </button>
        </footer>
      </div>
    );
  }
}

ReactDOM.render(
  <TodoApp />,
  document.getElementById('todoapp')
);
