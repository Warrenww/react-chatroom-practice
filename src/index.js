import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';  // here is how to import css file into project
import App from './containers/App'; // this is like the main() function in c++ only create one of this
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
