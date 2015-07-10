module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-string-replace');

  // Project configuration.
  grunt.initConfig({
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },
    'string-replace': {
      css: {
        files: {
          'dist/js/content-thermometer.js': 'js/**',
        },
        options: {
          replacements: [
            // place files inline example
            {
              pattern: 'CSS-STRING',
              replacement: '<%= grunt.file.read("dist/css/content-thermometer.min.css") %>'
            }
          ]
        }
      }
    }
  });

  grunt.registerTask('default', '', ['cssmin','string-replace']);

};
