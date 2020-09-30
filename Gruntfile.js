const sass = require('node-sass');

module.exports = (grunt) => {
    require('load-grunt-tasks')(grunt);

    const watchOptions = {
        debounceDelay: 250,
        spawn: false,
    };

    grunt.initConfig({
        copy: {
            main: {
                files: [
                    { expand: true, src: ['**'], dest: 'public/', cwd: 'client/static/' },
                ]
            }
        },
        babel: {
            options: {
                sourceMap: false,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    'public/js/util.js': 'client/src/js/util.js',
                    'public/js/details-view.js': 'client/src/js/details-view.js',
                    'public/js/filter.js': 'client/src/js/filter.js',
                    'public/js/header.js': 'client/src/js/header.js',
                    'public/js/wordmark.js': 'client/src/js/wordmark.js',
                }
            }
        },
        sass: {
            options: {
                implementation: sass,
                sourceMap: false
            },
            dist: {
                files: {
                    'public/css/critical.css': 'client/src/scss/critical.scss',
                    'public/css/non-critical.css': 'client/src/scss/non-critical.scss',
                }
            }
        },
        watch: {
            static: {
                files: ['client/static/**/*.*'],
                tasks: ['copy'],
                options: watchOptions
            },
            scripts: {
                files: ['client/src/**/*.js'],
                tasks: ['babel'],
                options: watchOptions,
            },
            style: {
                files: ['client/src/**/*.scss'],
                tasks: ['sass'],
                options: watchOptions,
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', ['babel', 'sass', 'copy']);
    grunt.registerTask('dev', ['build', 'watch']);
    grunt.registerTask('default', ['build']);
};