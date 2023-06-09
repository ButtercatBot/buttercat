import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import CommandMenu from '@/components/app-command-menu';
import { GithubIcon } from 'lucide-react';
import { MainNav } from '@/components/main-nav';
import { MobileNav } from '@/components/mobile-nav';
import ThemePicker from '@/components/theme-picker';

export function SiteHeader() {
	return (
		<header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur">
			<div className="container flex h-14 items-center px-4">
				<MainNav />
				<MobileNav />
				<div className="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
					<div className="w-full flex-1 md:w-auto md:flex-none">
						<CommandMenu />
					</div>
					<nav className="flex items-center space-x-1">
						<Link
							href={siteConfig.links.github}
							target="_blank"
							rel="noreferrer"
							className={'lg:hidden'}
						>
							<div
								className={cn(
									buttonVariants({
										size: 'sm',
										variant: 'ghost',
									}),
									'w-9 px-0'
								)}
							>
								<GithubIcon className="h-5 w-5" />
								<span className="sr-only">GitHub</span>
							</div>
						</Link>
						<ThemePicker />
					</nav>
				</div>
			</div>
		</header>
	);
}
