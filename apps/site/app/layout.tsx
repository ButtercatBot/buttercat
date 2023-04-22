import React from 'react';

import './global.css';

import { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/ThemeProvider';
import StyleSwitcher from '@/components/StyleSwitcher';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/lib/fonts';
import { SiteHeader } from '@/components/SiteHeader';

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: ['twitch', 'streamer', 'bot', 'stream', 'chat', 'twitchtv', 'ttv'],
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [],
	},
	twitter: {
		title: siteConfig.name,
		description: siteConfig.description,
		creator: siteConfig.creator.twitter,
	},
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning className={`${inter.className}`}>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased scroll-smooth',
					fontSans.variable,
					process.env.NODE_ENV === 'production' ? '' : 'debug-screens'
				)}
			>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<div className="relative flex min-h-screen flex-col">
						<SiteHeader />
						{children}
					</div>
				</ThemeProvider>
				<StyleSwitcher />
				<Analytics />
			</body>
		</html>
	);
}
