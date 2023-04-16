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
					` m-auto max-w-[1800px] relative min-h-screen bg-white font-sans text-slate-900 dark:bg-slate-800 dark:text-slate-50 flex flex-col`,
					process.env.NODE_ENV === 'production' ? '' : 'debug-screens'
				)}
			>
				<WipBanner />
				{children}
			</body>
		</html>
	);
}
