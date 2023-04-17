import { cn } from '@/lib/utils';
import React from 'react';

interface GuidesPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	heading: string;
	text?: string;
}

export function GuidePageHeader({
	heading,
	text,
	className,
	...props
}: GuidesPageHeaderProps) {
	return (
		<>
			<div className={cn('space-y-4', className)} {...props}>
				<h1 className="font-display text-3xl font-extrabold text-black dark:text-white sm:text-5xl xl:text-7xl">
					{heading}
				</h1>
				{text && (
					<p className="text-xl text-slate-600 dark:text-slate-400">{text}</p>
				)}
			</div>
			<hr className="my-4 border-slate-200 dark:border-slate-600" />
		</>
	);
}
