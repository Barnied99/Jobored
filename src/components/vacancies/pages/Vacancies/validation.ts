import * as yup from 'yup';

export const searchSchema = yup.object({
	search: yup.string().optional(),
});
