import React from 'react';

import './global.css';

import { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/theme-provider';
import StyleSwitcher from '@/components/style-switcher';
import { siteConfig } from '@/config/site';
import { fontDisplay, fontLogo, fontMono, fontSans } from '@/lib/fonts';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: ['twitch', 'streamer', 'bot', 'stream', 'chat', 'twitchtv', 'ttv'],
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#F0F1F5' },
		{ media: '(prefers-color-scheme: dark)', color: '#1E1E2E' },
	],
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.logoUrl,
				alt: 'ButterCat Logo',
			},
		],
	},
	twitter: {
		title: siteConfig.name,
		description: siteConfig.description,
		creator: siteConfig.creator.twitter,
		images: [
			{
				url: siteConfig.logoUrl,
				alt: 'ButterCat Logo',
			},
		],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${fontSans.className} ${fontDisplay.className} ${fontLogo.className} ${fontMono.className}`}
		>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased scroll-smooth',
					fontSans.variable,
					fontDisplay.variable,
					fontLogo.variable,
					fontMono.variable,
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
