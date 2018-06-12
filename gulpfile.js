var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    twig = require('gulp-twig'),
    htmlmin = require('gulp-htmlmin'),
    csso = require('gulp-csso'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    stripDebug = require('gulp-strip-debug'),
    util = require('gulp-util');

/* CONFIGURACIÓN */

var config = {
    debug: (util.env.prod === undefined) ? true : false,
    source: {
        src: './src/',
        html: function () {
            return this.src + 'html/wrappers/*.html'
        },
        js:   function () {
            return [ this.src+'js/ui/*.js', this.src+'js/config.js', this.src+'js/app.js', this.src+'js/core/*.js', this.src+'js/services/*.js',
                this.src+'js/utils/*.js', this.src+'js/events/*.js']//this.src + 'js/*.js'
        },
        css:  function () {
            return this.src + 'css/*.css'
        },
        img:  function () {
            return this.src + 'img/*'
        },

        asscss: function () {
            return ['./src/assets/css/*.css']
        },

        assjs: function () {
            return ['./src/assets/js/*.js']
        },

        fonts: function () {
            return ['./src/assets/fonts/**']
        }
    },
    output: {
        dist: './dist/',
        assets: 'assets/',
        concat: {
            css: 'app.css',
            js: 'app.js',
            asscss: 'assets.css',
            assjs: 'assets.js'
        },
        folders: {
            css: 'css/',
            js: 'js/',
            img: 'img/',
            fonts: 'fonts/'
        },
        html: function () {
            return this.dist
        },
        js:   function () {
            return this.dist + this.folders.js;
        },
        css:  function () {
            return this.dist + this.folders.css;
        },
        img:  function () {
            return this.dist + this.folders.img;
        },

        asscss: function () {
            return this.dist + this.assets + this.folders.css;
        },

        assjs: function () {
            return this.dist + this.assets + this.folders.js;
        },

        fonts: function () {
            return this.dist + this.folders.fonts;
        }
    }
};


/* HTML */

gulp.task('html', function () {
    return gulp.src(config.source.html())
        .pipe(twig({
            data: {
                output: config.output
            }
        }))
        .pipe(config.debug ? util.noop() : htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(config.output.html()))
        .pipe(browserSync.reload({stream:true}));
});

/* CSS */

gulp.task('css', function () {
    return gulp.src(config.source.css())
        .pipe(concat(config.output.concat.css))
        .pipe(config.debug ? util.noop() : csso())
        .pipe(gulp.dest(config.output.css()))
        .pipe(browserSync.reload({stream:true}));
});


/* JS */

gulp.task('js', function () {
    return gulp.src(config.source.js())
        .pipe(concat(config.output.concat.js))
        .pipe(config.debug ? util.noop() : uglify())
        .pipe(config.debug ? util.noop() : stripDebug())
        .pipe(gulp.dest(config.output.js()))
        .pipe(browserSync.reload({stream:true}));
});


/* IMAGENES */
gulp.task('img', function () {
    return gulp.src(config.source.img())
        .pipe(config.debug ? util.noop() : imagemin())
        .pipe(gulp.dest(config.output.img()))
});


/* ASSETS */

// css
gulp.task('asscss', function () {
    return gulp.src(config.source.asscss())
        .pipe(concat(config.output.concat.asscss))
        .pipe(csso())
        .pipe(gulp.dest(config.output.asscss()))
});

//js
gulp.task('assjs', function () {
    gulp.src(config.source.assjs())
        .pipe(concat(config.output.concat.assjs))
        .pipe(uglify())
        .pipe(stripDebug())
        .pipe(gulp.dest(config.output.assjs()))
});

gulp.task('fonts', function () {
    return gulp.src(config.source.fonts())
    .pipe(gulp.dest('dist/assets/fonts'))
});

gulp.task('browser-sync', ['html', 'css', 'js'], function() {
    browserSync({
        server: {
            baseDir: "./dist/"
        }
    });
    gulp.watch(['./src/html/*.html', './src/html/**/*.html' ], ['html']);
    gulp.watch('./src/css/*.css', ['css']);
    gulp.watch(config.source.js(), ['js']);
});

gulp.task('assets', ['asscss', 'assjs', 'fonts']);

gulp.task('default', ['html', 'css', 'js', 'img', 'assets', 'browser-sync']);