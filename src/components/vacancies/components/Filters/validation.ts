import * as yup from 'yup';

export const filterSchema = yup.object({
	catalogues: yup.string().optional().default(''),
	payment_from: yup.string().optional().default(''),
	payment_to: yup.string().optional().default(''),
	expirience: yup.string().optional().default(''),
	typework: yup.string().optional().default(''),
});
