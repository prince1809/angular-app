module.exports = function(grunt) {

  // Loading grunt task lib
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-recess');

  // Default task
  grunt.registerTask('default',['clean','copy','concat','recess']);

  // Project configuration
  grunt.initConfig({

    distdir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    banner:
    '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n',
    src: {
      js: ['src/**/*.js'],
      html: ['src/index.html'],
      less: ['src/less/stylesheet.less']
    },
    clean: ['<%= distdir %>/*'],
    copy: {
      assets: {
        files: [{ dest: '<%= distdir %>', src: '**', expand: true, cwd: 'src/assets' }]
      }
    },
    concat: {
      dist: {
        options: {
          banner: "<%= banner %>"
        },
        src: '<%= src.js %>',
        dest: '<%= distdir %>/<%= pkg.name %>.js'
      },
      index: {
        src: ['src/index.html'],
        dest: '<%= distdir %>/index.html',
        options: {
          process: true
        }
      },
      angular: {
        src: ['vendor/angular/angular.js','vendor/angular/angular-route.js'],
        dest: '<%= distdir %>/angular.js'
      },
      mongo: {
        src: ['vendor/mongolab/*.js'],
        dest: '<%= distdir %>/mongolab.js'
      },
      bootstrap: {
        src: ['vendor/angular-ui/bootstrap/*.js'],
        dest: '<%= distdir %>/bootstrap.js'
      },
      jquery: {
        src: ['vendor/jquery/*.js'],
        dest: '<%= distdir %>/jquery.js'
      }
    },
    recess: {
      build: {
        files: {
          '<%= distdir %>/<%= pkg.name %>.css':
          ['<%= src.less %>'] },
        options: {
          compile: true
        }
      },
      min: {
        files: {
          '<%= distdir %>/<%= pkg.name %>.css': ['<%= src.less %>']
        },
        options: {
          compress: true
        }
      }
    },

  });
};
