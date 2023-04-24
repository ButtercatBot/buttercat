import React from 'react';
import { NavigationLink } from '@/components/ui/navigation-menu';

export default function HeaderLogo() {
	return (
		<NavigationLink
			href={'/'}
			className={'hidden font-bold sm:inline-block mr-4'}
		>
			Buttercat
		</NavigationLink>
	);
}
