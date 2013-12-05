module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      pagejs: {
        // src: 'public/pagejs/*.js',
        // dest: 'dist/pagejs/' + name + '.js'
        files: [{
          expand: true,
          cwd: 'public/pagejs',
          src: '**/*.js',
          dest: 'public/pagejs-min'
        }]
      },
      clis: {
        // src: 'public/pagejs/*.js',
        // dest: 'dist/pagejs/' + name + '.js'
        files: [{
          expand: true,
          cwd: 'clis',
          src: '**/*.js',
          dest: 'dist/clis'
        }]
      }
    },
    nodemon: {
      server: {
        options: {
          file: 'app.js',
          // args: ['production'],
          args: ['development'],
          ignoreFiles: ['node_modules/**'],
          watchedExtensions: ['js'],
          watchedFolders: ['./routes', './schemas', './models'],
          debug: true,
          delayTime: 1
        },
        exec: {
          options: {
            exec: 'node'
          }
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'public/pagejs/**/*.js', 'clis/**/*.js'],
      options: {
        '-W004': true,
        '-W008': true,
        '-W032': true,
        '-W033': true,
        '-W041': true,
        '-W069': true,
        '-W083': true,
        '-W099': true,
        // options here to override JSHint defaults??
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      },

    },
    watch: {
      minijs: {
        files: ['public/pagejs/*.js'],
        tasks: ['jshint']
      },
    },
    clean: {
      dist: ['client/dist']
    },
    recess: {
      options: {
        compile: true,
        banner: '<%= banner %>'
      },
      style: {
        src: ['client/src/less/style.less'],
        dest: 'client/dist/css/<%= pkg.name %>.css'
      },
      minify: {
        options: {
          compress: true
        },
        src: ['client/src/less/style.less'],
        dest: 'client/dist/css/<%= pkg.name %>.min.css'
      },
      // theme: {
      //   src: ['client/src/less/theme.less'],
      //   dest: 'client/dist/css/<%= pkg.name %>-theme.css'
      // },
      // theme_min: {
      //   options: {
      //     compress: true
      //   },
      //   src: ['client/src/less/theme.less'],
      //   dest: 'client/dist/css/<%= pkg.name %>-theme.min.css'
      // }
    },

    copy: {
      fonts: {
        expand: true,
        cwd: "client/src/fonts/",
        src: ["*"],
        dest: 'client/dist/fonts/'
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-recess');

  // JS distribution task.
  // grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['recess']);

  // Fonts distribution task.
  grunt.registerTask('dist-fonts', ['copy']);

  // Full distribution task.
  // grunt.registerTask('dist', ['clean', 'dist-css', 'dist-fonts', 'dist-js']);

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};