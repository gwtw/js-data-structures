module.exports = function(grunt) {
  'use strict';

  grunt.config.init({
    pkg: grunt.file.readJSON('package.json')
  });

  grunt.loadNpmTasks('grunt-jasmine-node-coverage');
  grunt.config('jasmine_node', {
    coverage: {
      options: {
        coverage: {},
        forceExit: true,
        match: '.',
        matchAll: false,
        specFolders: ['test'],
        extensions: 'js',
        specNameMatcher: 'spec',
        captureExceptions: true,
        junitreport: {
          report: false,
          savePath : './build/reports/jasmine/',
          useDotNotation: true,
          consolidate: true
        }
      },
      src: ['**/*.js']
    }
  });

  grunt.registerTask('coverage', [
    'jasmine_node:coverage'
  ]);

  grunt.registerTask('default', [
    'coverage'
  ]);
};
