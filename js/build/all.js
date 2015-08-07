(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./modules/calculate":2,"./modules/view":3}],2:[function(require,module,exports){
var benchmark = 200000;
var images;

var selectArea = function (el) {
  images = document.querySelectorAll(el);
  return images;
}

// Find all the image tags in a page and count up their pixels
var countPixels = function (images) {
  var i, currentImage, imageTotal = 0;

  for (i = 0; i < images.length; i++) {
    currentImage = images[i].naturalWidth * images[i].naturalHeight;
    imageTotal += currentImage;
  }

  return imageTotal;
};

// Log resized or large images
var logImages = function () {
  var i, imageSize, logLargeImages = [], logResizedImages = [];

  for (i = 0; i < images.length; i++) {
    imageSize = images[i].naturalWidth * images[i].naturalHeight;
    if (imageSize > benchmark && images[i].naturalWidth !== images[i].width) {
      logResizedImages.push(images[i].src);
    } else if (imageSize > benchmark) {
      logLargeImages.push(images[i].src);
    }
  }

  return {
    resized: logResizedImages,
    large: logLargeImages
  };

};

// Calculate image score
var calculateScore = function () {
  var totalPixels = countPixels(images),
    benchmarkPercentage = 100 / benchmark,
    imageScorePercentage = (totalPixels * benchmarkPercentage);
  return imageScorePercentage;
};

module.exports = {
  selectArea: selectArea,
  countPixels: countPixels,
  calculateScore: calculateScore,
  logImages: logImages
};

},{}],3:[function(require,module,exports){
var temperature, message, state = {};

// Show message on click
var _registerEventHandler = function (thermometer) {
  //var state = {}; // store state information
  thermometer.addEventListener('click', function (ev) {
    ev.stopPropagation();
    ev.preventDefault();

    if (state.viewinfo === true) {
      message.classList.remove("content-thermometer--show-info");
      state.viewinfo = false;
    } else {
      message.classList.add("content-thermometer--show-info");
      state.viewinfo = true;
    }
  });
};

var _registerTimeOut = function (thermometer_content) {
  setTimeout(function () {
    thermometer_content.classList.add("content-thermometer--ready");
  }, 1);
};

// Create css for thermometer
var _createCss = function () {
  var node = document.createElement('style'),
    styles = ".thermometer{cursor:pointer}#close_message{cursor:pointer;font-size:1.5em;margin-left:0.8em}.content-thermometer,.content-thermometer::after{background-color:#E0D7D6;box-shadow:0 1px 1px #CCC}.content-thermometer,.content-thermometer__message{top:50%;box-sizing:border-box;transform:translate(0,-50%)}.content-thermometer{font-family:sans-serif;height:100px;width:10px;position:fixed;right:1.5em;font-size:12px;opacity:0;transition:opacity ease-out 300ms;z-index:3000}.content-thermometer--ready{opacity:1}.content-thermometer::after{border-radius:50%;content:'';height:20px;left:50%;position:absolute;bottom:0;width:20px;margin:0 0 -2px -10px}.content-thermometer__temperature{background-color:transparent;color:#0076cc;width:4px;position:absolute;bottom:5px;z-index:1;left:50%;margin:0 0 0 -2px;height:0;transition:height 500ms ease-out,background-color 100ms ease-out}.content-thermometer__temperature::after{color:inherit;background-color:inherit;border-radius:50%;content:'';width:10px;height:10px;position:absolute;bottom:0;margin:0 0 -2px -5px;left:50%}.content-thermometer__message{position:absolute;right:100%;background:#fff;border:1px solid #CCC;padding:.75em;margin-right:1em;width:20em;border-radius:3px;display:none}.content-thermometer--show-info{display:block}.content-thermometer__bad,.content-thermometer__good{font-size:2em;float:left;margin-right:.5em}.content-thermometer__good{color:#27ae60}.content-thermometer__bad{color:#dd4b39}.content-thermometer__message h1{margin:0 0 .5em;font-size:1.2em}.content-thermometer__message h2{font-size:1.1em}.content-thermometer__message img{margin:0 .2em .2em 0}.content-thermometer__message p{font-size:1em;line-height:1.2}.content-thermometer__message:after,.content-thermometer__message:before{left:100%;top:50%;border:solid transparent;content:'';height:0;width:0;position:absolute;pointer-events:none}.content-thermometer__message:after{border-color:rgba(194,225,245,0);border-left-color:#fff;border-width:10px;margin-top:-10px}.content-thermometer__message:before{border-color:rgba(194,225,245,0);border-left-color:#CCC;border-width:11px;margin-top:-11px}";
  node.innerHTML = styles;
  document.body.appendChild(node);
};

var _appendBody = function (thermometer_content) {
  return document.body.appendChild(thermometer_content);
};

var _getTemperatureColor = function (percentage) {
  var color = ['#27ae60', '#f17935', '#dd4b39'],
    returnColor;
  percentage *= 0.5;

  if (percentage < 25) {
    returnColor = color[0];
  } else if (percentage < 75) {
    returnColor = color[1];
  } else {
    returnColor = color[2];
  }

  return returnColor;
};

var createDom = function () {
  var thermometer_content = document.createElement('div');
  var thermometer = document.createElement('div');
  message = document.createElement('div');
  temperature = document.createElement('div');
  thermometer_content.className = 'content-thermometer';
  thermometer.className = 'thermometer';
  temperature.className = 'content-thermometer__temperature';
  message.className = 'content-thermometer__message';
  thermometer_content.appendChild(thermometer);
  thermometer.appendChild(temperature);
  thermometer_content.insertBefore(message, thermometer.nextSibling);
  
  _registerEventHandler(thermometer);
  _registerTimeOut(thermometer_content);
  _createCss();
  _appendBody(thermometer_content);

  return thermometer_content;
};

var createMessage = function (imageScorePercent, logImages) {
  var i, output = '<h1>Content Thermometer Info <span id="close_message">&#10006;</span></h1>',
    imageDiff = imageScorePercent - 100,
    logResizedImages = logImages.resized,
    logLargeImages = logImages.large;

  if (imageDiff > 0) {
    output += '<p><span class="content-thermometer__bad">&#10007;</span> The size of the images in the page is ' + Math.floor(imageDiff) + '% above the benchmark</p>';

    if (logResizedImages.length > 0) {
      output += '<h2>Check these images as they are resized</h2>';
      for (i = 0; i < logResizedImages.length; i += 1) {
        output += '<a href="' + logResizedImages[i] + '"target="_blank"><img src="' + logResizedImages[i] + '" width="50"></a>';
      }
    }

    if (logLargeImages.length > 0) {
      output += '<h2>Large images</h2>';
      for (i = 0; i < logLargeImages.length; i += 1) {
        output += '<a href="' + logLargeImages[i] + '"target="_blank"><img src="' + logLargeImages[i] + '" width="50"></a>';
      }
    }

  } else {
    output += '<p><span class="content-thermometer__good">&#10003;</span> The size of the images is below the benchmark, nice one</p>';
  }

  return output;
};

var updateThermometer = function (imageScorePercentage) {
  temperature.style.backgroundColor = _getTemperatureColor(imageScorePercentage);
  temperature.style.color = _getTemperatureColor(imageScorePercentage);

  if (imageScorePercentage < 200) {
    temperature.style.height = (imageScorePercentage / 2) + '%';
  } else {
    // limit temperature's highest point
    temperature.style.height = 120 + '%';
  }
};

var updateMessage = function (imageScorePercentage, logImages) {
  message.innerHTML = createMessage(imageScorePercentage, logImages);
  var close_message = document.getElementById("close_message");
  _registerEventHandler(close_message);
};

module.exports = {
  createDom: createDom,
  updateThermometer: updateThermometer,
  updateMessage: updateMessage
};

},{}]},{},[1]);
