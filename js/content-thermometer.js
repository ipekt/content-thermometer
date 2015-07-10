/*jslint browser: true*/
(function (document, window) {

  var page = document.getElementsByTagName('html')[0],
    benchmarkPage = 50000, // max characters allowed in a page
    benchmarkForImage = 100000, // max pixel in an image
    benchmarkForImages = benchmarkForImage * 15, // max pixels in a page
    pageCharacters = page.innerText.length, // count the characters in the current page
    logLargeImages = [], // log for large images
    logResizedImages = [],
    state = {}; // store state information


  // find all the image tags in a page and count up their pixels
  // if some of the images are big or resized log them for later
  function countPixelsInImages() {
    var i, imageTotal = 0, currentImage = 0, images = document.getElementsByTagName('img');

    for (i = 0; i < images.length; i = i + 1) {
      currentImage = images[i].naturalWidth * images[i].naturalHeight
      imageTotal += currentImage;

      if (currentImage > benchmarkForImage && images[i].naturalWidth !== images[i].width) {
        logResizedImages.push(images[i].src);
      } else if (currentImage > benchmarkForImage) {
        logLargeImages.push(images[i].src);
      } 
    }

    return imageTotal;
  }

  function getTemperatureColor(percentage) {
    var color = ['#27ae60', '#f17935', '#dd4b39'],
      returnColor;

      percentage = percentage * .5;

    if (percentage < 25) {
      returnColor = color[0];
    } else if (percentage < 75) {
      returnColor = color[1];
    } else {
      returnColor = color[2];
    }

    return returnColor;
  }

  function createMessage(pageScorePercent, imageScorePercent) {
    var i, message = [], output = '<h1>Content Thermometer Info</h1>', pageDifference, imageDifference;

    //message.push(pageScorePercent + ' x ' + imageScorePercent);

    pageDifference = pageScorePercent - 100;
    imageDifference = imageScorePercent - 100;

    if (pageDifference > 0) {
      output += '<p><span class="content-thermometer__bad">&#10007;</span> The length of the content in the page is  ' + Math.floor(pageDifference) + '% above the benchmark</p>';
    } else {
      output += '<p><span class="content-thermometer__good">&#10003;</span> The length of the content is below the benchmark, nice one</p>';
    }

    if (imageDifference > 0) {
      output += '<p><span class="content-thermometer__bad">&#10007;</span> The size of the images in the page is ' + Math.floor(imageDifference) + '% above the benchmark</p>';

      if (logResizedImages.length > 0) {
        output += '<h2>Check these images as they are resized</h2>';
        for (var i = 0; i < logResizedImages.length; i = i + 1) {
          output += '<img src="' + logResizedImages[i] + '" width="50">';
        }        
      }
      
      if (logLargeImages.length > 0) {
        output += '<h2>Large images</h2>';
        for (var i = 0; i < logLargeImages.length; i = i + 1) {
          output += '<img src="' + logLargeImages[i] + '" width="50">';
        }        
      }

    } else {
      output += '<p><span class="content-thermometer__good">&#10003;</span> The size of the images is below the benchmark, nice one</p>';
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
        temperature.style.height = (scoreData.percentage / 2) + '%';

        temperature.style.backgroundColor = getTemperatureColor(scoreData.percentage);
        temperature.style.color = getTemperatureColor(scoreData.percentage);

        message.innerHTML = scoreData.message;
      }
    };
  }

  function calculatePageScore() {
    var totalPixels = countPixelsInImages(),
      benchmarkPagePercentage = 100 / benchmarkPage,
      benchmarkImagePercentage = 100 / benchmarkForImages,
      pageScorePercent = (pageCharacters * benchmarkPagePercentage),
      imageScorePercent = (totalPixels * benchmarkImagePercentage);

    return {
      'percentage': Math.floor(pageScorePercent + imageScorePercent) / 2,
      'message': createMessage(pageScorePercent, imageScorePercent)
    };
  }

  function createCss() {
    var node = document.createElement('style'), styles = "CSS-STRING";
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
