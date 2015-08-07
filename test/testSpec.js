var calculateTests = require('../js/modules/calculate.js');
var viewTests = require('../js/modules/view.js');


describe('Calculate module', function () {
  var testImage = [{
    naturalWidth: 500,
    naturalHeight: 200
  }, {
    naturalWidth: 1000,
    naturalHeight: 30
  }];

  it('should return total width * height count', function () {
    var countPixels = calculateTests.countPixels(testImage);
    expect(countPixels).toEqual(130000);
  });

});


describe('View module', function() {

  var createDom = viewTests.createDom();
  var thermometer = createDom.getElementsByClassName('thermometer');
  var temperature = createDom.getElementsByClassName('content-thermometer__temperature');
  var message = createDom.getElementsByClassName('content-thermometer__message');

  it('should not return null', function () {
    expect(createDom).not.toBeNull();
  });

  it('should return object', function () {
    expect(typeof(createDom)).toBe('object');
  });

  it('should have element with thermometer class', function () {
    expect(thermometer.length).toBe(1);
  });

  it('should have element with temperature class', function () {
    expect(temperature.length).toBe(1);
  });

  it('should have element with message class', function () {
    expect(message.length).toBe(1);
  });

});
