import { allDocs } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import React from 'react';
import ContentPage from '@/components/content-page';

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

async function getDocFromParams(params: { slug: string[] }) {
	const slug = params.slug?.join('/') || '';
	const doc = allDocs.find((doc) => doc.slugAsParams === slug);

	if (!doc) {
		notFound();
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
		<ContentPage
			type={'Documentation'}
			title={params.slug ? doc.title : undefined}
			description={doc.description}
			mdx={doc.body}
		/>
	);
}
