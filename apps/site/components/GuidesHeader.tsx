'use client';

import React from 'react';
import Link from 'next/link';
import { GithubIcon, MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import HeaderLogo from '@/components/HeaderLogo';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/Sheet';
import GuidesNavigation from '@/components/GuidesNavigation';

type GuidesHeaderProps = {
	openCommandMenu: () => void;
};

export default function GuidesHeader(props: GuidesHeaderProps) {
	return (
		<header className={'flex flex-row gap-2 py-2 pr-2 items-center'}>
			<MobileNavMenu />
			<HeaderLogo className={'hidden md:block'} />
			<div className={'flex-1'}>
				<Button
					variant={'secondary'}
					className={'flex justify-between my-2 md:hidden w-full'}
					onClick={props.openCommandMenu}
				>
					<span className={'block md:hidden'}>Search Guides</span>
					<kbd
						className={
							'pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-slate-100 bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-600 opacity-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 sm:flex'
						}
					>
						<span className="text-xs">⌘</span>K
					</kbd>
				</Button>
			</div>
			<Link href={'https://github.com/MarcDonald/buttercat'} legacyBehavior>
				<Button variant={'ghost'}>
					<GithubIcon size={24} />
				</Button>
			</Link>
		</header>
	);
}

const MobileNavMenu = () => {
	return (
		<Sheet>
			<SheetTrigger asChild className={'md:hidden'}>
				<Button variant={'ghost'}>
					<MenuIcon size={24} />
				</Button>
			</SheetTrigger>
			<SheetContent position="left" size="xl">
				<SheetHeader className={'mb-4'}>
					<SheetTitle>Buttercat Guides</SheetTitle>
				</SheetHeader>
				<GuidesNavigation />
			</SheetContent>
		</Sheet>
	);
};
