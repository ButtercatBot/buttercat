'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { DialogProps } from '@radix-ui/react-alert-dialog';
import { BotIcon, GithubIcon, Laptop, Moon, SunMedium } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';
import { siteConfig } from '@/config/site';

export default function AppCommandMenu({
	...props
}: DialogProps & { className?: string }) {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);
	const { setTheme } = useTheme();

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	const runCommand = React.useCallback((command: () => unknown) => {
		setOpen(false);
		command();
	}, []);

	return (
		<>
			<Button
				variant="outline"
				className={cn(
					'relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-foreground sm:pr-12 md:w-40 lg:w-64'
				)}
				onClick={() => setOpen(true)}
				{...props}
			>
				<span className="inline-flex">Search...</span>
				<kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
					<span className="text-xs">⌘</span>K
				</kbd>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					{siteConfig.sidebarNav.groups.map((group) => (
						<CommandGroup key={group.title} heading={group.title}>
							{group.items.map((navItem) => {
								return (
									<CommandItem
										value={`${group.title}/${navItem.title}`}
										key={`${group.title}/${navItem.title}`}
										onSelect={() => {
											runCommand(() => router.push(navItem.href));
										}}
									>
										<div className="mr-2 flex h-4 w-4 items-center justify-center">
											<group.icon className="h-3 w-3" />
										</div>
										{navItem.title}
									</CommandItem>
								);
							})}
						</CommandGroup>
					))}
					<CommandSeparator />
					<CommandGroup heading="Theme">
						<CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
							<SunMedium className="mr-2 h-4 w-4" />
							Light
						</CommandItem>
						<CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
							<Moon className="mr-2 h-4 w-4" />
							Dark
						</CommandItem>
						<CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
							<Laptop className="mr-2 h-4 w-4" />
							System
						</CommandItem>
					</CommandGroup>
					<CommandGroup heading="Links">
						<CommandItem
							onSelect={() =>
								runCommand(() => router.push(siteConfig.links.github))
							}
						>
							<GithubIcon className="mr-2 h-4 w-4" />
							GitHub
						</CommandItem>
						<CommandItem
							onSelect={() =>
								runCommand(() =>
									router.push(`${siteConfig.links.github}/tree/main/examples`)
								)
							}
						>
							<BotIcon className="mr-2 h-4 w-4" />
							Examples
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
}
