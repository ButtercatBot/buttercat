'use client';

import React from 'react';
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/Command';
import { useRouter } from 'next/navigation';

export default function DocsCommandMenu({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	return (
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder="Search Documentation..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Suggestions">
					<CommandLink
						setOpen={setOpen}
						href={'/docs/getting-started'}
						label={'Getting Started'}
					/>
					<CommandLink
						setOpen={setOpen}
						href={'/docs'}
						label={'Documentation'}
					/>
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	);
}

function CommandLink({
	setOpen,
	href,
	label,
}: {
	href: string;
	label: string;
	setOpen: (open: boolean) => void;
}) {
	const router = useRouter();
	return (
		<CommandItem
			onSelect={() => {
				setOpen(false);
				void router.push(href);
			}}
		>
			{label}
		</CommandItem>
	);
}
