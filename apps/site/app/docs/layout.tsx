'use client';

import React from 'react';
import './layout.css';
import { ScrollArea } from '@/components/ui/ScrollArea';
import DocsHeader from '@/components/DocsHeader';
import { Button } from '@/components/ui/Button';
import DocsCommandMenu from '@/components/DocsCommandMenu';
import { cn } from '@/lib/utils';
import { docsConfig } from '@/config/DocsConfig';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [commandOpen, setCommandOpen] = React.useState(false);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && e.metaKey) {
				setCommandOpen((open) => !open);
			}
		};
		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	return (
		<div className={'flex flex-col flex-1'}>
			<DocsCommandMenu open={commandOpen} setOpen={setCommandOpen} />
			<DocsHeader />
			<div className={'flex-1 flex flex-col md:flex-row mt-2 gap-4 p-2'}>
				<aside className={'p-2'}>
					<Button
						variant={'outline'}
						className={'w-full flex justify-between mb-4'}
						onClick={() => setCommandOpen((open) => !open)}
					>
						<span>Search</span>
						<kbd
							className={
								'pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-slate-100 bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-600 opacity-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 sm:flex'
							}
						>
							<span className="text-xs">⌘</span>K
						</kbd>
					</Button>
					<SideNav className={'hidden md:block'} />
				</aside>
				<div className={'flex flex-col flex-1'}>{children}</div>
			</div>
		</div>
	);
}

function SideNav({ className }: { className?: string }) {
	const segment = useSelectedLayoutSegment();

	return (
		<ScrollArea className={cn('side-navbar', className)}>
			{docsConfig.sidebarNav.map((section) => {
				return (
					<div key={section.title} className={'mb-2 p-1'}>
						<p className={'font-bold text-lg'}>{section.title}</p>
						<ul>
							{section.items.map((item) => {
								const itemFullSlug = `${section.root}${
									item.slug ? '/' + item.slug : ''
								}`;

								return (
									<li key={item.title}>
										<Link
											href={`docs/${itemFullSlug}`}
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
