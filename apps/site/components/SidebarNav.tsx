import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import React from 'react';

export type Group = 'Guides' | 'Docs' | 'Plugins';
export type SidebarNavProps = {
	group: Group;
};

export default function SidebarNav(props: SidebarNavProps) {
	const pathname = usePathname();

	const group = siteConfig.sidebarNav.groups.find(
		(group) => group.title === props.group
	);

	if (!group) throw new Error(`No group found in config for: ${props.group}`);

	return (
		<div key={group.title} className={'mb-2 p-1'}>
			<p className={'font-bold text-lg border-b mb-2'}>{group.title}</p>
			<ul>
				{group.items.map((item) => {
					return (
						<li key={item.title}>
							<Link
								href={item.href}
								className={cn(
									pathname === `${item.href}`
										? 'text-foreground'
										: 'text-foreground/60'
								)}
							>
								{item.title}
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
