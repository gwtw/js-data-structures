module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    umd: {
      binaryHeap: {
        src: 'src/binary-heap.js',
        dest: 'dist/binary-heap.js',
        objectToExport: 'binaryHeap'
      },
      binomialHeap: {
        src: 'src/binomial-heap.js',
        dest: 'dist/binomial-heap.js',
        objectToExport: 'binomialHeap'
      }
    }
  });

  var tasks = [
    'grunt-umd'
  ];

  for (var i = 0; i < tasks.length; i++) {
    grunt.loadNpmTasks(tasks[i]);
  }

  grunt.registerTask('default', [
    'umd'
  ]);
};
