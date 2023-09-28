export const getCompensationString = (
	currency: string,
	from?: number,
	to?: number
) => {
	if (from && to) return `з/п ${from} - ${to} ${currency}`;
	if (from && !to) return `з/п от ${from} ${currency}`;
	if (!from && to) return `з/п до ${to} ${currency}`;

	return 'з/п не указана';
};
