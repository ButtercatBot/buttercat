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
import HeaderLogo from '@/components/HeaderLogo';

export default function MainPageHeader() {
	return (
		<header className={'flex flex-row gap-4 py-2'}>
			<HeaderLogo />
			<NavigationMenu className={'justify-end px-2'}>
				<NavigationMenuList>
					<NavigationLink href={'/docs'}>Docs</NavigationLink>
					<NavigationLink href={'https://github.com/MarcDonald/buttercat'}>
						GitHub
					</NavigationLink>
					<NavigationLink
						href={'https://github.com/MarcDonald/buttercat/tree/main/examples'}
					>
						Examples
					</NavigationLink>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
}

function NavigationLink(props: { href: string; children: React.ReactNode }) {
	return (
		<NavigationMenuItem>
			<Link href={props.href} legacyBehavior passHref>
				<NavigationMenuLink className={navigationMenuTriggerStyle()}>
					{props.children}
				</NavigationMenuLink>
			</Link>
		</NavigationMenuItem>
	);
}
