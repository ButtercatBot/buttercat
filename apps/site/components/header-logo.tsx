import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';

export default function HeaderLogo({ className }: { className?: string }) {
	return (
		<div className={cn('grid place-content-center pl-4', className)}>
			<Link href={'/'} className={'font-bold text-xl md:text-3xl'}>
				Buttercat
			</Link>
		</div>
	);
}
