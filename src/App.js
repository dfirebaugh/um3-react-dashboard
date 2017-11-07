import React, { Component } from 'react';
import Camera from './components/Camera.js';
import PrinterInfo from './components/PrinterInfo.js';
import PrintJob from './components/PrintJob.js';
import Bar from './components/Bar.js';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {progress:""}

    this.getProg = this.getProg.bind(this)
  }
  getProg(progValue){
    this.setState({progress: progValue});
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div  className='outer' >
            <div>
              <PrintJob prog={this.getProg} />
            </div>
            <div>
              <PrinterInfo />
            </div>
          </div>
        </header>
        <Bar progress={this.state.progress}/>
        <Camera />
</div>
    );
  }
}

export default App;
