var gulp = require('gulp');
var del = require('del');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');

var screeps = require('gulp-screeps');
var credentials = require('./config/screeps.json');

var tsConfig = require('./tsconfig.json');

var source = tsConfig.filesGlob;

var tsProject = ts.createProject({
    target: tsConfig.compilerOptions.target,
    sourceMap: false,
    removeComments : tsConfig.compilerOptions.removeComments,
    noImplicitAny: tsConfig.compilerOptions.noImplicitAny,
    declarationFiles: tsConfig.compilerOptions.declaration,
    noExternalResolve: true
});

gulp.task('clean', function (callback) {
    del(['js/**/*.js', '!js/lib/*.js'], function (error) {
        if (error) {
            return callback(error);
        }
        callback();
    });
});

gulp.task('screeps', function () {
    gulp.src('dist/*.js')
        .pipe(screeps(credentials));
});

gulp.task('typescript', function () {
    var tsResult = gulp.src(source)
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject, undefined, ts.reporter.longReporter(true)));

    tsResult.js
        .pipe(gulp.dest(tsConfig.compilerOptions.outDir));
});

gulp.task('watch', ['typescript'], function () {
    var watcher = gulp.watch(source, ['typescript']);
    watcher.on('change', function (event) {
        var filename = path.basename(event.path);
        console.log(filename + ' was ' + event.type + ', compiling project...');
    });
});

gulp.task('ts', ['typescript']);
gulp.task('build', ['clean', 'typescript']);
gulp.task('default', ['watch']);
