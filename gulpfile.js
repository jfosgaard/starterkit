'use strict';
const gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat-util'),
    browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('app/styles/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('watch', ['browserSync', 'sass', 'scripts'], function () {
    gulp.watch('app/styles/**/*.scss', ['sass']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/*.html', browserSync.reload);
    // Other watchers
})

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: ['dist', 'app']
        },
    })
})




gulp.task('default', ['watch']);
// var gulp = require('gulp'),
//     watch = require('gulp-watch');

// gulp.task('stream', function () {
//     // Endless stream mode 
//     return watch('styles/**/*.css', { ignoreInitial: false })
//         .pipe(gulp.dest('build'));
// });

// gulp.task('callback', function () {
//     // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event 
//     return watch('css/**/*.css', function () {
//         gulp.src('css/**/*.css')
//             .pipe(gulp.dest('build'));
//     });
// });