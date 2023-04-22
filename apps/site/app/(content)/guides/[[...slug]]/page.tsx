import { allGuides } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import React from 'react';
import ContentPage from '@/components/ContentPage';

interface GuidePageProps {
	params: {
		slug: string[];
	};
}

export async function generateMetadata({
	params,
}: GuidePageProps): Promise<Metadata> {
	const guide = await getGuideFromParams(params);

	if (!guide) {
		return {};
	}

	return {
		title: guide.title,
		description: guide.description,
		twitter: {
			title: guide.title,
			description: guide.description,
		},
	};
}

async function getGuideFromParams(params) {
	const slug = params.slug?.join('/') || '';
	const guide = allGuides.find((guide) => guide.slugAsParams === slug);

	if (!guide) {
		notFound();
	}

	return guide;
}

export async function generateStaticParams(): Promise<
	GuidePageProps['params'][]
> {
	return allGuides.map((guide) => ({
		slug: guide.slugAsParams.split('/'),
	}));
}

export default async function GuidePage({ params }: GuidePageProps) {
	const guide = await getGuideFromParams(params);

	if (!guide) {
		notFound();
	}

	return (
		<ContentPage
			type={'Guide'}
			title={params.slug ? guide.title : undefined}
			description={guide.description}
			mdx={guide.body}
		/>
	);
}
