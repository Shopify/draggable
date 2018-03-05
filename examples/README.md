![banner-examples](https://user-images.githubusercontent.com/643944/34655498-c9701942-f3d8-11e7-9dd5-6d225e7c5f6f.png)

> The Examples site has been made available to aid developers interested in building web apps with Draggable and/or contributing back to the library.

The Examples sandbox aims to answer common questions concerning Draggable’s implementation, as well as provide solutions to any conceivable drag and drop problem.

For instance, our solution to resolving touch events required duplicating the `source` node in the DOM. Depending on your design, this could cause friction as you attempt to maintain the correct layout while dragging. A bit of clever CSS can help resolve such layout issues. There are several examples in this repo that demonstrate solutions to this exact layout concern.

## Local development

1. Clone the `draggable` repo: `git clone git@github.com:Shopify/draggable.git`.
2. Run `yarn && yarn start` in the root `draggable` directory.
3. You can now access the local site at `http://localhost:3000` _(local address may vary - see console for correct url)_.

## Code style

This project uses Shopify’s [eslint](https://github.com/Shopify/eslint-plugin-shopify) and [stylelint](https://github.com/Shopify/stylelint-config-shopify) configs with a few alterations, defined in their respective `dot rc` file. If contributing back to this project, you must conform to the code style enforced by the config. If you are just playing around and don’t care about code style, just disable your editor’s linter.

## Project structure

This project uses a co-located component structure, meaning everything relating to an individual component should all be found in the same folder. For the most part, you will work only in the `src/components` and `src/content` folders.

The root directory contains many config files that you can safely ignore unless you aim to change how files are compiled. It is strongly recommended to read the `package.json` to familiarize yourself with the available `scripts`.

### `src/views`

This folder contains the top-level page templates. The project uses Nunjucks for a templating language.

There is only one layout template, `views/templates/document.html`, which is extended by all of the `.html` files in the root of `/views`. These root views do the following:

1. Import global components such as `Sidebar` and `PageHeader`
2. Define the `ViewAttr` for the view _(Page title, description, etc)_.
3. Import and render the content component for that view.

### `src/styles`

This is where “global” styles, along with the `examples-app.scss` manifest, are located. There shouldn’t be much reason to alter any of these files other than adding new imports to `examples-app.scss`.

This project uses [Threads](https://github.com/beefchimi/threads) to manage style properties. You can see all of the Threads theme values in `styles/themes/examples`.

### `src/scripts`

Just like with `styles/`, this is where our “global” scripts, along with the `examples-app.js` entry script is located. There shouldn’t be much reason to alter any of these files other than adding new imports and initializations to `examples-app.js`.

### `src/content`

This folder contains all the “content components”, which means all the code specific to an individual Example. Content is grouped by the “example type”: `Draggable`, `Droppable`, `Sortable`, `Swappable`, or `Plugins`. There is also a `Home` folder just for the landing page, and a `shared` folder for common functions and mixins that are reused across multiple content components.

Each individual example will have a single `.html` view, `.scss` file, and a `index.js`. The `index.js` is where you will initialize and author any `draggable` logic. The default function exported from each `index.js` file is imported and initialized in the `src/scripts/examples-app.js` entry file.

### `src/components`

Here are all of the shared components, such as the `Block` component, used in many examples as draggable elements.

Sometimes these are just `.scss` files, and the markup is written within a content component. If the styles contain values specific to that component, but need to be shared with other components, they will be split out into a `props.scss` file. Variant classes are split out into a `variants.scss` file.

Some components have a `.html` file, which uses Nunjucks macros to define reusable components. For example, `Block` has several variations that can be toggled through its component API. Once a `Block` is imported into a view, you can render using:

`{{ Block.render('one', {index: 1, draggable: true}) }}`

That will render all of the markup for a `Block` component, using the string `one` as its `Heading`, and appending the classes `Block--item1` and `Block--isDraggable`.

Some components will also have their own JavaScript logic, such as `Plate`, which manages how the `Plate` component gets transformed via a drag event.

### `src/root`

This folder simply contains any files that need to be copied to the root `dist/` folder, such as a `manifest.json` or `.htaccess`. There should be no reason to alter files in this folder.

### `tools`

All of the build scripts are found in this folder. You shouldn’t need to go in here unless you want to change how the code is compiled.

All JavaScript is generated with source maps, so you should be able to dig through errors and `console.log` statements without issue.

## Running a server / watching files

Running `yarn start` fires up a `browsersync` server to view the site. While running the server, when you add/make changes to any of the files in `src/`, the appropriate files will then be recompiled and output to the `dist/` folder. Once a file has been compiled, the browser will automatically reload the page. For `scss` changes, the new styles are injected into the page without causing a refresh.

The file watcher will also look for changes in the `draggable/lib` folder, which means you can be running the examples server and making changes to the core library at the same time. Scripts will get recompiled and the browser will reload.

## Contributing

If while using Draggable, you encounter something that is not already covered in the Examples, please contribute back by creating a new Example under the correct grouping.

We ask that you follow our code style config and try your best to make the example consistent with the design of the site. Lean on the components already created to compose your example. If required, you can design and build your own components.

There is an [open issue](https://github.com/Shopify/draggable/issues/110) for building a CLI generator for new pages. If you are interested in taking this on, please assign yourself to the issue.

If you are unsure if your example has merit, feel free to [open an issue](https://github.com/Shopify/draggable/issues) and propose your idea. Always ping [@tsov](https://github.com/tsov) and [@beefchimi](https://github.com/beefchimi) for issues and code review!
