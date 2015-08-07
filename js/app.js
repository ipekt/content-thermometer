var view = require('./modules/view');
var calculate = require('./modules/calculate');

// add the thermometer to the page
document.addEventListener("DOMContentLoaded", function () {
  view.createDom();
});

window.addEventListener('load', function () {
calculate.selectArea('div.entry img');
  setTimeout(function () {
    // update thermometer using a percentage
    var score = calculate.calculateScore()
    view.updateThermometer(score);
    // update message using a percentage
    view.updateMessage(score, calculate.logImages());
  }, 250);
}, false);
