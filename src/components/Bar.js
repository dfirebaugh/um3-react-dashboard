import React, { Component } from 'react';
import '../App.css';

class Bar extends Component {
  constructor(props){
    super(props)
    this.state = {barWidth:0}
  }
  componentDidMount(){
    console.log(this.props.progress)
    this.setState({barWidth:this.props.progress})
  }
  render() {
    var barStyle = {
      width: this.props.progress + '%'
    };
    return (
      <div className='myProgress'>
        <div className="myBar" style={barStyle}>
        {this.props.progress}%
        </div>
      </div>
    );
  }
}

export default Bar;
