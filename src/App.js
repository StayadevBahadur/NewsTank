import './App.css';


import React, { Component } from 'react'

export default class App extends Component {
  c = "satyadev";
  render() {
    return (
      <div>
        This is class bassed my name is {this.c}
      </div>
    )
  }
}
