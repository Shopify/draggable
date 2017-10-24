import gulp from 'gulp';

const srcRoot = 'src/root/';
const distRoot = 'dist/';

export function root() {
  return gulp.src(`${srcRoot}*`).pipe(gulp.dest(distRoot));
}
