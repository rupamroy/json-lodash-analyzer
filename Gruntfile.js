module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            build: ['Gruntfile.js', 'src/**/*.js']

        },

        // configure uglify to minify js files -------------------------------------
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/src/client/js/app.min.js': ['src/client/js/app.js', 'src/client/js/**/*.js']
                }
            }
        },

        // configure cssmin to minify css files ------------------------------------
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/src/client/css/style.min.css': 'src/client/**/*.css'
                }
            }
        },

        wiredep: {
            dev: {
                src: ['src/client/index.html'],
                "overrides": {
                    "angular": {
                        "dependencies": {
                            "jquery": "*"
                        }
                    },
                    "bootstrap": {
                        "main": [
                            "less/bootstrap.less",
                            "dist/css/bootstrap.css",
                            "dist/js/bootstrap.js"
                        ]
                    },
                    "angular-bootstrap": {
                        "main": [
                            "ui-bootstrap-csp.css",
                            "ui-bootstrap.js",
                            "ui-bootstrap-tpls.js"
                        ]
                    },
                    "bootswatch": {
                        "main": [
                            "superhero/bootstrap.css"
                        ]
                    }
                }
            }
        },

        injector: {
            options: {},
            dev: {
                files: {
                    'src/client/index.html': [
                        'src/client/js/app.js', //This is done to inject the app.js first
                        'src/client/js/**/*.js',
                        'src/client/css/**/*.css'
                    ]
                }
            },
            build: {
                options: {
                    addRootSlash: false,
                    ignorePath: 'dist'
                },
                files: {
                    'dist/src/client/index.html': [
                        'dist/src/client/js/app.min.js',
                        'dist/src/client/css/style.min.css'
                    ]
                }
            }
        },

        copy: {
            app: {
                expand: true,
                src: 'src/**/*',
                dest: 'dist/'
            },
            bower: {
                expand: true,
                src: 'bower_components/**/*',
                dest: 'dist/'
            },
            node_modules: {
                expand: true,
                src: 'node_modules/**/*',
                dest: 'dist/'
            }
        },

        clean: {
            all: ['dist'],
            app: ['dist/src/client/css/*.css', 'dist/src/client/js/*.js']
        }

    });

    // ============= // CREATE TASKS ========== //
    grunt.registerTask('default', ['jshint', 'wiredep', 'injector:dev']);

    grunt.registerTask('build', ['clean:all', 'copy', 'clean:app', 'uglify', 'cssmin', 'injector:build']);




    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-contrib-clean');

};