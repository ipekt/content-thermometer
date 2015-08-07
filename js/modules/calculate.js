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
