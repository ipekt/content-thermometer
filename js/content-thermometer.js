/*jslint browser: true*/
(function (document, window) {

  var page = document.getElementsByTagName('html')[0],
    benchmarkPage = 100 / 60000,
    benchmarkImage = 100 / 500000,
    pageCharacters = page.innerText.length,
    state = {};

  function countPixelsInImages() {
    var i, imageTotal = 0, images = document.getElementsByTagName('img');

    for (i = 0; i < images.length; i = i + 1) {
      imageTotal += images[i].naturalWidth * images[i].naturalHeight;
    }

    return imageTotal;
  }

  function getTemperatureColor(percentage) {
    var color = ['#0076cc', '#f17935', '#dd4b39'],
      returnColor;

    if (percentage < 25) {
      returnColor = color[0];
    } else if (percentage < 75) {
      returnColor = color[1];
    } else {
      returnColor = color[2];
    }

    return returnColor;
  }

  function createMessage(pageScore, imageScore) {
    var i, message = [], output = '<h1>Content Info</h1>';

    if (pageScore > benchmarkPage) {
      message.push('<span class="content-thermometer__bad">&#10007;</span> The length of the content in the page is above the benchmark');
    } else {
      message.push('<span class="content-thermometer__good">&#10003;</span> The length of the content is below the benchmark, nice one');
    }

    if (imageScore > benchmarkImage) {
      message.push('<span class="content-thermometer__bad">&#10007;</span> The size of the images in the page is above the benchmark');
    } else {
      message.push('<span class="content-thermometer__good">&#10003;</span> The size of the images is below the benchmark, nice one');
    }

    for (i = 0; i < message.length; i = i + 1) {
      output += '<p>' + message[i] + '</p>';
    }

    return output;
  }

  function createDom(parent) {
    var thermometer = document.createElement('div'),
      temperature = document.createElement('div'),
      message = document.createElement('div');

    thermometer.className = 'content-thermometer';
    temperature.className = 'content-thermometer__temperature';
    message.className = 'content-thermometer__message';

    thermometer.appendChild(temperature);
    thermometer.appendChild(message);

    thermometer.addEventListener('click', function (ev) {
      ev.stopPropagation();
      ev.preventDefault();
      if (state.viewinfo === true) {
        thermometer.classList.remove("content-thermometer--show-info");
        state.viewinfo = false;
      } else {
        thermometer.classList.add("content-thermometer--show-info");
        state.viewinfo = true;
      }
    });



    parent.appendChild(thermometer);

    setTimeout(function () {
      thermometer.classList.add("content-thermometer--ready");
    }, 1); 

    return {
      'el': thermometer,
      'update': function (scoreData) {
        temperature.style.height = scoreData.percentage + '%';

        temperature.style.backgroundColor = getTemperatureColor(scoreData.percentage);
        temperature.style.color = getTemperatureColor(scoreData.percentage);

        message.innerHTML = scoreData.message;
      }
    };
  }

  function calculatePageScore() {
    var totalPixels = countPixelsInImages(),
      pageScore = (pageCharacters * benchmarkPage) / 2,
      imageScore = (totalPixels * benchmarkImage) / 2;

    return {
      'percentage': Math.floor(pageScore + imageScore),
      'message': createMessage(pageScore, imageScore)
    };
  }

  function createCss() {
    var node = document.createElement('style'), styles = ".content-thermometer{font-family:sans-serif;background-color:#E0D7D6;box-shadow:0 1px 1px #CCC;height:100px;width:10px;position:fixed;right:1em;top:1em;font-size:12px;box-sizing:border-box;cursor:pointer;opacity:0;transition:opacity ease-out 300ms}.content-thermometer--ready{opacity:1}.content-thermometer::after{background-color:#E0D7D6;border-radius:50%;box-shadow:0 1px 1px #CCC;content:'';height:20px;left:50%;position:absolute;bottom:0;width:20px;margin:-5px 0 0 -10px}.content-thermometer__temperature{background-color:transparent;color:#dd4b39;width:4px;position:absolute;bottom:5px;z-index:1;left:50%;margin:0 0 0 -2px;height:0;transition:height 500ms ease-out,background-color 100ms ease-out}.content-thermometer__temperature::after{color:inherit;background-color:inherit;border-radius:50%;content:'';width:10px;height:10px;position:absolute;bottom:0;margin-left:-5px;left:50%}.content-thermometer__message{position:absolute;right:100%;background:#fff;border:solid 1px #CCC;box-sizing:border-box;padding:.5em;margin-right:.5em;width:10em;position:absolute;right:100%;background:#fff;border:solid 1px #CCC;box-sizing:border-box;padding:.75em;margin-right:1em;width:20em;border-radius:3px;display:none}.content-thermometer--show-info .content-thermometer__message{display:block}.content-thermometer__good,.content-thermometer__bad{font-size:2em;float:left;margin-right:.5em}.content-thermometer__good{color:#27ae60}.content-thermometer__bad{color:#dd4b39}.content-thermometer__message h1{margin:0;font-size:1.4em}.content-thermometer__message:after,.content-thermometer__message:before{left:100%;top:50%;border:solid transparent;content:'';height:0;width:0;position:absolute;pointer-events:none}.content-thermometer__message:after{border-color:rgba(194,225,245,0);border-left-color:#fff;border-width:10px;margin-top:-10px}.content-thermometer__message:before{border-color:rgba(194,225,245,0);border-left-color:#CCC;border-width:11px;margin-top:-11px}";
    node.innerHTML = styles;
    document.body.appendChild(node);
  }

  window.addEventListener('load', function () {
    createCss();
    var thermometer = createDom(document.body);

    setTimeout(function () {
      thermometer.update(calculatePageScore());
    }, 250);

  }, false);

}(document, window));