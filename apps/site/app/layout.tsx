import React from 'react';

import './global.css';

import { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import WipBanner from '@/components/WipBanner';
import { Analytics } from '@vercel/analytics/react';

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
				<div className={'max-w-[1800px] min-h-screen flex flex-col m-auto'}>
					{children}
				</div>
			</body>
			<Analytics />
		</html>
	);
}
