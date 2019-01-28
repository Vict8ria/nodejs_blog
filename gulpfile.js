let gulp = require('gulp');
let plumber = require('gulp-plumber');
let jade = require('gulp-jade');
let babel = require('gulp-babel');
let browserSync = require('browser-sync').create();
let browserify = require('gulp-browserify');
let autoprefixer = require('gulp-autoprefixer');
let stylus = require('gulp-stylus');
let rename = require("gulp-rename");


gulp.task('jade', () => {
    return gulp.src('./frontend/index.jade')
        .pipe(jade({
            pretty: true
        }))
        .on('error', console.log)
        .pipe(gulp.dest('./build/'))
});

gulp.task('js', () => {
    return gulp.src('./src/assets/js/main.js')
        .pipe(browserify())
        .pipe(babel({
            presets: [
                ['@babel/preset-env',
                    {
                        targets: {
                            chrome: 52,
                            ie: 8
                        }
                    }
                ]
            ]
        }))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream())
});

gulp.task('styles', () => {
    return gulp.src('./src/assets/styles/*.styl')
        .pipe(rename('/main.css'))
        .pipe(plumber())
        .pipe(stylus({
            compress: false
        }))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
            cascade: false
        }))
        .pipe(gulp.dest('./build/styles/'))
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('build', ['styles', 'js', 'jade']);

gulp.task('watch', function () {
    gulp.watch(['./src/assets/styles/**/*.styl'], ['styles']);
    gulp.watch(['./src/assets/js/**/*.js'], ['js']);
    gulp.watch(['./frontend/**/*.jade'], ['jade']);
});

gulp.task('default', ['build', 'watch', 'browser-sync']);