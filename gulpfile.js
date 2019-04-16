let gulp = require('gulp');
let plumber = require('gulp-plumber');
let jade = require('gulp-jade');
let babel = require('gulp-babel');
let browserSync = require('browser-sync').create();
let browserify = require('gulp-browserify');
let autoprefixer = require('gulp-autoprefixer');
let stylus = require('gulp-stylus');
let rename = require("gulp-rename");
let vueify = require('gulp-vueify');
let replaceName = require('gulp-replace-name');



gulp.task('jade', () => {
    return gulp.src('./frontend/**/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .on('error', console.log)
        .pipe(gulp.dest('./build/'))
});

gulp.task('js', () => {
    return gulp.src('./src/assets/js/admin.js')
        .pipe(plumber())
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
        .pipe(gulp.dest('./build/js/'))
});

gulp.task('vue', () => {
    return gulp.src('./src/assets/js/vue/**/*.vue')
        .pipe(plumber())
        .pipe(vueify())
        .pipe(replaceName(/.js/g, '.component.js'))
        .pipe(gulp.dest('./src/assets/js/vue'))
});

gulp.task('styles', () => {
    return gulp.src('./src/assets/styles/*.styl')
        .pipe(rename('/admin.css'))
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

gulp.task('build', ['styles', 'vue', 'js', 'jade']);

gulp.task('watch', function () {
    gulp.watch(['src/assets/styles/**/*.styl'], ['styles']);
    gulp.watch(['src/assets/js/**/*.js', '!src/assets/js/**/*.component.js'], ['js']);
    gulp.watch(['src/assets/js/**/*.vue'], ['vue', 'js']);
    gulp.watch(['frontend/**/*.jade'], ['jade']);
});

gulp.task('default', ['build', 'watch', 'browser-sync']);