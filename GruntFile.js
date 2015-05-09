module.exports = function(grunt) {
  'use strict';

  grunt.config.init({
    pkg: grunt.file.readJSON('package.json')
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.config('clean', {
    dist: 'dist'
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.config('copy', {
    dist: {
      files: [{
        expand: true,
        flatten: true,
        src: 'src/*',
        dest: 'dist/'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.config('uglify', {
    options: {
      preserveComments: 'some'
    },
    dist: {
      files: [{
        expand: true,
        cwd: 'src',
        src: '**/*.js',
        dest: 'dist/',
        rename: function (dest, src) {
          return dest + src.replace(/\.js$/, '.min.js');
        }
      }]
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

  grunt.registerTask('dist', [
    'clean:dist',
    'copy:dist',
    'uglify:dist'
  ]);

  grunt.registerTask('coverage', [
    'jasmine_node:coverage'
  ]);

  grunt.registerTask('default', [
    'dist',
    'coverage'
  ]);
};
