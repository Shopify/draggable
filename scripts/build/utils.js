function runner(error, stats) {
  /* eslint-disable no-console */
  if (error) {
    console.error(error);
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

module.exports = {runner};
