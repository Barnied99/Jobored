const controls = {
	first: { 'aria-label': 'first page button aria-label' },
	last: { 'aria-label': 'last page button aria-label' },
	next: { 'aria-label': 'next page button aria-label' },
	previous: { 'aria-label': 'previous page button aria-label' },
};

export const getPaginationControlProps = (control: string) => {
	return controls[control] || {};
};
