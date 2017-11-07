import React, { Component } from 'react';
import urls from '../config.js';
import '../App.css';

class Camera extends Component {
  constructor(props){
    super(props)
    this.state = {stream:urls.stream}
  }
  render() {
    return (
      <div className="Camera">
        <img src={this.state.stream} id='stream' alt='If there is no data here, the network interface on the printer might be down or the printer is offline.' ></img>
      </div>
    );
  }
}

export default Camera;
