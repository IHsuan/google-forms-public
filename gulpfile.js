var gulp = require('gulp');

var gulpSass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var compass = require('compass-importer');

var concat = require('gulp-concat');

var babel = require('gulp-babel');
var pump = require('pump');
var uglify = require('gulp-uglify');



var pages = [
    'index',
    'admin'
];

// ===== css =====
gulp.task('css', async function () {

    pages.forEach(function (element) {
        let file = `${element}.scss`;

        gulp.src(
            [
                './src_scss/' + file,
            ])
            .pipe(
                gulpSass({
                    importer: compass,
                    outputStyle: 'compressed'
                    // outputStyle: 'compressed'
                }).on('error', gulpSass.logError))
            .pipe(autoprefixer())
            .pipe(gulp.dest('./css'));
    });

});




// ===== js =====
gulp.task('js', async function () {

    pages.forEach(function (element) {
        let file = `${element}.js`;

        pump([
            gulp.src(
                [
                    './src_js/common.js',
                    './src_js/component/questionnaire.js',
                    './src_js/' + file
                ], {
                    allowEmpty: true
                })
                .pipe(concat(file))
                .pipe(babel({
                    presets: ['env']
                })),
            uglify(),
            gulp.dest('./js')
        ]);
    });

});





// ===== task =====
gulp.task('default', gulp.parallel('css', 'js'));

gulp.task('watch', function () {
    gulp.watch('src_scss/**/*', gulp.series('css'));
    gulp.watch('src_js/**/*', gulp.series('js'));
});
