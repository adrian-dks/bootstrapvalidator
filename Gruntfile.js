module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        buildDir: 'dist',

        banner: [
            '/**',
            ' * BootstrapValidate v<%= pkg.version %> (<%= pkg.homepage %>)',
            ' *',
            ' * A jQuery plugin to validate form fields. Use with Bootstrap 3',
            ' *',
            ' * @author      Nguyen Huu Phuoc <phuoc@huuphuoc.me>',
            ' * @copyright   (c) 2013 Nguyen Huu Phuoc',
            ' * @license     MIT',
            ' */\n\n'
        ].join('\n'),

        copy: {
            main: {
                files: [
                    { cwd: 'src/css', src: '**', dest: '<%= buildDir %>/css', expand: true, flatten: true, filter: 'isFile' }
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
                    '<%= buildDir %>/css/bootstrapvalidate.min.css': ['src/css/bootstrapvalidate.css']
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
                src: ['src/js/bootstrapvalidate.js', 'src/js/validator/*.js'],
                dest: '<%= buildDir %>/js/bootstrapvalidate.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            build: {
                src: ['<%= buildDir %>/js/bootstrapvalidate.js'],
                dest: '<%= buildDir %>/js/bootstrapvalidate.min.js'
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
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
};