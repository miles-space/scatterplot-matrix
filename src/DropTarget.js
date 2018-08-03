import React, { Component } from 'react';
import logo from './MilesLogo.png';
import './App.css';
import { NativeTypes } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

let fileTarget = {
  drop(props, monitor, component) {
    monitor.getItem().files.map(f => {
      let r = new FileReader();
      r.onload = function(e) {
        let contents = e.target.result;
        component.props.onDrop(contents);
      };
      r.readAsText(f);
    });
  }
};

let collector = (connect, monitor) => {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
};

class DropTargetComponent extends Component {
  static propTypes = {
    isOver: PropTypes.bool.isRequired
  };
  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div>
        {isOver && (
          <div
            style={{
              position: 'absolute',
              height: '46%',
              width: '100%',
              opacity: 0.5,
              backgroundColor: 'grey'
            }}
          />
        )}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Drop CSV files here.</h1>
        </header>
      </div>
    );
  }
}
export default DropTarget([NativeTypes.FILE], fileTarget, collector)(
  DropTargetComponent
);
