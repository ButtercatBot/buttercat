import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function DocsPage() {
	return (
		<div className={'flex-1 p-4 flex gap-4 flex-col mt-32'}>
			<h1 className="font-display text-3xl font-extrabold text-black dark:text-white sm:text-5xl xl:text-7xl">
				Not Done Yet! Check Back Later
			</h1>
			<Link
				href="https://github.com/MarcDonald/buttercat"
				className={'w-full mt-8'}
			>
				<Button className={'w-full'} variant="outline" tabIndex={-1}>
					Check out the GitHub
				</Button>
			</Link>
		</div>
	);
}
