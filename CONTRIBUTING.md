# Contributing to Draggable

Thank you for contributing to draggable :tada: Any contributions to draggable are
appreciated and encouraged.

## Table of contents

1. [Code of Conduct](code-of-conduct)
2. [How to contribute](how-to-contribute)
    1. [Creating issues](creating-issues)
    2. [Opening pull requests](opening-pull-requests)
    3. [JS Docblocks](js-docblocks)
4. [How to run locally](how-to-run-locally)
3. [Additional information](additional-information)

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct document](https://github.com/Shopify/draggable/blob/master/CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report unacceptable behaviour to max.hoffmann@shopify.com or curtis.dulmage@shopify.com.

## How to contribute

### Creating issues

Before submitting issues, please have a quick look if there is an existing open issue here: [Issues](https://github.com/Shopify/draggable/issues). If no related issue can be found,
please open a new issue with labels: `bug`, `documentation`, `feature-request` or `question`.

### Opening pull requests

Pull requests are more than welcome! Just make sure that to include a description of the problem and how you are attempting to fix the issue, or
simply follow the Pull Request description template.

We also require Pull Requests to sync with master via rebase (not merge). So when you need to sync up your branch with master use: `git pull --rebase origin master`,
or if you need to sync up with another branch `git pull --rebase origin some-other-branch-name`. Doing so will remove of an extra merge commit in the git history.
This will also require a force push to the branch, e.g. `git push -u origin +some-branch`. The `+` in the last command indicates that you are force pushing changes.

Additionally we require commits to be atomic and squashed where needed. This will keep the git history clean on master. To squash commits use the `git rebase -i @~2`
command to do an interactive rebase. This will allow you to merge multiple commits into one. To read up more on this please visit: [Git Tools Rewriting History](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)

### JS Docblocks

Please follow the libraries convention and use docblocks to document the code

Here are some sample docblocks for different types (methods, properties, constants, classes, constructors):

```js
/**
 * Some method description
 * @param {ParameterType} parameterName
 * @return {ReturnType}
 * @private
 * @static
 * @readonly
 */

/**
 * Some instance property description
 * @property {PropertyType} propertyName
 * @private
 * @static
 * @readonly
 */

/**
 * Some constant description
 * @const {ConstType} constName
 */

/**
 * Some class description
 * @class ClassName
 * @module ClassName
 * @extends BaseClassName
 */

/**
 * Constructor description
 * @constructs ClassName
 */
```

## How to run locally

Here some steps to run draggable locally:

**via yarn**

```
$ cd draggable
$ yarn install
$ yarn test
```

**via npm**

```
$ cd draggable
$ npm install
$ npm run test
```

We are still working on setting up interactive example pages.
