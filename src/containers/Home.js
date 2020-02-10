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
        <pre>
          JSX is great for creating beautiful graphical page.{"\n"}
          It can be used as a simple HTML element or as a component with this:{"\n"}
          The time passed after you stay in this page is <b> {timer} </b> second.
        </pre>
      </div>
    </div>
  )
}

export default Home;
