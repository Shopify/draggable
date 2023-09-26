import core from '@actions/core';

export async function main() {
  core.info('Test info');
  const token = core.getInput('test');
  /* eslint-disable no-console */
  console.log(token);
  /* eslint-enable no-console */
}

main().catch((err) => core.setFailed(err.message));
