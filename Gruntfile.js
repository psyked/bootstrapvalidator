module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        buildDir: 'dist',

        banner: [
            '/**',
            ' * BootstrapValidator (<%= pkg.homepage %>)',
            ' *',
            ' * <%= pkg.description %>',
            ' *',
            ' * @version     v<%= pkg.version %>',
            ' * @author      <%= pkg.author.url %>',
            ' * @copyright   (c) 2013 - 2014 Nguyen Huu Phuoc',
            ' * @license     MIT',
            ' */\n\n'
        ].join('\n'),

        copy: {
            main: {
                files: [
                    { cwd: 'src/css', src: '**', dest: '<%= buildDir %>/css', expand: true, flatten: true, filter: 'isFile' },
                    { cwd: 'src/js/languages', src: '**', dest: '<%= buildDir %>/js/languages', expand: true, flatten: true, filter: 'isFile' }
                ]
            }
        },

        cssmin: {
            minify: { expand: true, cwd: 'src/css/', src: ['*.css'], dest: '<%= buildDir %>/css/', ext: '.min.css' },
            add_banner: {
                options: {
                    banner: '<%= banner %>'
                },
                files: {
                    '<%= buildDir %>/css/bootstrapValidator.min.css': ['src/css/bootstrapValidator.css']
                }
            }
        },

        concat: {
            options: {
                separator: ';',
                stripBanners: true,
                banner: '<%= banner %>'
            },
            dist: {
                src: ['src/js/bootstrapValidator.js', 'src/js/validator/*.js'],
                dest: '<%= buildDir %>/js/bootstrapValidator.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            build: {
                src: ['<%= buildDir %>/js/bootstrapValidator.js'],
                dest: '<%= buildDir %>/js/bootstrapValidator.min.js'
            }
        },

        jshint: {
            all: [
                'src/js/**/*.js'
            ],
            options: {
                browser: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                es3: true,
                expr: true,
                laxbreak: true,   // Allow line breaking before && or ||
                loopfunc: true,
                newcap: true,
                noarg: true,
                onevar: true,
                sub: true,
                undef: true,
                white: true

                /*
                'node': false,
                'boss': false,
                'debug': false,
                'devel': false,
                'evil': false,
                'forin': false,
                'immed': false,
                'noempty': false,
                'nonew': false,
                'plusplus': false,
                'regexp': false,
                'strict': false,
                'globals': {
                    'define': false
                }
                */
            }
        },

        watch: {
            scripts: {
                files: ['src/css/**', 'src/js/**'],
                tasks: ['build'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('default', 'build');
    grunt.registerTask('build', ['copy', 'cssmin', 'concat', 'uglify']);

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
