import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import React from 'react';
import { NavigationLink } from '@/components/ui/navigation-menu';

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
							<NavigationLink
								href={item.href}
								selected={pathname === `${item.href}`}
								className={
									'flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:underline hover:text-foreground'
								}
								selectedClassName={cn(
									'flex w-full items-center rounded-md border px-2 py-1.5 hover:underline font-medium bg-accent border-border text-accent-foreground hover:text-foreground dark:hover:text-background'
								)}
							>
								{item.title}
							</NavigationLink>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
