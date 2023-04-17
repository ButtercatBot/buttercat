import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import MainPageHeader from '@/components/MainPageHeader';
import React from 'react';

export default function Home() {
	return (
		<>
			<MainPageHeader />
			<main className="flex-1 grid grid-rows-2 md:grid-cols-2 md:grid-rows-none">
				<div className={'p-8 flex flex-col justify-evenly'}>
					<h1 className="font-display text-3xl font-extrabold text-black dark:text-white sm:text-5xl xl:text-7xl">
						A modular, extensible, and easy to set up Twitch bot
					</h1>
					<div className={'flex flex-col gap-4'}>
						<Link href={`/guides/getting-started`} className={'w-full'}>
							<Button className={'w-full'} variant="default" tabIndex={-1}>
								Get Started
							</Button>
						</Link>
						<Link href={`/guides`} className={'w-full'}>
							<Button className={'w-full'} variant="outline" tabIndex={-1}>
								Docs
							</Button>
						</Link>
					</div>
				</div>
				<div className={'flex-1 p-8'}>
					<div className={'relative h-full w-full'}>
						<Image
							className={'rounded-lg shadow-lg'}
							src={'https://placekitten.com/2000/2000'}
							alt={'Placeholder'}
							fill
						/>
					</div>
				</div>
			</main>
		</>
	);
}
