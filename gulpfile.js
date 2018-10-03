var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var pkg = require('./package.json');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var terser = require('gulp-terser');


var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  '\n'
].join('');


gulp.task('css:compile' , function() { 
    return gulp.src('./css/*.scss')
        .pipe(sass.sync({ outputStyle : 'expanded'}).on('error' , sass.logError))
        .pipe(autoprefixer({browsers : ['last 2 versions'] , cascade: false}))
        .pipe(header(banner , {pkg : pkg}))
        .pipe(gulp.dest('./css'))
});

gulp.task('css:minify' ,  function() {
    return gulp.src([
        './css/*.css',
        '!./css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
        suffix:'.min'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
})

gulp.task('css' , ['css:compile' , 'css:minify']);

gulp.task('es' , function() {
    gulp.src([
        './js/*.js',
        '!./js/*.min.js'
    ])
    .pipe(terser())
    .pipe(rename({
        suffix:'.min'
    }))
    .pipe(gulp.dest('./build'));
})

gulp.task('js:minify', function() {
    return gulp.src([
        './build/*.js',
        '!./build/*.min.js'
      ])
      .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(header(banner, {
        pkg: pkg
      }))
      .pipe(gulp.dest('./build'))
      .pipe(browserSync.stream());
  });
gulp.task('js' , ['es']);
gulp.task('default' , ['css','js']);

gulp.task('browserSync' , function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
});


gulp.task('dev' , ['css' ,'js', 'browserSync'], function() {
    gulp.watch('./css/*.scss' , ['css']);
    gulp.watch('./js/*.js' , ['js']);
    gulp.watch('./*.html' , browserSync.reload);
})