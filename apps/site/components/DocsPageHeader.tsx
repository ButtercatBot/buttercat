import { cn } from '@/lib/utils';
import React from 'react';

interface DocsPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	heading: string;
	text?: string;
}

export function DocsPageHeader({
	heading,
	text,
	className,
	...props
}: DocsPageHeaderProps) {
	return (
		<>
			<div className={cn('space-y-4', className)} {...props}>
				<h1 className="font-display text-3xl font-extrabold text-black dark:text-white sm:text-5xl xl:text-7xl">
					{heading}
				</h1>
				{text && (
					<h2 className="text-xl text-slate-600 dark:text-slate-400">{text}</h2>
				)}
			</div>
			<hr className="my-4 border-slate-200" />
		</>
	);
}
