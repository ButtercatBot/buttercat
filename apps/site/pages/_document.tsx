import { Head, Html, Main, NextScript } from 'next/document';
import { cn } from '@/lib/utils';

const title = 'Buttercat';
const description = 'A modular and extensible Twitch bot';

export default function Document() {
	return (
		<Html
			className={`relative min-h-screen bg-white font-sans text-slate-900 dark:bg-slate-800 dark:text-slate-50`}
		>
			<Head>
				<meta name="description" content={description} />
				<meta
					name="keywords"
					content="twitch,streamer,bot,stream,chat,twitchtv,ttv"
				/>
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:creator" content="@DeveloperMarc" />
			</Head>
			<body
				className={cn(
					// eslint-disable-next-line turbo/no-undeclared-env-vars
					process.env.NODE_ENV === 'production' ? '' : 'debug-screens'
				)}
			>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
