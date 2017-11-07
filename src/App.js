import React, { Component } from 'react';
import Camera from './components/Camera.js';
import PrinterInfo from './components/PrinterInfo.js';
import PrintJob from './components/PrintJob.js';
import Bar from './components/Bar.js';
import Sidebar from 'react-sidebar';
import History from './components/History.js';
import './App.css';

const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    padding: 8,
    backgroundColor:'black',
    width:'100%'
  },

  content: {
    padding: '16px',
  },
};

class App extends Component {
  constructor(){
    super()
    this.state = {
      progress:"",
      sidebarOpen: false,
      docked: false,
      open: false,
      transitions: true,
      touch: false,
      shadow: true,
      pullRight: true,
      touchHandleWidth: 20,
      dragToggleDistance: 30,
    };


    this.getProg = this.getProg.bind(this)
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.renderPropCheckbox = this.renderPropCheckbox.bind(this);
    this.renderPropNumber = this.renderPropNumber.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    this.menuButtonClick = this.menuButtonClick.bind(this);
  }
  onSetOpen(open) {
    this.setState({open: open});
  }

  menuButtonClick(ev) {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  }
  onSetSidebarOpen(open) {
    this.setState({sidebarOpen: open});
  }
  getProg(progValue){
    this.setState({progress: progValue});
  }
  renderPropCheckbox(prop) {
    // const toggleMethod = (ev) => {
    //   const newState = {};
    //   newState[prop] = ev.target.checked;
    //   this.setState(newState);
    // };

    return (
      <p key={prop}>
        <label htmlFor={prop}> {prop}</label>
      </p>);
  }
  renderPropNumber(prop) {
    // const setMethod = (ev) => {
    //   const newState = {};
    //   newState[prop] = parseInt(ev.target.value, 10);
    //   this.setState(newState);
    // };

    return (
      <p key={prop}></p>);
  }

  render() {

    const sidebar =
    <div>
      <button onClick={this.menuButtonClick} style={styles.contentHeaderMenuLink}>=<span> Close</span></button>
      <History />
    </div>;

    // var sidebarContent = <div>
    // </div>

    const contentHeader = (
      <span>
        {!this.state.docked &&
          <button onClick={this.menuButtonClick} style={styles.contentHeaderMenuLink}>=<span> View History of prints</span></button>}

          </span>);

    const sidebarProps = {
      sidebar: sidebar,
      docked: this.state.docked,
      sidebarClassName: 'custom-sidebar-class',
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: this.state.pullRight,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen,
    };

    return (
      <Sidebar {...sidebarProps}>
        <div className="App">
          {contentHeader}
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
          <div className='outer'>
            <Camera />
          </div>
        </div>
      </Sidebar>
    );
  }
}

export default App;
