const webpack     = require('webpack');
const gulp        = require('gulp');
const babel       = require('gulp-babel');
const gulpWebpack = require('webpack-stream');
const sass        = require('gulp-sass');
const del         = require('del');


/* * * * * * * * * * * * *
 *                       *
 *       Path Area       *
 *                       *
 * * * * * * * * * * * * */


const sourcePaths = {
  js           : 'src/js/**/*.js',
  copy         : 'node_modules/font-awesome/fonts/**',
  scssForWatch : 'src/css/**/*.scss',
  scss         : 'src/css/main.scss',
  webpack      : 'src/dist/index.js'
};

const distributionPaths = {
  babel        : 'src/dist',
  scss         : 'static/css',
  copy         : 'static/css/fonts',
  webpack      : 'static/js'
};


/* * * * * * * * * * * * *
 *                       *
 *       Task Area       *
 *                       *
 * * * * * * * * * * * * */


// ======   Clean For SCSS   ======

gulp.task('cleanForSCSS', function() {
  return del(['static/css', '!static/css', '!static/css/fonts/**']);
});

// ======   Clean For Babel   ======

gulp.task('cleanForBabel', function() {
  return del(['src/dist', 'static/js']);
});

// ======   Copy   ======

gulp.task('copy', () => {
  return gulp.src(sourcePaths.copy)
          .pipe(gulp.dest(distributionPaths.copy));
});

// ======   SCSS   ======

gulp.task('scss', ['cleanForSCSS'], () => {
  return gulp.src(sourcePaths.scss)
          .pipe(sass({outputStyle: 'compressed'}))
          .pipe(gulp.dest(distributionPaths.scss));
});

// ======   Babel   ======

gulp.task('babel', ['cleanForBabel'], () => {
  return gulp.src(sourcePaths.js)
          .pipe(babel({
            presets: ['env', 'react']
          }))
          .pipe(gulp.dest(distributionPaths.babel));
});

// ======   Webpack   ======

gulp.task('webpack',['babel'], () => {

  var options = {
    output: {
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin()
    ]
  };

  return gulp.src(sourcePaths.webpack)
          .pipe(gulpWebpack(options, webpack))
          .pipe(gulp.dest(distributionPaths.webpack));
});

// ======   Watch   ======

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(sourcePaths.scssForWatch, ['scss']);
  gulp.watch(sourcePaths.js, ['webpack']);
});

// ======   Default   ======

// called when you run `gulp` from cli
gulp.task('default', ['watch', 'copy', 'scss', 'webpack']);
