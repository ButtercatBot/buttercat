import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function GettingStarted() {
	return (
		<>
			<h1 className="font-display text-3xl font-extrabold text-black dark:text-white sm:text-5xl xl:text-7xl">
				Getting Started
			</h1>
			<p className={'my-4'}>Not Done Yet! Check Back Later</p>
			<Link
				href="https://github.com/MarcDonald/buttercat"
				className={'w-full mt-8'}
			>
				<Button className={'w-full'} variant="outline" tabIndex={-1}>
					Check out the GitHub
				</Button>
			</Link>
		</>
	);
}
