import React from 'react'
import Grid from './Components/Grid/grid'
import './app.scss'
import About from './Components/About/about';



const App = () => {
  
  return (
    <div className='container'>
      <About />
      <Grid />
    </div>
  );
};

export default App;
