import { allPlugins } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import React from 'react';
import ContentPage from '@/components/content-page';

interface PluginPageProps {
	params: {
		slug: string[];
	};
}

export async function generateMetadata({
	params,
}: PluginPageProps): Promise<Metadata> {
	const plugin = await getPluginFromParams(params);

	if (!plugin) {
		return {};
	}

	return {
		title: plugin.title,
		description: plugin.description,
		twitter: {
			title: plugin.title,
			description: plugin.description,
		},
	};
}

async function getPluginFromParams(params) {
	const slug = params.slug?.join('/') || '';
	const plugin = allPlugins.find((plugin) => plugin.slugAsParams === slug);

	if (!plugin) {
		notFound();
	}

	return plugin;
}

export async function generateStaticParams(): Promise<
	PluginPageProps['params'][]
> {
	return allPlugins.map((plugin) => ({
		slug: plugin.slugAsParams.split('/'),
	}));
}

export default async function PluginPage({ params }: PluginPageProps) {
	const plugin = await getPluginFromParams(params);

	if (!plugin) {
		notFound();
	}

	return (
		<ContentPage
			type={'Plugin'}
			title={params.slug ? plugin.title : undefined}
			description={plugin.description}
			mdx={plugin.body}
		/>
	);
}
