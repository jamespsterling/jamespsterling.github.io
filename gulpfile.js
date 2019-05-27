var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('scripts', function() {
    return gulp
        .src('js/*.js')
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(uglify({
            preserveComments: 'license'
        }))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('scss', function() {
    return gulp.src('scss/*.scss')
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(gulp.dest('css'));
});

gulp.task('sass', function() {
    return gulp.src('scss/*.sass')
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(gulp.dest('css'));
});

gulp.task('watch', ['scripts', 'scss', 'sass'], function() {
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('scss/*', ['scss', 'sass']);
});
