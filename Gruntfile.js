/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> */\n',
        // +
        // ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                files: {

                    'web/dist/<%= pkg.name %>_libs.js': [
                        'web/libs/leaflet-dvf/leaflet-dvf.js',
                        'web/libs/leaflet.fullscreen/Control.FullScreen.js',
                        'web/libs/spin.js/spin.js',
                        'web/libs/Leaflet.Spin/leaflet.spin.js',
                        'web/libs/leaflet-zoom-min/L.Control.ZoomMin.js',
                        'web/libs/sidebar-v2/leaflet-sidebar.js',
                        // 'web/libs/PruneCluster/PruneCluster.js',
                        // 'web/libs/Leaflet.vector-markers/Leaflet.vector-markers.js',
                        'web/libs/bootstrap-toggle/js/bootstrap-toggle.js',
                        'web/libs/bootstrap-slider/dist/bootstrap-slider.js',
                        'web/libs/geohash-js/geohash.js',
                        'web/libs/node-geohash/main.js',
                        'web/libs/Leaflet.EasyButton/easy-button.js',
                        'web/libs/typeahead.js/dist/typeahead.bundle.js',
                        'web/libs/bootstrap-tagsinput/bootstrap-tagsinput.js',
                        'web/libs/beeswarm/beeswarm.js',
                        'web/libs/jsrender/jsrender.js',
                        'web/libs/jquery-infinite-scroll-helper/jquery.infinite-scroll-helper.js'

                    ],
                    'web/dist/<%= pkg.name %>.js': [
                        'web/js/*.js'
                    ]
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            prod: {
                files: {
                    'web/dist/<%= pkg.name %>_libs.min.js': 'web/dist/<%= pkg.name %>_libs.js',
                    'web/dist/<%= pkg.name %>.min.js': 'web/dist/<%= pkg.name %>.js'
                }
            }
        },
        cssmin: {
            prod: {
                files: [{
                    'web/dist/<%= pkg.name %>.min.css': [
                        'web/libs/leaflet-dvf/css/dvf.css',
                        'web/css/MarkerCluster.Default.css',
                        'web/libs/leaflet.fullscreen/Control.FullScreen.css',
                        'web/libs/leaflet-zoom-min/L.Control.ZoomMin.css',
                        'web/libs/sidebar-v2/leaflet-sidebar.css',
                        'web/libs/nvd3/nv.d3.css',
                        'web/libs/Leaflet.vector-markers/Leaflet.vector-markers.css',
                        'web/css/typeaheadjs.css',
                        'web/css/bootstrap-yeti.css',
                        'web/libs/bootstrap-tagsinput/bootstrap-tagsinput.css',
                        'web/libs/bootstrap-tagsinput/bootstrap-tagsinput-typeahead.css',
                        'web/libs/bootstrap-toggle/css/bootstrap-toggle.css',
                        'web/libs/bootstrap-slider/dist/css/bootstrap-slider.css',
                        'web/css/vb-popbio-maps.css'
                    ]

                }

                ]
            }

        },
        'copy-part-of-file': {
            prod: {
                options: {
                    sourceFileStartPattern: '<!-- SIMPLE START -->',
                    sourceFileEndPattern: '<!-- SIMPLE END -->',
                    destinationFileStartPattern: '<!-- START -->',
                    destinationFileEndPattern: '<!-- END -->'
                },
                files: {
                    'web/map_temp.html': ['web/vb_geohashes_mean.html'],
                    'web/vb_geohashes_mean_compiled.html': ['web/vb_geohashes_mean.html']
                }
            }
        },
        htmlmin: {                                     // Task
            prod: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true,
                    minifyURLs: true,
                    processScripts: ['text/x-jsrender'],
                    ignoreCustomComments: [/^\sSIMPLE/]  // keep these comments
                },
                files: {                                   // Dictionary of files
                    'web/vb_geohashes_mean_compiled_min.html': 'web/vb_geohashes_mean_compiled.html',   // 'destination': 'source'
                    'web/map.html': 'web/map_temp.html'   // 'destination': 'source'

                }
            }
        },
        clean: {
            prod: [
                'web/dist/<%= pkg.name %>_libs.js',
                'web/dist/<%= pkg.name %>.js',
                'web/map_temp.html',
                'web/vb_geohashes_mean_temp.html'

            ]
        }
    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-copy-part-of-file');


    // Default task.
    grunt.registerTask('createEmptyFiles', 'Creates an empty file', function () {
        grunt.file.write('web/map_temp.html', '<!-- START -->\n\n<!-- END -->');
    });
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'createEmptyFiles', 'copy-part-of-file', 'htmlmin', 'clean']);

};