import React from 'react';

export class TodoItem extends React.Component {
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
            onClick={(e) => this.props.onRemove(id)}
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
