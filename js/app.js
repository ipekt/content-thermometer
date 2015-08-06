var view = require('./modules/view');
var calculate = require('./modules/calculate');

var images = document.getElementsByTagName('img');

window.addEventListener('load', function () {
  // adds the thermometer to the page
  view.createDom();
  setTimeout(function () {

    // update thermometer using a percentage
    view.updateThermometer(calculate.calculateScore(images));
    // update message using a percentage
    view.updateMessage(calculate.calculateScore(images), calculate.logImages(images));
    
  }, 250);
}, false);
