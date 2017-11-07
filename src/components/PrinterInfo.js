import React, { Component } from 'react';
import urls from '../config.js';
import '../App.css';

class PrinterInfo extends Component {
  constructor(props){
    super(props)
    this.state = {bedTemp:"",hotEndTemp:"",filamentA:"",filamentB:""}
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

      get(URL+'/printer')
      .then(function(response) {

        var data = JSON.parse(response);


        that.setState({bedTemp:data.bed.temperature.current}) ;
        that.setState({hotEndTemp:data.heads[0].extruders[0].hotend.temperature.current}) ;
        that.setState({filamentA:data.heads[0].extruders[0].active_material.length_remaining}) ;

        if(data.heads[0].extruders[1].active_material.length_remaining === -1){
          that.setState({filamentB:'Not Loaded'}) ;
        }
        else{
          that.setState({filamentB:data.heads[0].extruders[1].active_material.length_remaining}) ;
          }
      })
      .catch(function(error) {
        console.log(error);
      });
      });
  }
  render() {
    return (
      <div className="PrinterInfo">
        <div id='bedTemp'>Bed Temperature: {this.state.bedTemp}</div>
        <div id='hotEndTemp'>HotEnd Temperature: {this.state.hotEndTemp}</div>
        <div id='filamentA'>filamentA (mm): {this.state.filamentA}</div>
        <div id='filamentB'>filamentB (mm): {this.state.filamentB}</div>
      </div>
    );
  }
}

export default PrinterInfo;
