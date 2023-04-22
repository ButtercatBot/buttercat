'use client';

import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarOpen } from 'lucide-react';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet';
import { Separator } from '@/components/ui/Separator';
import HeaderLogo from '@/components/HeaderLogo';

export function MobileNav() {
	const [open, setOpen] = React.useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
				>
					<SidebarOpen className="h-6 w-6" />
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent size="xl" position="left" className="pr-0">
				<MobileLink
					href="/"
					className="flex items-center text-primary"
					onOpenChange={setOpen}
				>
					<HeaderLogo />
				</MobileLink>
				<ScrollArea className="my-4 h-[calc(100vh-4rem)] pb-10 pl-6">
					<div className="flex flex-col space-y-3">
						{siteConfig.mainNav?.map(
							(item) =>
								item.href && (
									<MobileLink
										key={item.href}
										href={item.href}
										onOpenChange={setOpen}
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
								<h4 className="font-bold text-primary">{group.title}</h4>
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
	className,
	children,
	...props
}: MobileLinkProps) {
	const router = useRouter();
	const pathname = usePathname();
	return (
		<Link
			href={href}
			onClick={() => {
				router.push(href.toString());
				onOpenChange?.(false);
			}}
			className={cn(
				pathname === href ? 'text-primary' : 'text-primary/60',
				className
			)}
			{...props}
		>
			{children}
		</Link>
	);
}
