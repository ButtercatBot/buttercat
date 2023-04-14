import { ILogObj, ISettingsParam, Logger } from 'tslog';

const mainLogger = new Logger<ILogObj>({
	type: 'pretty',
	name: 'ModularBot',
	minLevel: 2,
	prettyLogTemplate:
		'{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{name}} {{logLevelName}}\t[{{fileNameWithLine}}]\t',
});
mainLogger.info('Logger initialized');

export const getLogger = (
	settings?: ISettingsParam<ILogObj> | undefined,
	logObj?: ILogObj | undefined
) => {
	return mainLogger.getSubLogger(settings, logObj);
};

export { type ILogObj, type ISettingsParam, Logger };
