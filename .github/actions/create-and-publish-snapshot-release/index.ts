import core from '@actions/core';
import github, {context} from '@actions/github';
import {getExecOutput} from '@actions/exec';

export async function main() {
  await getExecOutput('yarn changeset version --snapshot snapshot-release');

  const releaseProcess = await getExecOutput(
    'yarn release --no-git-tags --snapshot --tag snapshot-release',
  );

  const newTags = Array.from(
    releaseProcess.stdout.matchAll(/New tag:\s+([^\s\n]+)/g),
  ).map(([_, tag]) => tag);

  const token = core.getInput('token');
  const octokit = github.getOctokit(token);

  let body: string | null = null;

  if (newTags.length) {
    const [tag] = newTags;

    body =
      `🫰✨ **Thanks @${context.actor}! Your snapshot has been published to npm.**\n\n` +
      'Test the snapshot by updating your `package.json` ' +
      'with the newly published version:\n\n' +
      `\`\`\`sh\nyarn add ${tag}\n\`\`\``;

    core.setOutput('snapshot-created', 'true');
  } else {
    body = `💥 Snapshot creation failed!`;

    core.setOutput('snapshot-created', 'false');
  }

  await octokit.rest.issues.createComment({
    /* eslint-disable @typescript-eslint/naming-convention */
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body,
    /* eslint-enable @typescript-eslint/naming-convention */
  });
}

main().catch((err) => core.setFailed(err.message));
