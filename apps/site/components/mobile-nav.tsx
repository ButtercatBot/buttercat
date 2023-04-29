'use client';

import * as React from 'react';
import { LinkProps } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarOpen } from 'lucide-react';

import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { NavigationLink } from '@/components/ui/navigation-menu';
import HeaderLogo from '@/components/header-logo';

export function MobileNav() {
	const pathname = usePathname();
	const [open, setOpen] = React.useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className="mr-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
				>
					<SidebarOpen className="h-6 w-6" />
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent size="xl" position="left" className="pr-0">
				<HeaderLogo className={'flex'} />
				<ScrollArea className="my-4 h-[calc(100vh-4rem)] pb-16 pl-6">
					<div className="flex flex-col space-y-3">
						{siteConfig.mainNav?.map(
							(item) =>
								item.href && (
									<MobileLink
										key={item.href}
										href={item.href}
										onOpenChange={setOpen}
										className={
											pathname?.startsWith(item.href)
												? 'text-foreground'
												: 'text-foreground/60'
										}
									>
										{item.title}
									</MobileLink>
								)
						)}
					</div>
					<Separator className={'mt-6'} />
					<div className="flex flex-col space-y-2">
						{siteConfig.sidebarNav.groups.map((group) => (
							<div key={group.title} className="flex flex-col space-y-3 pt-6">
								<h4 className="font-bold text-foreground">{group.title}</h4>
								{group.items.map((item) => (
									<React.Fragment key={item.href}>
										{item.href ? (
											<MobileLink href={item.href} onOpenChange={setOpen}>
												{item.title}
											</MobileLink>
										) : (
											item.title
										)}
									</React.Fragment>
								))}
							</div>
						))}
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}

interface MobileLinkProps extends LinkProps {
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
	className?: string;
}

function MobileLink({
	href,
	onOpenChange,
	children,
	...props
}: MobileLinkProps) {
	const router = useRouter();
	const pathname = usePathname();
	return (
		<NavigationLink
			href={href}
			onClick={() => {
				router.push(href.toString());
				onOpenChange?.(false);
			}}
			selected={pathname === href}
			{...props}
		>
			{children}
		</NavigationLink>
	);
}
