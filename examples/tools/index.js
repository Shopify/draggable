import gulp from 'gulp';
import tasks from './tasks';
import {watch} from './watch';

export const scripts = tasks.scripts;
export const styles = tasks.styles;
export const views = tasks.views;
export const server = tasks.startServer;
export const start = watch;

export const build = gulp.parallel(scripts, styles, views);
