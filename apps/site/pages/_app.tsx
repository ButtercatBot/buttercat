import { type AppType } from 'next/app';

import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import WipBanner from '@/components/WipBanner';

const inter = Inter({ subsets: ['latin'] });

const MainApp: AppType = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<title>Buttercat</title>
			</Head>
			<>
				<div className={`${inter.className} m-auto max-w-[1800px]`}>
					<WipBanner />
					<Component {...pageProps} />
				</div>
			</>
		</>
	);
};

export default MainApp;
