import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export class CountDisplay extends Component {
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
