import { allGuides } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { Mdx } from '@/components/ui/Mdx';
import { GuidePageHeader } from '@/components/GuidePageHeader';
import { PageNotFoundError } from 'next/dist/shared/lib/utils';
import { Metadata } from 'next';

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
		throw new PageNotFoundError(`/guides/${slug}`);
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
		<main className={'px-2'}>
			<GuidePageHeader heading={guide.title} text={guide.description} />
			<Mdx code={guide.body.code} />
		</main>
	);
}
