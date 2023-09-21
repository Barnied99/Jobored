const POSTFIX = 'Jobored';
const SEPARATOR = ' | ';

export const getPageTitle = (prefix?: string) => {
	return prefix ? [prefix, POSTFIX].join(SEPARATOR) : POSTFIX;
};
