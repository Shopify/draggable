import type {Stats, MultiStats} from 'webpack';

export function runner(error?: Error | null, stats?: Stats | MultiStats) {
  /* eslint-disable no-console */
  if (error) {
    console.error(error);
    return;
  }

  if (!stats) {
    return;
  }

  console.log(
    stats.toString({
      chunks: false,
      colors: true,
    }),
  );
  /* eslint-enable no-console */
}
