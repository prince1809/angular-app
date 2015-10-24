module.exports = function(grunt) {

  // Loading grunt task lib
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task
  grunt.registerTask('default',['clean','copy']);

  // Project configuration
  grunt.initConfig({

    distdir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    banner:
    '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n',
    src: {
      js: ['src/**/*.js'],
      html: ['src/index.html']
    },
    clean: ['<%= distdir %>/*'],
    copy: {
      assets: {
        files: [{ dest: '<%= distdir %>', src: '**', expand: true, cwd: 'src/assets' }]
      },
      index: {
        files: [{ dest: '<%= distdir %>', src: '*.html', expand: true,  cwd: 'src/'}]
      }
    },

  });
};
