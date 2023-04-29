import React from 'react';
import { NavigationLink } from '@/components/ui/navigation-menu';
import Image from 'next/image';
import iconDark from '@/assets/buttercat_grey.png';
import iconLight from '@/assets/buttercat_light_filled.png';
import { cn } from '@/lib/utils';

export default function HeaderLogo({ className }: { className?: string }) {
	return (
		<NavigationLink
			href={'/'}
			className={cn(
				'hidden text-2xl font-normal mr-4 font-logo hover:text-accent dark:hover:text-accent md:flex items-center gap-2',
				className
			)}
		>
			<Image
				className={'dark:block hidden'}
				src={iconDark}
				alt="Buttercat"
				width={40}
				height={40}
			/>
			<Image
				className={'dark:hidden block'}
				src={iconLight}
				alt="Buttercat"
				width={40}
				height={40}
			/>
			<span>buttercat</span>
		</NavigationLink>
	);
}
