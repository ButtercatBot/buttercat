import {
	JetBrains_Mono as FontMono,
	Work_Sans as FontSans,
	Fredoka as FontDisplay,
	Fredoka_One as FontLogo,
} from 'next/font/google';

export const fontSans = FontSans({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
	variable: '--font-sans',
});

export const fontDisplay = FontDisplay({
	weight: ['400', '500'],
	subsets: ['latin'],
	variable: '--font-display',
});

export const fontLogo = FontLogo({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-logo',
});

export const fontMono = FontMono({
	subsets: ['latin'],
	variable: '--font-mono',
});
