module.exports = function(grunt){

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
                    'dist/js/app.min.js': 'src/client/js/**/*.js'
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
                    'dist/css/style.min.css': 'src/client/**/*.css'
                }
            }
        },

        wiredep: {
            task: {
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
            local_dependencies: {
                files: {
                    'src/client/index.html': [
                        'src/client/js/app.js', //This is done to inject the app.js first
                        'src/client/js/**/*.js',
                        'src/client/css/**/*.css'
                    ]
                }
            }
        }

    });

    // ============= // CREATE TASKS ========== //
    grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']);

    grunt.registerTask('inject', ['injector', 'wiredep']);


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-injector');

};