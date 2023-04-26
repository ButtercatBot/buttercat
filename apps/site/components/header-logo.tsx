import React from 'react';
import { NavigationLink } from '@/components/ui/navigation-menu';

export default function HeaderLogo() {
	return (
		<NavigationLink
			href={'/'}
			className={
				'hidden text-2xl font-normal sm:inline-block mr-4 font-logo hover:text-accent dark:hover:text-accent'
			}
		>
			buttercat
		</NavigationLink>
	);
}
