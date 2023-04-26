import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import heroImage from './hero_image.png';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function Home() {
	return (
		<main className="flex-1 md:grid md:grid-cols-2 md:grid-rows-none place-content-center container">
			<div className={'p-8 flex flex-col justify-evenly gap-8'}>
				<h1 className="font-display text-3xl  text-black dark:text-white sm:text-5xl xl:text-7xl">
					A modular, extensible, and easy to set up Twitch bot
				</h1>
				<div className={'flex flex-col gap-4'}>
					<Link href={`/guides/getting-started`} className={'w-full'}>
						<Button className={'w-full'} tabIndex={-1}>
							Get Started
						</Button>
					</Link>
					<Link href={`/docs`} className={'w-full'}>
						<Button className={'w-full'} variant="outline" tabIndex={-1}>
							Docs
						</Button>
					</Link>
				</div>
			</div>
			<div className={'flex-1'}>
				<AspectRatio ratio={14 / 17} className={'relative h-full w-full'}>
					<Image
						className={'rounded-lg'}
						src={heroImage}
						alt={'Example code snippet of Buttercat being set up with plugins'}
						fill
					/>
				</AspectRatio>
			</div>
		</main>
	);
}
