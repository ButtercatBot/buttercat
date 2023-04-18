'use client';

import React from 'react';
import './layout.css';
import GuidesHeader from '@/components/GuidesHeader';
import { Button } from '@/components/ui/Button';
import GuidesCommandMenu from '@/components/GuidesCommandMenu';
import GuidesNavigation from '@/components/GuidesNavigation';

export default function GuidesLayout({
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
		<>
			<GuidesCommandMenu open={commandOpen} setOpen={setCommandOpen} />
			<div className={'flex flex-col flex-1 isolate'}>
				<GuidesHeader
					openCommandMenu={() => {
						setCommandOpen(true);
					}}
				/>
				<div className={'flex-1 flex flex-col md:flex-row gap-4 p-2'}>
					<aside
						className={
							'p-2 sticky top-0 hidden md:block md:h-screen max-h-screen w-full md:w-56'
						}
					>
						<Button
							variant={'secondary'}
							className={'w-full flex justify-between my-2 md:mb-4'}
							onClick={() => setCommandOpen((open) => !open)}
						>
							<span className={'hidden md:block'}>Search</span>
							<span className={'block md:hidden'}>Search Guides</span>
							<kbd
								className={
									'pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-slate-100 bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-600 opacity-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 sm:flex'
								}
							>
								<span className="text-xs">⌘</span>K
							</kbd>
						</Button>
						<GuidesNavigation className={'hidden md:table h-[95%] w-full'} />
					</aside>
					<div className={'flex flex-col flex-1'}>{children}</div>
				</div>
			</div>
		</>
	);
}
