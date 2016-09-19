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
                    'dist/src/client/js/app.min.js': ['src/client/js/app.js', 'src/client/js/**/*.js'],
                    'dist/src/client/js/vendor.min.js': require('wiredep')().js
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
                    'dist/src/client/css/style.min.css': 'src/client/**/*.css',
                    'dist/src/client/css/vendor.min.css': require('wiredep')().css
                }
            }
        },

        wiredep: {
            dev: {
                src: ['src/client/index.html']
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
            buildApp: {
                options: {
                    addRootSlash: false,
                    ignorePath: 'dist'
                },
                files: {
                    'dist/src/client/index.html': [
                        'dist/src/client/js/vendor.min.js',
                        'dist/src/client/js/app.min.js',
                        'dist/src/client/css/vendor.min.css',
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
            }
        },

        clean: {
            all: ['dist'],
            app: ['dist/src/client/css/*.css', 'dist/src/client/js/*.js']
        },

        processhtml: {
            dist: {
                files: {
                    'dist/src/client/index.html': ['src/client/index.html']
                }
            }
        },

        shell: {
            dockerize: {
                command: 'docker build -t json-lodash-analyzer .'
            },
            dockerTagLatest: {
                command: 'docker tag json-lodash-analyzer 873280763015.dkr.ecr.us-east-1.amazonaws.com/json-lodash-analyzer:latest'
            },
            dockerTag: {
                command: 'docker tag json-lodash-analyzer 873280763015.dkr.ecr.us-east-1.amazonaws.com/json-lodash-analyzer:<%= pkg.version %>'
            },
            awsDockerlogin: {
                command: 'eval $(aws ecr get-login)'
            },
            push: {
                command: 'docker push 873280763015.dkr.ecr.us-east-1.amazonaws.com/json-lodash-analyzer:latest && ' +
                'docker push 873280763015.dkr.ecr.us-east-1.amazonaws.com/json-lodash-analyzer:<%= pkg.version %>'
            },
            restart: {
                command: 'aws ecs update-service --service sample-lodash-analyzer --desired-count 0' +
                    'echo " please run aws ecs update-service --service sample-lodash-analyzer --desired-count 1"'
            }
        }


    });

    // ============= // CREATE TASKS ========== //
    grunt.registerTask('default', ['jshint', 'injector:dev', 'wiredep:dev']);

    grunt.registerTask('build', ['clean:all', 'copy', 'clean:app',
        'processhtml:dist', 'uglify', 'cssmin', 'injector:buildApp']);

    grunt.registerTask('deploy', ['shell']);


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-shell');

};