import fs from 'fs';
import gulp from 'gulp';
import data from 'gulp-data';
import htmlmin from 'gulp-htmlmin';
import nunjucks from 'nunjucks';
import gulpjucks from 'gulp-nunjucks';

const srcViews = 'src/views/';
const distViews = 'dist/';
const extViews = '*.+(html|njk)';
export const extAllViews = '*.+(html|njk|json|md)';

export function views() {
  const nunjucksEnv = new nunjucks.Environment([
    new nunjucks.FileSystemLoader('src/views'),
    new nunjucks.FileSystemLoader('src'),
  ]);
  const dataPages = JSON.parse(fs.readFileSync('src/views/data-pages.json'));

  return gulp
    .src(`${srcViews}${extViews}`)
    .pipe(data(() => dataPages))
    .pipe(
      gulpjucks.compile(
        {},
        {
          env: nunjucksEnv,
        },
      ),
    )
    .pipe(
      htmlmin({
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
      }),
    )
    .pipe(gulp.dest(distViews));
}
