import { ILogObj, ISettingsParam, Logger } from 'tslog';
export declare const getLogger: (
	settings?: ISettingsParam<ILogObj> | undefined,
	logObj?: ILogObj | undefined
) => Logger<ILogObj>;
export { type ILogObj, type ISettingsParam, Logger };
