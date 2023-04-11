export const log = (message?: any, ...optionalParams: any[]) => {
	if (optionalParams.length > 0) {
		console.log(optionalParams);
	} else {
		console.log(message);
	}
};

export const error = (message?: any, ...optionalParams: any[]) => {
	if (optionalParams.length > 0) {
		console.error(optionalParams);
	} else {
		console.error(message);
	}
};

export const warn = (message?: any, ...optionalParams: any[]) => {
	if (optionalParams.length > 0) {
		console.warn(optionalParams);
	} else {
		console.warn(message);
	}
};

export const info = (message?: any, ...optionalParams: any[]) => {
	if (optionalParams.length > 0) {
		console.info(optionalParams);
	} else {
		console.info(message);
	}
};

export const debug = (message?: any, ...optionalParams: any[]) => {
	if (optionalParams.length > 0) {
		console.debug(optionalParams);
	} else {
		console.debug(message);
	}
};

export const trace = (message?: any, ...optionalParams: any[]) => {
	if (optionalParams.length > 0) {
		console.trace(optionalParams);
	} else {
		console.trace(message);
	}
};
