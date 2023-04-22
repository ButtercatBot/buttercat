'use client';

import React from 'react';
import SidebarNav, { Group } from '@/components/SidebarNav';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { notFound, useSelectedLayoutSegment } from 'next/navigation';

export default function ContentLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const segment = useSelectedLayoutSegment();
	let group: Group;

	switch (segment?.toLowerCase()) {
		case 'guides':
			group = 'Guides';
			break;
		case 'plugins':
			group = 'Plugins';
			break;
		case 'docs':
			group = 'Docs';
			break;
		default:
			notFound();
	}

	return (
		<div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
			<aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
				<ScrollArea className="py-6 pr-6 lg:py-8">
					<SidebarNav group={group} />
				</ScrollArea>
			</aside>
			{children}
		</div>
	);
}
