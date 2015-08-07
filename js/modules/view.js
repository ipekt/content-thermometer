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
    styles = "CSS STRING";
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
