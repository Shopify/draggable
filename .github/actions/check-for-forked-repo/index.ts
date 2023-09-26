import core from '@actions/core';
import github, {context} from '@actions/github';

export async function main() {
  const token = core.getInput('token');
  const octokit = github.getOctokit(token);

  try {
    const pullRequest = await octokit.rest.pulls.get({
      /* eslint-disable @typescript-eslint/naming-convention */
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: context.issue.number,
      /* eslint-enable @typescript-eslint/naming-convention */
    });

    if (
      context.payload.repository &&
      pullRequest.data.head.repo &&
      context.payload.repository.full_name !==
        pullRequest.data.head.repo.full_name
    ) {
      const errorMessage =
        '`/snapit` is not supported on pull requests from forked repositories.';

      await octokit.rest.issues.createComment({
        /* eslint-disable @typescript-eslint/naming-convention */
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: errorMessage,
        /* eslint-enable @typescript-eslint/naming-convention */
      });

      core.setFailed(errorMessage);
    }
  } catch (err) {
    core.setFailed(`Request failed with error ${err}`);
  }
}

main().catch((err) => core.setFailed(err.message));
