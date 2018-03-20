// import _ from 'lodash';
import printMe from './print.js';
import './styles.css';

function component() {
  // //globals.js helpers.parse
  // parse();
  var element = document.createElement('div');
  var btn = document.createElement('button');

  // // Lodash, now imported by this script
  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  // Shimming Globals
  element.innerHTML = join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
 
  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());