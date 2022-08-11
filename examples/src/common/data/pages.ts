import type Page from '@src/common/types/Page';

const pages: Page[] = [
	{
		section: 'Draggable',
		links: [
			{
				title: 'Drag events',
				href: '/examples/draggable/drag-events'
			},
			{ title: 'Restrict axis' }
		]
	},
	{
		section: 'Droppable',
		links: [
			{
				title: 'Unique dropzone',
				href: '/examples/droppable/unique-dropzone'
			},
			{ title: 'Capacity' }
		]
	},
	{
		section: 'Sortable',
		links: [
			{
				title: 'Simple list',
				href: '/examples/sortable/simple-list'
			},
			{ title: 'Transformed', href: '/examples/sortable/transformed' },
			{ title: 'Multiple containers', href: '/examples/sortable/multiple-containers' },
			{ title: 'Nested' }
		]
	},
	{
		section: 'Swappable',
		links: [
			{
				title: 'Flexbox',
				href: '/examples/swappable/flexbox'
			},
			{ title: 'Floated', href: '/examples/swappable/floated' },
			{ title: 'Grid layout', href: '/examples/swappable/grid-layout' }
		]
	},
	{
		section: 'Plugins',
		links: [
			{
				title: 'Collidable',
				href: '/examples/plugins/collidable'
			},
			{ title: 'Snappable', href: '/examples/plugins/snappable' },
			{ title: 'Swap Animation', href: '/examples/plugins/snappable' },
			{ title: 'Sort Animation', href: '/examples/plugins/sort-animation' }
		]
	}
];

export default pages;
