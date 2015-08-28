module.exports = function(grunt) {
  'use strict';

  grunt.config.init({
    pkg: grunt.file.readJSON('package.json')
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.config('eslint', {
    dist: {
      options: {
        configFile: '.eslintrc',
      },
      src: ['lib/**/*.js']
    }
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

  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.config('jsdoc', {
    dist : {
      src: ['index.js', 'lib/**/*.js'],
      options: {
        destination: 'doc',
        readme: 'README.md'
      }
    }
  });

  grunt.registerTask('default', [
    'eslint',
    'jsdoc',
    'jasmine_node'
  ]);
};
