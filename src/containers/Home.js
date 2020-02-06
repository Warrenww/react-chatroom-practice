import React, {useState, useEffect} from 'react';
import Styles from '../styles/Style';

function Home(props){
  const classes = Styles();
  const [timer, setTimer] =useState(0);

  setTimeout(()=>{setTimer(timer+1);},1000);

  return(
    <div className={classes.page}>
      <div className={classes.container}>
        <h1>Index</h1>
        <p>
          JSX is great for creating beautiful graphical page.
          it can be used as a simple HTML element or as a component with this:
          the time pass after you stay in this page is {timer}
        </p>
      </div>
    </div>
  )
}

export default Home;
