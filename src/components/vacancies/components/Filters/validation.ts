import * as yup from 'yup';

export const filterSchema = yup.object({
	catalogues: yup.string().optional().default(''),
	payment_from: yup.number().optional().default(0),
	payment_to: yup.number().optional().default(0),
	expirience: yup.string().optional().default(''),
	typework: yup.string().optional().default(''),
	type_of_work: yup.string().optional().default(''),
});
