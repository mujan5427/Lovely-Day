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
  js           : ['src/js/**/*.js'],
  scssForWatch : 'src/css/**/*.scss',
  scss         : 'src/css/main.scss',
  webpack      : ['static/dist/index.js']
};

const distributionPaths = {
  scss         : 'static/css'
};


/* * * * * * * * * * * * *
 *                       *
 *       Task Area       *
 *                       *
 * * * * * * * * * * * * */


// ======   Clean   ======

gulp.task('clean', function() {
  return del(['static/dist', 'static/js', 'static/css']);
});

// ======   SCSS   ======

gulp.task('scss', ['clean'], () => {
  return gulp.src(sourcePaths.scss)
          .pipe(sass({outputStyle: 'compressed'}))
          .pipe(gulp.dest(distributionPaths.scss));
});

// ======   Babel   ======

gulp.task('babel', ['clean'], () => {
  return gulp.src(paths.js)
          .pipe(babel({
            "presets": ['env', 'react']
          }))
          .pipe(gulp.dest('static/dist'));
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

  return gulp.src(paths.webpack)
          .pipe(gulpWebpack(options, webpack))
          .pipe(gulp.dest('static/js/'));
});

// ======   Watch   ======

// Rerun the task when a file changes
gulp.task('watch', function() {
  // gulp.watch(paths.js, ['webpack']);
  
  gulp.watch(sourcePaths.scssForWatch, ['scss']);
});

// ======   Default   ======

// called when you run `gulp` from cli
// gulp.task('default', ['watch', 'webpack']);

gulp.task('default', ['watch', 'scss']);
