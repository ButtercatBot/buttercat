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
import { docsConfig } from '@/config/DocsConfig';

export default function DocsCommandMenu({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	const [navSections] = React.useState(docsConfig.sidebarNav);
	return (
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder="Search Documentation..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				{navSections.map((section) => (
					<CommandGroup key={section.title} heading={section.title}>
						{section.items.map((item) => (
							<CommandLink
								key={`${section.root}/${item.slug}`}
								href={`docs/${section.root}/${item.slug}`}
								label={item.title}
								value={`${section.title} ${item.title}`}
								setOpen={setOpen}
							/>
						))}
					</CommandGroup>
				))}
			</CommandList>
		</CommandDialog>
	);
}

function CommandLink({
	setOpen,
	href,
	label,
	value,
}: {
	href: string;
	label: string;
	value: string;
	setOpen: (open: boolean) => void;
}) {
	const router = useRouter();
	return (
		<CommandItem
			value={value}
			onSelect={() => {
				setOpen(false);
				void router.push(href);
			}}
		>
			{label}
		</CommandItem>
	);
}
