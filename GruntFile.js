module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jasmine_node: {
      coverage: { },
      options: {
        extensions: 'js',
        specNameMatcher: '.*-spec',
        captureExceptions: true
      }
    }
  });

  var tasks = [
    'grunt-jasmine-node-coverage'
  ];

  for (var i = 0; i < tasks.length; i++) {
    grunt.loadNpmTasks(tasks[i]);
  }
  grunt.registerTask('coverage', [
    'jasmine_node'
  ]);

  grunt.registerTask('default', [
    'coverage'
  ]);
};
