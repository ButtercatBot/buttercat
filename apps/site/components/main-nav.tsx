'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';

import { siteConfig } from '@/config/site';
import { NavigationLink } from '@/components/ui/navigation-menu';
import HeaderLogo from '@/components/header-logo';

export function MainNav() {
	const pathname = usePathname();

	return (
		<div className="mr-4 hidden md:flex">
			<HeaderLogo />
			<nav className="flex items-center space-x-6 text-sm font-medium">
				<NavigationLink href="/docs" selected={pathname.startsWith('/docs')}>
					Documentation
				</NavigationLink>
				<NavigationLink
					href="/guides"
					selected={pathname.startsWith('/guides')}
				>
					Guides
				</NavigationLink>
				<NavigationLink
					href="/plugins"
					selected={pathname.startsWith('/plugins')}
				>
					Plugins
				</NavigationLink>
				<NavigationLink href={siteConfig.links.github}>GitHub</NavigationLink>
			</nav>
		</div>
	);
}
