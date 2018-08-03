import React, { Component } from 'react';

import './App.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { csvParse } from 'd3-dsv';

import html2canvas from 'html2canvas';

import DropComponent from './DropTarget';
import SmallMultiples from './SmallMultiples';

const FILE_FORMAT = csvParse;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], headers: [] };
  }

  generateScreenshot = () => {
    html2canvas(document.getElementById('Plot')).then(function(canvas) {
      // Export the canvas to its data URI representation
      var base64image = canvas.toDataURL('image/png');

      // Open the image in a new window
      window.open(base64image, '_blank');
    });
  };

  // Handler for drop event, triggered automatically
  onDrop = (contents, index) => {
    let newData = FILE_FORMAT(contents);
    const cols = Object.keys(newData[0]).filter(d => d.length > 1);
    const headers = Object.keys(newData[0]);

    newData = newData.map(h => {
      return cols.reduce((obj, key) => {
        obj[[key]] = parseFloat(h[[key]]);
        return obj;
      }, {});
    });

    const { data } = this.state;
    data.push(newData);
    this.setState({ data, headers });
  };

  render() {
    return (
      <div className="App">
        <DropComponent onDrop={this.onDrop} />
        <button className="button" onClick={this.generateScreenshot}>
          <i className="fa fa-camera" aria-hidden="true" />
          &nbsp; Screenshot
        </button>
        <ul id="Plot">
          <div className="Plot">
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {this.state.data.map(d => <SmallMultiples data={d} />)}
            </div>
          </div>
        </ul>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
