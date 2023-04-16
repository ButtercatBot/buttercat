import { allDocs } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { Mdx } from '@/components/Mdx';
import { DocsPageHeader } from '@/components/DocsPageHeader';
import { PageNotFoundError } from 'next/dist/shared/lib/utils';
import { Metadata } from 'next';

interface DocPageProps {
	params: {
		slug: string[];
	};
}

export async function generateMetadata({
	params,
}: DocPageProps): Promise<Metadata> {
	const doc = await getDocFromParams(params);

	if (!doc) {
		return {};
	}

	return {
		title: doc.title,
		description: doc.description,
		twitter: {
			title: doc.title,
			description: doc.description,
		},
	};
}

async function getDocFromParams(params) {
	const slug = params.slug?.join('/') || '';
	const doc = allDocs.find((doc) => doc.slugAsParams === slug);

	if (!doc) {
		throw new PageNotFoundError(`/docs/${slug}`);
	}

	return doc;
}

export async function generateStaticParams(): Promise<
	DocPageProps['params'][]
> {
	return allDocs.map((doc) => ({
		slug: doc.slugAsParams.split('/'),
	}));
}

export default async function DocPage({ params }: DocPageProps) {
	const doc = await getDocFromParams(params);

	if (!doc) {
		notFound();
	}

	return (
		<main className={'px-2'}>
			<DocsPageHeader heading={doc.title} text={doc.description} />
			<Mdx code={doc.body.code} />
		</main>
	);
}
