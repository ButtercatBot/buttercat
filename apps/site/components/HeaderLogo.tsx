import Link from 'next/link';
import React from 'react';

export default function HeaderLogo() {
	return (
		<div className={'grid place-content-center pl-4'}>
			<Link href={'/'} className={'font-bold text-xl md:text-3xl'}>
				Buttercat
			</Link>
		</div>
	);
}
