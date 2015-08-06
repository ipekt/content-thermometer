var benchmark = 200000;

// Calculate total pixels of images
// NodeList => int
var countPixels = function (images) {
  var i, currentImage, imageTotal = 0;

  for (i = 0; i < images.length; i++) {
    currentImage = images[i].naturalWidth * images[i].naturalHeight;
    imageTotal += currentImage;
  }

  return imageTotal;
};

// Log large and resized images
// NodeList => obj
var logImages = function (images) {
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


// Calculates image score 
// NodeList => obj
var calculateScore = function (images) {
  var totalPixels = countPixels(images),
      benchmarkPercentage = 100 / benchmark,
      imageScorePercentage = (totalPixels * benchmarkPercentage);

  return imageScorePercentage;
};

module.exports = {
  countPixels: countPixels,
  calculateScore: calculateScore,
  logImages: logImages
};

