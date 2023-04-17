'use client';

import React from 'react';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/NavigationMenu';
import Link from 'next/link';
import { GithubIcon } from 'lucide-react';
import HeaderLogo from '@/components/HeaderLogo';

export default function GuidesHeader() {
	return (
		<header className={'flex flex-row gap-4 py-2'}>
			<HeaderLogo />
			<NavigationMenu className={'justify-end px-2'}>
				<NavigationMenuList>
					<NavigationMenuItem>
						<Link
							href={'https://github.com/MarcDonald/buttercat'}
							legacyBehavior
							passHref
						>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								<GithubIcon />
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
}
