module.exports = function(grunt) {

  // Loading grunt task lib
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-html2js');

  // Default task
  grunt.registerTask('default',['clean','html2js','copy','concat','recess']);

  //print a timestamp
  grunt.registerTask('timestamp', function(){
    grunt.log.subhead(Date());
  });

  // Project configuration
  grunt.initConfig({

    distdir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    banner:
    '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> Prince;\n' +
    ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
    src: {
      js: ['src/**/*.js'],
      jsTpl: ['<%= distdir %>/templates/**/*.js'],
      html: ['src/index.html'],
      tpl: {
        app: ['src/app/**/*.tpl.html'],
        common: ['src/common/**/*.tpl.html']
      },
      less: ['src/less/stylesheet.less'],
      lessWatch: ['src/less/**/*.less']
    },
    clean: ['<%= distdir %>/*'],
    copy: {
      assets: {
        files: [{ dest: '<%= distdir %>', src: '**', expand: true, cwd: 'src/assets' }]
      }
    },
    html2js: {
      app: {
        options: {
          base: 'src/app'
        },
        src: ['<%= src.tpl.app %>'],
        dest: '<%= distdir %>/templates/app.js',
        module: 'templates.app'
      },
      common: {
        options: {
          base: 'src/common'
        },
        src: ['<%= src.tpl.common %>'],
        dest: '<%= distdir %>/templates/common.js',
        module: 'templates.common'
      }
    },
    concat: {
      dist: {
        options: {
          banner: "<%= banner %>"
        },
        src: ['<%= src.js %>','<%= src.jsTpl %>'],
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
    uglify: {
      dist: {
        options: {
          banner: "<%= banner %>"
        },
        src: ['<%= src.js %>','<%= src.jsTpl %>'],
        dest: '<%= distdir %>/<%= pkg.name %>.js'
      },
      angular: {
        src: ['<%= concat.angular.src %>'],
        dest: '<%= distdir %>/angular.js'
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
    watch: {
      all: {
        files: ['<%= src.js %>','<%= src.tpl.app %>','<%= src.tpl.common %>','<%= src.html %>'],
        tasks: ['default','timestamp']
      },
      build: {
        files: ['<%= src.js %>','<%= src.html %>'],
        tasks: ['default','timestamp']
      }
    }

  });
};
