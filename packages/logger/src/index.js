import { Logger } from 'tslog';
const mainLogger = new Logger({
	type: 'pretty',
	name: 'Buttercat',
	minLevel: 2,
	prettyLogTemplate:
		'{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{name}} {{logLevelName}}\t[{{fileNameWithLine}}]\t',
});
mainLogger.info('Logger initialized');
export const getLogger = (settings, logObj) => {
	return mainLogger.getSubLogger(settings, logObj);
};
export { Logger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQTJCLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUV4RCxNQUFNLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBVTtJQUN0QyxJQUFJLEVBQUUsUUFBUTtJQUNkLElBQUksRUFBRSxXQUFXO0lBQ2pCLFFBQVEsRUFBRSxDQUFDO0lBQ1gsaUJBQWlCLEVBQ2hCLHlHQUF5RztDQUMxRyxDQUFDLENBQUM7QUFDSCxVQUFVLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFdEMsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLENBQ3hCLFFBQThDLEVBQzlDLE1BQTRCLEVBQzNCLEVBQUU7SUFDSCxPQUFPLFVBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2xELENBQUMsQ0FBQztBQUVGLE9BQU8sRUFBcUMsTUFBTSxFQUFFLENBQUMifQ==
