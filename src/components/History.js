import React, { Component } from 'react';
import urls from '../config.js';
import '../App.css';

class History extends Component {
  constructor(props){
    super(props)
    this.state = {history:[]}

    this.msToTime = this.msToTime.bind(this)
  }
  msToTime(duration) {
        var milliseconds = parseInt((duration%1000)/100)
            , seconds = parseInt((duration/1000)%60)
            , minutes = parseInt((duration/(1000*60))%60)
            , hours = parseInt((duration/(1000*60*60))%24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
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

      get(URL+'/history/print_jobs')
      .then(function(response) {
        var data = JSON.parse(response);
        // console.log(data[0])
        that.setState({history:data})
      })
      .catch(function(error) {
        console.log(error);
      });
    });
  }
  render() {
    return (
      <div className="History">
      {this.state.history.map((job, key) => {
        return ( <div key={key}>
          <dt><strong>{job.name}</strong></dt>
          <dd>Started:{job.datetime_started}</dd>
          <dd>{job.result} on: {job.datetime_finished}</dd>
          <dd>Duration: {(job.datetime_finished ? this.msToTime(Math.abs(new Date(job.datetime_finished.replace(/-/g,'/').replace(/T/g,' ')) - new Date(job.datetime_started.replace(/-/g,'/').replace(/T/g,' ')))) : "??")}</dd>

          <hr></hr>
          </div>
        )
      })
    }
    </div>
  );
}
}

export default History;
