var fs = require('fs');
var css;

fs.readFile('./dist/css/style.min.css', function (err, data) {
  if (err) throw err;
  css = data.toString();
});

fs.readFile('./js/build/all.js', function (err, data) {
  if (err) throw err;
  var js_content = data.toString();
  
  var result = js_content.replace(/CSS STRING/g, css);
  fs.writeFile('./js/build/all.js', result, 'utf8', function (err) {
     if (err) throw err;
  });
});
