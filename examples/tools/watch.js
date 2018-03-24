import gulp from 'gulp';
import {reloadServer, startServer} from './server';
import {scripts} from './tasks/scripts';
import {styles} from './tasks/styles';
import {extAllViews, views} from './tasks/views';

function reportWatchStats(path) {
  console.log(`File ${path} was changed`);
}

export function watch() {
  startServer();

  gulp.watch(['packages/**/*.js', 'src/**/*.js'], gulp.series(scripts, reloadServer));

  // only need to watch `styles` task, as it will `stream` changes to the server
  const watchStyles = gulp.watch('src/**/*.scss', styles);
  watchStyles.on('change', reportWatchStats);

  const watchViews = gulp.watch(`src/**/${extAllViews}`, gulp.series(views, reloadServer));
  watchViews.on('change', reportWatchStats);
}
