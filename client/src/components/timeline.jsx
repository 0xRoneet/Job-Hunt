/* Require Imports */
import React from 'react';
import '../App.css'

const App = () => {
  return (
    <>
      <div className="main">
        <h3 className="head"><span>JOB-TREND'S</span></h3>
        <div className="container">
  <ul className="timeline">
    <li className="timeline-item">
      <div >
        <h3 className="heading">FrontEnd Developer</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
        <span className="date">January 2021</span>
        <span className="circle"></span>
      </div>
    </li>
    <li className="timeline-item">
      <div  >
        <h3 className="heading">BackEnd Developer</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
        <span className="date">February 2022</span>
        <span className="circle"></span>
      </div>
    </li>
    <li className="timeline-item">
      <div >
        <h3 className="heading">Full Stack Developer</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
        <span className="date">March 2023</span>
        <span className="circle"></span>
      </div>
    </li>
    <li className="timeline-item">
      <div >
        <h3 className="heading">Web3.0/Blockchain</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
        <span className="date">April 2024</span>
        <span className="circle"></span>
      </div>
    </li>
  </ul>
</div>

      </div>
    </>
  );



}

export default App
