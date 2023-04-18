import React from 'react';

import './global.css';

import { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import WipBanner from '@/components/WipBanner';

const title = 'Buttercat';
const description = 'A modular and extensible Twitch bot';

export const metadata: Metadata = {
	title,
	description,
	keywords: ['twitch', 'streamer', 'bot', 'stream', 'chat', 'twitchtv', 'ttv'],
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
	twitter: {
		title,
		description,
		creator: '@DeveloperMarc',
	},
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html className={`${inter.className}`}>
			<body
				className={cn(
					`m-auto relative `,
					process.env.NODE_ENV === 'production' ? '' : 'debug-screens'
				)}
			>
				<WipBanner />
				<div className={'max-w-[1800px] min-h-screen flex flex-col m-auto'}>
					{children}
				</div>
			</body>
		</html>
	);
}
