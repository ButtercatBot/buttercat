import { cn } from '@/lib/utils';

const WipBanner = ({ className }: { className?: string }) => {
	return (
		<div
			className={cn(
				'border-b border-b-slate-200 bg-gray-100 p-2 text-center text-slate-900 dark:border-b-slate-600 dark:bg-slate-700 dark:text-slate-50',
				className
			)}
		>
			🚧 Work in Progress 🚧
		</div>
	);
};

export default WipBanner;
