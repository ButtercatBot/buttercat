'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/ScrollArea';
import DocsHeader from '@/components/DocsHeader';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import DocsCommandMenu from '@/components/DocsCommandMenu';
import { cn } from '@/lib/utils';

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
				<aside className={'p-2 hidden md:block'}>
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
					<SideNav />
				</aside>
				<div className={'flex flex-col flex-1'}>
					<main>{children}</main>
				</div>
			</div>
		</div>
	);
}

function SideNav({
	className,
	closeSheet,
}: {
	className?: string;
	closeSheet?: () => void;
}) {
	return (
		<ScrollArea className={cn('w-52 h-72', className)}>
			<ul className={'mt-4 flex flex-col gap-4'}>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
				<li onClick={closeSheet}>
					<Link href="/docs/getting-started">Getting Started</Link>
				</li>
			</ul>
		</ScrollArea>
	);
}
