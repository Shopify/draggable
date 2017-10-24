import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import {server} from '../server';

export const srcStyles = 'src/styles/';
const distStyles = 'dist/assets/css/';
const stylesInputPath = `${srcStyles}examples-app.scss`;

export function styles() {
  return gulp
    .src(stylesInputPath)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: ['./src', './node_modules'],
      }).on('error', sass.logError),
    )
    .pipe(postcss())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(distStyles))
    .pipe(server.stream({match: '**/*.css'}));
}
