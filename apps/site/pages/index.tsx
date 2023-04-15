import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { GithubIcon } from 'lucide-react';

export default function Home() {
	return (
		<main className="grid min-h-screen p-8 md:p-24 md place-content-center">
			<h1
				className={
					'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'
				}
			>
				Buttercat
			</h1>
			<h2
				className={
					'mt-5 scroll-m-20 border-b border-b-slate-200 pb-2 text-2xl font-semibold tracking-tight text-slate-700 transition-colors first:mt-0 dark:border-b-slate-700 dark:text-slate-400 md:text-3xl'
				}
			>
				A modular, extensible, and easy to set up Twitch bot
			</h2>
			<Link
				href={`https://github.com/MarcDonald/buttercat`}
				className={'w-full mt-4'}
			>
				<Button className={'w-full'} variant="outline" tabIndex={-1}>
					<GithubIcon className="mr-2 h-4 w-4" /> GitHub
				</Button>
			</Link>
		</main>
	);
}
