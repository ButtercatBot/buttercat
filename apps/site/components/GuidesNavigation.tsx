import { useSelectedLayoutSegment } from 'next/navigation';
import { ScrollArea } from '@/components/ui/ScrollArea';
import guidesConfig from '@/config/GuidesConfig';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import React from 'react';

export default function GuidesNavigation({
	className,
}: {
	className?: string;
}) {
	const segment = useSelectedLayoutSegment();

	return (
		<ScrollArea className={cn('h-full', className)}>
			{guidesConfig.sidebarNav.map((section) => {
				return (
					<div key={section.title} className={'mb-2 p-1'}>
						<p
							className={
								'font-bold text-lg border-b dark:border-b-slate-600 mb-2 border-b-slate-200'
							}
						>
							{section.title}
						</p>
						<ul>
							{section.items.map((item) => {
								const itemFullSlug = `${section.root}${
									item.slug ? '/' + item.slug : ''
								}`;

								return (
									<li key={item.title}>
										<Link
											href={`guides/${itemFullSlug}`}
											className={cn(
												'dark:text-slate-400 dark:hover:text-slate-300',
												segment === itemFullSlug
													? 'dark:text-slate-200 font-semibold'
													: ''
											)}
										>
											{item.title}
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				);
			})}
		</ScrollArea>
	);
}
