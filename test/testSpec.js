var calculateTests = require('../js/modules/calculate.js');
var viewTests = require('../js/modules/view.js');


describe('Calculate module', function () {
  var testImage = [{ naturalWidth: 500, naturalHeight: 200 }, {naturalWidth: 1000, naturalHeight: 30}];
  
  it('should return total width * height count', function () {

    var countPixels = calculateTests.countPixels(testImage);
    expect(countPixels).toEqual(130000);
  });

  it('should return object', function () {
    var logImages = calculateTests.logImages(testImage);
    expect( typeof(logImages) ).toBe('object');
  });

});


describe('View module', function () {

  it('should not return null', function () {
    var createDom = viewTests.createDom();
    expect(createDom).not.toBeNull();
  });

  it('should return object', function () {
    var createDom = viewTests.createDom();
    expect( typeof(createDom) ).toBe('object');
  });

});
