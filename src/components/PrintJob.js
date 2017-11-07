import React, { Component } from 'react';
import urls from '../config.js';
import '../App.css';

class PrintJob extends Component {
  constructor(props){
    super(props)
    this.state = {progress:"",elapsedTime:"",totalTime:""}
  }
  componentDidMount(){
    var URL = urls.printerApi;
    var that = this;

    function get(url) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url);
        req.onload = function() {

          if (req.status === 200) {
            resolve(req.response);
          } else {
            reject(Error(req.statusText));
          }
        };
        req.onerror = function() {
          reject(Error('Network Error'));
        };
        req.send();
      });
    }
    window.addEventListener('DOMContentLoaded', function() {
      

      get(URL+'/print_job/progress')
      .then(function(response) {
        var prog = Math.floor((response / 1) * 100).toString()
        that.setState({progress:prog})
        // console.log(that.props)
        that.props.prog(prog);
      })
      .catch(function(error) {
        console.log(error);
      });

      get(URL+'/print_job/time_total')
      .then(function(response) {

        that.setState({totalTime:response})
      })
      .catch(function(error) {
        console.log(error);
      });
      get(URL+'/print_job/time_elapsed')
      .then(function(response) {

        that.setState({elapsedTime:response})
      })
      .catch(function(error) {
        console.log(error);
      });


      });
  }
  secondsToHms(d) {
    d = Number(d);

    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
  }
  render() {
    return (
      <div className="PrinterInfo">
        <div id='progress'>Progress: {this.state.progress}%</div>
        <div id='hotEndTemp'>Total Time: {this.secondsToHms(this.state.totalTime)}</div>
        <div id='filamentA'>Elapsed Time: {this.secondsToHms(this.state.elapsedTime)}</div>
        <div id='filamentB'>Time Remaining: {this.secondsToHms(this.state.totalTime - this.state.elapsedTime)}</div>
      </div>
    );
  }
}

export default PrintJob;
