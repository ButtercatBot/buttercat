import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Balancer from 'react-wrap-balancer';
import { Separator } from '@/components/ui/separator';
import { Mdx } from '@/components/ui/mdx';
import React from 'react';
import { MDX } from 'contentlayer/generated';

type ContentPageProps = {
	type: 'Guide' | 'Plugin' | 'Documentation';
	title?: string | undefined;
	description?: string | undefined;
	mdx: MDX;
};

export default function ContentPage({
	type,
	title,
	description,
	mdx,
}: ContentPageProps) {
	return (
		<main className="relative py-6 lg:gap-10 lg:py-8">
			<div className="mx-auto w-full min-w-0">
				<div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
					<div className="overflow-hidden text-ellipsis whitespace-nowrap">
						{type}
					</div>
					<ChevronRight className="h-4 w-4" />
					<div className="font-medium text-foreground">
						{title ? title : 'Introduction'}
					</div>
				</div>
				<div className="space-y-2">
					<h1 className={cn('scroll-m-20 text-4xl font-bold tracking-tight')}>
						{title ? title : 'Introduction'}
					</h1>
					{description && (
						<p className="text-lg text-muted-foreground">
							<Balancer>{description}</Balancer>
						</p>
					)}
				</div>
			</div>
			<Separator className="my-4 md:my-6" />
			<Mdx code={mdx.code} />
		</main>
	);
}
