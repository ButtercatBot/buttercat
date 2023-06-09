import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
	slug: {
		type: 'string',
		resolve: (guide) => `/${guide._raw.flattenedPath}`,
	},
	slugAsParams: {
		type: 'string',
		resolve: (guide) => guide._raw.flattenedPath.split('/').slice(1).join('/'),
	},
};

export const Doc = defineDocumentType(() => ({
	name: 'Doc',
	filePathPattern: `docs/**/*.mdx`,
	contentType: 'mdx',
	fields: {
		title: {
			type: 'string',
			required: true,
		},
		description: {
			type: 'string',
		},
		published: {
			type: 'boolean',
			default: true,
		},
	},
	computedFields,
}));

export const Guide = defineDocumentType(() => ({
	name: 'Guide',
	filePathPattern: `guides/**/*.mdx`,
	contentType: 'mdx',
	fields: {
		title: {
			type: 'string',
			required: true,
		},
		description: {
			type: 'string',
		},
		published: {
			type: 'boolean',
			default: true,
		},
	},
	computedFields,
}));

export const Plugin = defineDocumentType(() => ({
	name: 'Plugin',
	filePathPattern: `plugins/**/*.mdx`,
	contentType: 'mdx',
	fields: {
		title: {
			type: 'string',
			required: true,
		},
		description: {
			type: 'string',
		},
		published: {
			type: 'boolean',
			default: true,
		},
	},
	computedFields,
}));

export default makeSource({
	contentDirPath: './content',
	documentTypes: [Guide, Doc, Plugin],
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypePrettyCode,
				{
					theme: 'one-dark-pro',
					onVisitLine(node) {
						// Prevent lines from collapsing in `display: grid` mode, and allow empty
						// lines to be copy/pasted
						if (node.children.length === 0) {
							node.children = [{ type: 'text', value: ' ' }];
						}
					},
					onVisitHighlightedLine(node) {
						node.properties.className.push('line--highlighted');
					},
					onVisitHighlightedWord(node) {
						node.properties.className = ['word--highlighted'];
					},
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ['subheading-anchor'],
						ariaLabel: 'Link to section',
					},
				},
			],
		],
	},
});
